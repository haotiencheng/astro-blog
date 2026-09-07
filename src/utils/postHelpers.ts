export function getThumbSrc(src: string | null): string | null {
  if (!src) return null;
  const match = src.match(/^\/images\/ghost\/(\d{4}\/.*)$/);
  if (match) return `/images/ghost/thumb/${match[1]}`;
  return src;
}

// CJK + kana. Counted per character; everything else is counted per word.
const CJK = /[㐀-鿿぀-ヿ豈-﫿]/g;

/**
 * Strip everything a reader does not actually read: code blocks, HTML tags,
 * markdown syntax. Link/image labels survive as plain text.
 */
function readableText(body: string): string {
  return body
    .replace(/```[\s\S]*?```/g, " ")          // fenced code
    .replace(/~~~[\s\S]*?~~~/g, " ")
    .replace(/<pre[\s\S]*?<\/pre>/gi, " ")    // Ghost HTML code blocks
    .replace(/<figcaption[\s\S]*?<\/figcaption>/gi, " ")
    .replace(/`[^`\n]*`/g, " ")               // inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")    // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")  // links keep their label
    .replace(/<[^>]+>/g, " ")                 // any remaining HTML
    .replace(/^\s{0,3}[#>]+\s*/gm, " ")       // headings, quotes
    .replace(/[*_~|]/g, " ")                  // emphasis, table pipes
    .replace(/&[a-z]+;|&#\d+;/gi, " ")        // HTML entities
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Reading time in minutes. CJK at ~300 chars/min, latin at ~200 words/min,
 * mixed text scored as the sum of both, so a zh post quoting English prose
 * is not counted as if every latin letter were a Chinese character.
 */
export function getReadingTime(body: string | undefined): number {
  if (!body) return 3;
  const text = readableText(body);
  if (!text) return 1;

  const cjkChars = text.match(CJK)?.length ?? 0;
  const words = text
    .replace(CJK, " ")
    .split(/\s+/)
    .filter((w) => /[\p{L}\p{N}]/u.test(w)).length;

  return Math.max(1, Math.round(cjkChars / 300 + words / 200));
}
