export const prerender = false;

import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

const CACHE_TTL = 60; // seconds
const CACHE_KEY = "views:__all__";

/**
 * Every post's view count in one call. The build inlines this snapshot into the
 * static pages so a first-time visitor sees a number instead of an empty slot;
 * the per-post client fetch then corrects it.
 */
export const GET: APIRoute = async () => {
  const e = env as { astro_blog_db: D1Database; SESSION: KVNamespace };

  const cached = await e.SESSION.get(CACHE_KEY);
  if (cached !== null) {
    return new Response(cached, {
      headers: { "content-type": "application/json", "cache-control": `public, max-age=${CACHE_TTL}` },
    });
  }

  const { results } = await e.astro_blog_db
    .prepare("SELECT slug, count FROM views")
    .all<{ slug: string; count: number }>();

  const counts: Record<string, number> = {};
  for (const row of results ?? []) counts[row.slug] = row.count;

  const body = JSON.stringify(counts);
  await e.SESSION.put(CACHE_KEY, body, { expirationTtl: CACHE_TTL });

  return new Response(body, {
    headers: { "content-type": "application/json", "cache-control": `public, max-age=${CACHE_TTL}` },
  });
};
