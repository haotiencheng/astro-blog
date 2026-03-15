/// <reference types="astro/client" />

interface Env {
  astro_blog_db: D1Database;
}

type Runtime = import("@astrojs/cloudflare").Runtime;

declare namespace App {
  interface Locals extends Runtime {}
}
