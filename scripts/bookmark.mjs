#!/usr/bin/env node
/**
 * Fetch OG / meta data from a URL and print a ready-to-paste <Bookmark> component.
 *
 * Usage:
 *   bun scripts/bookmark.mjs <url>
 *
 * Example:
 *   bun scripts/bookmark.mjs https://t.me/BotFather
 */

const url = process.argv[2];
if (!url) {
  console.error('Usage: bun scripts/bookmark.mjs <url>');
  process.exit(1);
}

// ── helpers ────────────────────────────────────────────────────────────────

/** Extract a single meta tag value, handles both attribute orderings + quote styles. */
function meta(html, property, nameAttr = null) {
  const targets = [`property=["']${property}["']`];
  if (nameAttr) targets.push(`name=["']${nameAttr}["']`);

  for (const target of targets) {
    // content before the key attr
    let m = html.match(new RegExp(`<meta[^>]+content=["']([^"']*?)["'][^>]+${target}`, 'i'));
    if (m) return decode(m[1]);
    // key attr before content
    m = html.match(new RegExp(`<meta[^>]+${target}[^>]+content=["']([^"']*?)["']`, 'i'));
    if (m) return decode(m[1]);
  }
  return null;
}

/** Extract link[rel] href, handles attribute ordering. */
function linkHref(html, rel) {
  let m = html.match(new RegExp(`<link[^>]+rel=["']${rel}["'][^>]+href=["']([^"']+)["']`, 'i'));
  if (m) return m[1];
  m = html.match(new RegExp(`<link[^>]+href=["']([^"']+)["'][^>]+rel=["']${rel}["']`, 'i'));
  return m ? m[1] : null;
}

/** Decode common HTML entities. */
function decode(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}

/** Resolve a possibly-relative URL against a base. */
function resolve(href, base) {
  if (!href) return null;
  try { return new URL(href, base).href; } catch { return href; }
}

/** Escape a string for use inside a JSX/MDX attribute. */
function attr(str) {
  return str.replace(/"/g, '&quot;');
}

// ── fetch + parse ──────────────────────────────────────────────────────────

async function scrape(rawUrl) {
  const res = await fetch(rawUrl, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; bot/1.0)' },
    redirect: 'follow',
  });

  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  const html = await res.text();
  const base = res.url; // after redirects

  const title =
    meta(html, 'og:title') ??
    (html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] ?? '').trim();

  const description =
    meta(html, 'og:description') ??
    meta(html, null, 'description');

  const thumbnail = resolve(
    meta(html, 'og:image') ?? meta(html, 'og:image:url'),
    base,
  );

  const author =
    meta(html, 'og:site_name') ??
    meta(html, null, 'application-name');

  const icon = resolve(
    linkHref(html, 'apple-touch-icon') ??
    linkHref(html, 'icon') ??
    linkHref(html, 'shortcut icon') ??
    '/favicon.ico',
    base,
  );

  return { url: base, title, description, thumbnail, author, icon };
}

// ── output ─────────────────────────────────────────────────────────────────

scrape(url)
  .then(({ url, title, description, thumbnail, author, icon }) => {
    const lines = [
      `<Bookmark`,
      `  url="${attr(url)}"`,
      `  title="${attr(title)}"`,
      description  ? `  description="${attr(description)}"` : null,
      icon         ? `  icon="${attr(icon)}"` : null,
      author       ? `  author="${attr(author)}"` : null,
      thumbnail    ? `  thumbnail="${attr(thumbnail)}"` : null,
      `/>`,
    ].filter(Boolean);

    console.log('\n' + lines.join('\n') + '\n');
  })
  .catch((err) => {
    console.error('Error:', err.message);
    process.exit(1);
  });
