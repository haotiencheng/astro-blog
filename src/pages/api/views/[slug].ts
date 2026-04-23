export const prerender = false;

import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

const CACHE_TTL = 60; // seconds

function getBindings() {
  const e = env as { astro_blog_db: D1Database; SESSION: KVNamespace };
  return { db: e.astro_blog_db, kv: e.SESSION };
}

export const GET: APIRoute = async ({ params }) => {
  const { slug } = params;
  const { db, kv } = getBindings();

  // Try KV cache first
  const cached = await kv.get(`views:${slug}`);
  if (cached !== null) {
    return Response.json({ count: Number(cached) });
  }

  // Cache miss — read from D1
  const row = await db
    .prepare("SELECT count FROM views WHERE slug = ?")
    .bind(slug)
    .first<{ count: number }>();
  const count = row?.count ?? 0;

  // Write to cache
  await kv.put(`views:${slug}`, String(count), { expirationTtl: CACHE_TTL });

  return Response.json({ count });
};

export const POST: APIRoute = async ({ params }) => {
  const { slug } = params;
  const { db, kv } = getBindings();

  const row = await db
    .prepare(
      "INSERT INTO views (slug, count) VALUES (?, 1) ON CONFLICT(slug) DO UPDATE SET count = count + 1 RETURNING count",
    )
    .bind(slug)
    .first<{ count: number }>();
  const count = row?.count ?? 1;

  // Update cache with new count
  await kv.put(`views:${slug}`, String(count), { expirationTtl: CACHE_TTL });

  return Response.json({ count });
};
