export function getThumbSrc(src: string | null): string | null {
  if (!src) return null;
  const match = src.match(/^\/images\/ghost\/(\d{4}\/.*)$/);
  if (match) return `/images/ghost/thumb/${match[1]}`;
  return src;
}

/**
 * Calculate reading time from raw post body text.
 * Chinese: ~300 chars/min. English: ~200 words/min.
 */
export function getReadingTime(body: string | undefined, lang: "zh-tw" | "en"): number {
  if (!body) return 3;
  const text = body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (lang === "en") {
    return Math.max(1, Math.round(text.split(" ").length / 200));
  }
  return Math.max(1, Math.round(text.length / 300));
}
