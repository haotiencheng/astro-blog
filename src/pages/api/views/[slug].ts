export const prerender = false;

import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, locals }) => {
  const { slug } = params;
  const db = locals.runtime.env.astro_blog_db;
  const row = await db
    .prepare("SELECT count FROM views WHERE slug = ?")
    .bind(slug)
    .first<{ count: number }>();
  return Response.json({ count: row?.count ?? 0 });
};

export const POST: APIRoute = async ({ params, locals }) => {
  const { slug } = params;
  const db = locals.runtime.env.astro_blog_db;
  const row = await db
    .prepare(
      "INSERT INTO views (slug, count) VALUES (?, 1) ON CONFLICT(slug) DO UPDATE SET count = count + 1 RETURNING count",
    )
    .bind(slug)
    .first<{ count: number }>();
  return Response.json({ count: row?.count ?? 1 });
};
