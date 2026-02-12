import { readFileSync } from "node:fs";

export function getThumbSrc(src: string | null): string | null {
  if (!src) return null;
  const match = src.match(/^\/images\/ghost\/(\d{4}\/.*)$/);
  if (match) return `/images/ghost/thumb/${match[1]}`;
  return src;
}

export function getReadingTime(slug: string, lang: "zh-tw" | "en"): number {
  const candidates =
    lang === "en"
      ? [`src/content/posts/${slug}.en.md`, `src/content/posts/${slug}.md`]
      : [`src/content/posts/${slug}.md`];

  for (const path of candidates) {
    try {
      const raw = readFileSync(path, "utf-8");
      const body = raw.replace(/^---\n[\s\S]*?\n---\n?/, "").trim();
      const text = body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      if (lang === "en") {
        return Math.max(1, Math.round(text.split(" ").length / 200));
      }
      return Math.max(1, Math.round(text.length / 300));
    } catch { /* try next */ }
  }
  return 3;
}
