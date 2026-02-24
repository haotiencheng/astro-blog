# Astro Blog — Ghost Migration

## Overview
Static blog migrated from Ghost CMS to Astro 5. Bilingual (zh-tw / en).
Deployed to Cloudflare Pages. Content authored in Markdown files.

## Architecture
- **Framework**: Astro 5 (SSG, static output)
- **Styling**: Tailwind CSS 3 + `@tailwindcss/typography` (`prose` class)
- **Content**: Markdown/MDX files in `src/content/posts/` with frontmatter
- **i18n**: File-based routing — `/zh-tw/[slug]/` and `/en/[slug]/`
- **Language detection**: `lang` field in frontmatter (`zh-tw` or `en`)
- **Bilingual pairs**: Auto-detected by matching slugs across languages. `pair_slug` in frontmatter as optional override.
- **Images**: Static files in `public/images/ghost/` (migrated from Ghost)
- **SEO**: OG/Twitter meta tags, `hreflang` alternates, sitemap via `@astrojs/sitemap`

## Key Files
```
src/
├── content.config.ts              # Collection schema (posts, pages)
├── content/posts/*.{md,mdx}       # Blog posts (Markdown/MDX + frontmatter)
├── data/pages/*.json              # Static pages (About, Projects) — still JSON
├── layouts/
│   ├── BaseLayout.astro           # HTML shell, nav, footer, SEO meta
│   └── PostLayout.astro           # Post page: feature image, prose rendering
├── components/PostCard.astro      # Post listing card
├── pages/
│   ├── index.astro                # Chinese home (lists zh-tw posts)
│   ├── about.astro                # About page
│   ├── [slug].astro               # 301 redirect: /[slug]/ → /zh-tw/[slug]/
│   ├── [lang]/[slug].astro        # Post pages (unified — handles both zh-tw and en)
│   └── en/
│       └── index.astro            # English home
```

## Adding a New Post

### Markdown post (no interactive components)

Create `src/content/posts/my-post-slug.md`:

```md
---
title: "文章標題"
slug: my-post-slug
lang: zh-tw
excerpt: "簡短描述"
feature_image: /images/my-cover.png
featured: false
published_at: "2025-03-01T00:00:00.000Z"
updated_at: "2025-03-01T00:00:00.000Z"
created_at: "2025-03-01T00:00:00.000Z"
tags:
  - name: AI
    slug: ai
pair_slug: null
pair_lang: null
---

Your Markdown content here.
```

### MDX post (needs custom components or web components)

Use `.mdx` extension. Same frontmatter. Import components at the top of the body or use web component scripts inline:

```mdx
---
title: "My Post"
slug: my-post-slug
lang: zh-tw
...
---

<script type="module" src="https://cdn.example.com/my-component.js"></script>

<my-component prop="value"></my-component>

Rest of post in **Markdown**.
```

**Important MDX rules:**
- Boolean HTML attributes must use bare syntax (e.g. `<my-component frame>` not `frame=true`)
- JSX attribute syntax applies: string values need quotes, expressions need `{}`

### Bilingual pairs

For the English version, create a second file with the **same slug** but `lang: en`:

| Format | zh-tw filename | en filename |
|--------|---------------|-------------|
| Markdown | `my-post-slug.md` | `my-post-slug-en.md` |
| MDX | `my-post-slug.mdx` | `my-post-slug-en.mdx` |

Both files use `slug: my-post-slug` in frontmatter → routes `/zh-tw/my-post-slug/` and `/en/my-post-slug/`.

Pairs are auto-detected at build time by matching slugs across languages.
No need to set `pair_slug` / `pair_lang` unless the slugs differ.

## Slug Convention (New Posts)
- Use the **same slug** for both languages (e.g., `the-mom-test`)
- Filename: `the-mom-test.md` / `the-mom-test.mdx` (zh-tw), `the-mom-test-en.md` / `the-mom-test-en.mdx` (en)
- Routes: `/zh-tw/the-mom-test/` and `/en/the-mom-test/`

## Slug Convention (Legacy / Migrated Posts)
- Chinese: `the-mom-test` → English: `the-mom-test-en`
- The `-en` suffix convention is still supported for backward compatibility
- Do NOT change old slugs — they are indexed by search engines

## Old URL Redirects
Old Ghost URLs at `/[slug]/` are redirected to `/zh-tw/[slug]/` via meta refresh.
Old English URLs at `/en/[slug]-en/` map to the same new path — no redirect needed.

## Commands
- `bun run dev` — Start dev server (localhost:4321)
- `bun run build` — Build static site to `dist/`
- `bun run preview` — Preview built site
- `node scripts/migrate-ghost.mjs <export.json>` — Re-run Ghost migration

