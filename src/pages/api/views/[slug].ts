export const prerender = false;

import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

const CACHE_TTL = 60; // seconds
const DEDUP_TTL = 24 * 60 * 60; // one view per visitor per post per day

// Anything that is not a person reading the post. Prefetchers are excluded
// separately via Sec-Purpose / Purpose headers.
const BOT_UA =
  /bot|crawler|crawl|spider|slurp|bingpreview|headless|lighthouse|pagespeed|monitor|uptime|curl|wget|python-requests|axios|go-http|node-fetch|undici|okhttp|scrapy|httpx|java\/|facebookexternalhit|whatsapp|telegrambot|twitterbot|slackbot|discordbot|embedly|feedfetcher|archive\.org/i;

function getBindings() {
  const e = env as { astro_blog_db: D1Database; SESSION: KVNamespace };
  return { db: e.astro_blog_db, kv: e.SESSION };
}

async function readCount(
  slug: string,
  db: D1Database,
  kv: KVNamespace,
): Promise<number> {
  const cached = await kv.get(`views:${slug}`);
  if (cached !== null) return Number(cached);

  const row = await db
    .prepare("SELECT count FROM views WHERE slug = ?")
    .bind(slug)
    .first<{ count: number }>();
  const count = row?.count ?? 0;

  await kv.put(`views:${slug}`, String(count), { expirationTtl: CACHE_TTL });
  return count;
}

/** Opaque per-visitor-per-post key. The IP is hashed, never stored raw. */
async function visitorKey(slug: string, request: Request): Promise<string> {
  const ip = request.headers.get("cf-connecting-ip") ?? "";
  const ua = request.headers.get("user-agent") ?? "";
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(`${ip}|${ua}|${slug}`),
  );
  const hex = [...new Uint8Array(digest)]
    .slice(0, 16)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `seen:${slug}:${hex}`;
}

function isNonReader(request: Request): boolean {
  const ua = request.headers.get("user-agent") ?? "";
  if (!ua || BOT_UA.test(ua)) return true;
  const purpose =
    request.headers.get("sec-purpose") ??
    request.headers.get("purpose") ??
    request.headers.get("x-moz") ??
    "";
  return /prefetch|prerender/i.test(purpose);
}

export const GET: APIRoute = async ({ params }) => {
  const { slug } = params;
  const { db, kv } = getBindings();
  return Response.json({ count: await readCount(slug!, db, kv) });
};

export const POST: APIRoute = async ({ params, request }) => {
  const { slug } = params;
  const { db, kv } = getBindings();

  // Bots, prefetches and repeat visits read the count without inflating it.
  if (isNonReader(request)) {
    return Response.json({ count: await readCount(slug!, db, kv) });
  }
  const key = await visitorKey(slug!, request);
  if ((await kv.get(key)) !== null) {
    return Response.json({ count: await readCount(slug!, db, kv) });
  }

  const row = await db
    .prepare(
      "INSERT INTO views (slug, count) VALUES (?, 1) ON CONFLICT(slug) DO UPDATE SET count = count + 1 RETURNING count",
    )
    .bind(slug)
    .first<{ count: number }>();
  const count = row?.count ?? 1;

  await kv.put(key, "1", { expirationTtl: DEDUP_TTL });
  await kv.put(`views:${slug}`, String(count), { expirationTtl: CACHE_TTL });

  return Response.json({ count });
};
