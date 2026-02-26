import { execFileSync } from "node:child_process";

export interface OGData {
  url: string;
  title: string;
  description?: string;
  icon?: string;
  author?: string;
  thumbnail?: string;
}

/**
 * Fetch OG metadata from a URL at build time.
 *
 * Uses `curl` via `execFileSync` instead of `fetch` because Node.js undici
 * cannot reach certain hosts (e.g. t.me) while curl handles them fine.
 */
export function fetchOG(url: string): OGData {
  try {
    const html = execFileSync(
      "curl",
      ["-sL", "--max-time", "8", "-A", "Mozilla/5.0 (compatible; bot/1.0)", url],
      { encoding: "utf8", timeout: 10_000 },
    );

    const base = url;

    return {
      url,
      title:
        meta(html, "og:title") ??
        html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() ??
        url,
      description: meta(html, "og:description") ?? meta(html, null, "description"),
      thumbnail: resolve(meta(html, "og:image") ?? meta(html, "og:image:url"), base),
      author: meta(html, "og:site_name") ?? meta(html, null, "application-name"),
      icon: resolve(
        link(html, "apple-touch-icon") ??
          link(html, "icon") ??
          link(html, "shortcut icon") ??
          "/favicon.ico",
        base,
      ),
    };
  } catch {
    return { url, title: url };
  }
}

// ── helpers ────────────────────────────────────────────────────────────────

function meta(html: string, property: string | null, nameAttr?: string): string | undefined {
  const targets: string[] = [];
  if (property) targets.push(`property=["']${property}["']`);
  if (nameAttr) targets.push(`name=["']${nameAttr}["']`);
  for (const t of targets) {
    let m = html.match(new RegExp(`<meta[^>]+content=["']([^"']*?)["'][^>]+${t}`, "i"));
    if (m) return decode(m[1]);
    m = html.match(new RegExp(`<meta[^>]+${t}[^>]+content=["']([^"']*?)["']`, "i"));
    if (m) return decode(m[1]);
  }
  return undefined;
}

function link(html: string, rel: string): string | undefined {
  let m = html.match(new RegExp(`<link[^>]+rel=["']${rel}["'][^>]+href=["']([^"']+)["']`, "i"));
  if (m) return m[1];
  m = html.match(new RegExp(`<link[^>]+href=["']([^"']+)["'][^>]+rel=["']${rel}["']`, "i"));
  return m?.[1];
}

function decode(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

function resolve(href: string | undefined, base: string): string | undefined {
  if (!href) return undefined;
  try {
    return new URL(href, base).href;
  } catch {
    return href;
  }
}
