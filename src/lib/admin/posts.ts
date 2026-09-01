// Dev-only helpers for the local WYSIWYG editor.
// Everything here touches the filesystem, so callers must guard with
// `import.meta.env.DEV` (Vite dead-code-eliminates the branch in prod builds).
import { parse as parseYaml, stringify as stringifyYaml } from "yaml";

export const LANGS = ["zh-tw", "en"] as const;
export type Lang = (typeof LANGS)[number];

export const TAG_SLUGS = [
  "ai",
  "automation",
  "book-review",
  "business",
  "development",
  "n8n",
  "productivity",
  "psychology",
  "social-media",
  "startup",
] as const;

export const TAG_NAMES: Record<string, string> = {
  ai: "AI",
  automation: "Automation",
  "book-review": "Book Review",
  business: "Business",
  development: "Development",
  n8n: "n8n",
  productivity: "Productivity",
  psychology: "Psychology",
  "social-media": "Social Media",
  startup: "Startup",
};

export type Frontmatter = {
  title: string;
  slug: string;
  lang: Lang;
  excerpt: string;
  feature_image: string | null;
  featured: boolean;
  published_at: string;
  updated_at: string;
  created_at: string;
  tags: { name: string; slug: string }[];
  pair_slug: string | null;
  pair_lang: Lang | null;
};

/** wysiwyg = plain Markdown body; raw = MDX or migrated Ghost HTML (edit as source). */
export type Mode = "wysiwyg" | "raw";

const POSTS_DIR = "src/content/posts";
const FM_RE = /^---\n([\s\S]*?)\n---\n?/;

export function postsRoot(cwd: string) {
  return `${cwd}/${POSTS_DIR}`;
}

export function filePath(cwd: string, lang: string, slug: string, ext: string) {
  return `${postsRoot(cwd)}/${lang}/${slug}.${ext}`;
}

/**
 * Ghost-migrated posts wrap long excerpts across lines without indenting the
 * continuation, which strict YAML rejects. Indent any line that continues an
 * open double-quoted scalar; YAML folds the added indent away.
 */
function repairYaml(src: string): string {
  const out: string[] = [];
  let open = false;
  for (const line of src.split("\n")) {
    out.push(open ? `  ${line}` : line);
    const quotes = (line.match(/(?<!\\)"/g) ?? []).length;
    if (quotes % 2 === 1) open = !open;
  }
  return out.join("\n");
}

export function splitFile(raw: string): { data: any; body: string; fmError?: string } {
  const m = raw.match(FM_RE);
  if (!m) return { data: {}, body: raw };
  const body = raw.slice(m[0].length);
  for (const src of [m[1], repairYaml(m[1])]) {
    try {
      return { data: parseYaml(src) ?? {}, body };
    } catch {
      /* try the repaired variant next */
    }
  }
  return { data: {}, body, fmError: "unparseable frontmatter" };
}

export function detectMode(ext: string, body: string): Mode {
  if (ext === "mdx") return "raw";
  return body.trimStart().startsWith("<") ? "raw" : "wysiwyg";
}

export function normalizeTags(tags: unknown): { name: string; slug: string }[] {
  if (!Array.isArray(tags)) return [];
  return tags
    .map((t) => {
      const slug = typeof t === "string" ? t : t?.slug;
      if (!slug || !TAG_SLUGS.includes(slug)) return null;
      const name = typeof t === "string" ? TAG_NAMES[slug] : (t.name ?? TAG_NAMES[slug]);
      return { name, slug };
    })
    .filter(Boolean) as { name: string; slug: string }[];
}

/** Serialize frontmatter in the field order the rest of the repo uses. */
export function buildFile(fm: Frontmatter, body: string): string {
  const ordered = {
    title: fm.title,
    slug: fm.slug,
    lang: fm.lang,
    excerpt: fm.excerpt,
    feature_image: fm.feature_image || null,
    featured: !!fm.featured,
    published_at: fm.published_at,
    updated_at: fm.updated_at,
    created_at: fm.created_at,
    tags: normalizeTags(fm.tags),
    pair_slug: fm.pair_slug || null,
    pair_lang: fm.pair_lang || null,
  };
  const yaml = stringifyYaml(ordered, {
    defaultStringType: "QUOTE_DOUBLE",
    defaultKeyType: "PLAIN",
    lineWidth: 0,
  });
  return `---\n${yaml}---\n\n${body.trim()}\n`;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}
