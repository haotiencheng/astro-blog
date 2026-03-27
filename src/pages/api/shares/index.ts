export const prerender = false;

import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

function generateId(length = 8): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(bytes, (b) => chars[b % chars.length]).join("");
}

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json().catch(() => null) as { markdown?: string } | null;
  if (!body || typeof body.markdown !== "string" || !body.markdown.trim()) {
    return Response.json({ error: "markdown is required" }, { status: 400 });
  }

  const db = (env as { astro_blog_db: D1Database }).astro_blog_db;
  const id = generateId();

  await db
    .prepare("INSERT INTO shares (id, markdown) VALUES (?, ?)")
    .bind(id, body.markdown)
    .run();

  return Response.json({ id });
};