## Migration Script
`scripts/migrate-ghost.mjs` reads a Ghost export JSON and generates:
- Markdown files per post in `src/content/posts/`
- JSON files per page in `src/data/pages/`
- Downloads images to `public/images/ghost/`
Replaces `__GHOST_URL__` with local image paths. Detects bilingual pairs by `-en` slug suffix.

## Content Rendering — IMPORTANT

### The Problem (Ghost HTML + Markdown Pipeline)
Migrated posts contain raw Ghost HTML in the body (bookmark cards, code blocks, etc.).
Astro's remark/rehype Markdown pipeline corrupts this HTML when `<pre><code>` blocks contain
Markdown-like syntax such as `# heading` or ` ``` ` fenced code blocks. The parser treats
them as real Markdown and eats everything after the code block.

**Example**: `llms-txt-user-manual-for-content-in-the-ai-era` showed only 6 of 17 headings
because the Markdown renderer interpreted `# daisyUI 5` inside a `<pre><code>` as a heading.

There was also a secondary bug: `feature_image` paths like `/images/ghost/2025/04/---3-1.webp`
contain `---` mid-path, which tricked a naive frontmatter-stripping regex into stopping early,
leaking frontmatter YAML into the rendered page.

### The Solution (Three Rendering Paths)

`src/pages/[lang]/[slug].astro` (unified page for both languages) picks a rendering path at build time:

**Path 1 — MDX** (new posts needing components):
- Detected by `existsSync(mdxFile)` where `mdxFile` is `${slug}.mdx` (zh-tw) or `${slug}-en.mdx` (en)
- Uses Astro's `render(post)` → `<Content />` (full MDX pipeline, JSX components work)

**Path 2 — Markdown** (new plain text posts):
- `.md` file body does NOT start with `<`
- Processed through `marked` for standard Markdown → HTML conversion

**Path 3 — Legacy Ghost HTML** (all 23 migrated posts):
- `.md` file body starts with `<`
- Read raw via `readFileSync`, bypasses Astro's remark/rehype pipeline entirely
- Passed to `<Fragment set:html={htmlContent} />`

Frontmatter is stripped with a line-aware regex `/^---\n[\s\S]*?\n---\n?/` (requires `---` on its own line, avoiding false matches in paths like `/images/ghost/2025/04/---3-1.webp`).

### Collection ID Collision (Critical)

The Astro glob loader derives a collection ID from the filename by stripping dots. `foo.mdx` and `foo.en.mdx` would both get ID `foo`, causing one to silently overwrite the other.

**Fix in `content.config.ts`:** use `generateId` to derive the ID from frontmatter instead:
```ts
loader: glob({
  pattern: "**/*.{md,mdx}",
  base: "src/content/posts",
  generateId: ({ data }) => `${data.lang}-${data.slug}`,
}),
```
This guarantees uniqueness: `zh-tw-my-post-slug` vs `en-my-post-slug`.

### Writing New Posts
Write the body in **pure Markdown** (`.md`) or **MDX** (`.mdx`). The page route auto-detects:
- `.mdx` file exists for the slug → MDX path (components, scripts, JSX)
- Body starts with `<` → raw Ghost HTML path
- Anything else → `marked()` Markdown path

No frontmatter flag needed. Just write Markdown naturally:

```md
---
title: "My New Post"
slug: my-new-post
lang: zh-tw
...
---

## Introduction

Write in **Markdown** as normal. Images, links, code blocks all work.
```

## Planned Features (Not Yet Built)

### Claps + Comments (Cloudflare Pages Functions + D1)
Designed but not implemented. When ready to build:

**Claps**
- Medium-style, up to 50 claps per visitor per post
- Visitor clap count tracked in `localStorage` (keyed by slug)
- Total clap count stored in Cloudflare D1

**Comments**
- Name + email required, no login
- Auto-publish (no moderation queue)
- Stored in Cloudflare D1

**Backend**
- Cloudflare Pages Functions (edge Workers) inside the same project — no separate server
- Add a `/functions/api/` directory; Cloudflare deploys it alongside static assets automatically
- D1 tables: `claps(slug, count)` and `comments(id, slug, name, email, body, created_at)`
- Add D1 binding to `wrangler.jsonc`, run one SQL migration, done

**Setup steps when ready**
1. Create D1 database in Cloudflare dashboard
2. Add binding to `wrangler.jsonc`
3. Create `/functions/api/claps/[slug].ts` and `/functions/api/comments/[slug].ts`
4. Add clap button + comments section as client-side components in `PostLayout.astro`

## Domain
- Production: https://reallyniceday.com
- Original platform: Ghost (no longer used as frontend)
