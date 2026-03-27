export const prerender = false;

import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;
  const db = (env as { astro_blog_db: D1Database }).astro_blog_db;

  const row = await db
    .prepare("SELECT markdown, created_at FROM shares WHERE id = ?")
    .bind(id)
    .first<{ markdown: string; created_at: string }>();

  if (!row) {
    return Response.json({ error: "not found" }, { status: 404 });
  }

  return Response.json({ markdown: row.markdown, created_at: row.created_at });
};
