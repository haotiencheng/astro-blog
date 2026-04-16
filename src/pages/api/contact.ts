export const prerender = false;

import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

interface Env {
  astro_blog_db: D1Database;
  RESEND_API_KEY: string;
}

export const POST: APIRoute = async ({ request }) => {
  const body = (await request.json().catch(() => null)) as {
    name?: string;
    email?: string;
    message?: string;
  } | null;

  if (!body || !body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
    return Response.json({ error: "All fields are required" }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(body.email.trim())) {
    return Response.json({ error: "Invalid email address" }, { status: 400 });
  }

  const name = body.name.trim();
  const email = body.email.trim();
  const message = body.message.trim();

  const { astro_blog_db: db, RESEND_API_KEY } = env as unknown as Env;

  await db
    .prepare("INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)")
    .bind(name, email, message)
    .run();

  // Send notification email via Resend
  if (RESEND_API_KEY) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Contact Form <contact@notifications.projectstain.dev>",
        to: "haotiencheng1217@gmail.com",
        subject: `New contact: ${name}`,
        html: `<h2>New contact form submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, "<br>")}</p>`,
      }),
    }).catch(() => {
      // Don't fail the request if email fails — submission is already saved in D1
    });
  }

  return Response.json({ ok: true });
};
