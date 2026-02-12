# Astro Blog — Ghost Migration

## Overview
Static blog migrated from Ghost CMS to Astro 5. Bilingual (zh-tw / en).
Deployed to Cloudflare Pages. Content authored in Markdown files.

## Architecture
- **Framework**: Astro 5 (SSG, static output)
- **Styling**: Tailwind CSS 3 + `@tailwindcss/typography` (`prose` class)
- **Content**: Markdown files in `src/content/posts/` with frontmatter
- **i18n**: File-based routing — `/zh-tw/[slug]/` and `/en/[slug]/`
- **Language detection**: `lang` field in frontmatter (`zh-tw` or `en`)
- **Bilingual pairs**: Auto-detected by matching slugs across languages. `pair_slug` in frontmatter as optional override.
- **Images**: Static files in `public/images/ghost/` (migrated from Ghost)
- **SEO**: OG/Twitter meta tags, `hreflang` alternates, sitemap via `@astrojs/sitemap`

## Key Files
```
src/
├── content.config.ts              # Collection schema (posts, pages)
├── content/posts/*.md             # Blog posts (Markdown + frontmatter)
├── data/pages/*.json              # Static pages (About, Projects) — still JSON
├── layouts/
│   ├── BaseLayout.astro           # HTML shell, nav, footer, SEO meta
│   └── PostLayout.astro           # Post page: feature image, prose rendering
├── components/PostCard.astro      # Post listing card
├── pages/
│   ├── index.astro                # Chinese home (lists zh-tw posts)
│   ├── about.astro                # About page
│   ├── [slug].astro               # 301 redirect: /[slug]/ → /zh-tw/[slug]/
│   ├── zh-tw/[slug].astro         # Chinese post pages
│   └── en/
│       ├── index.astro            # English home
│       └── [slug].astro           # English post pages
```

## Adding a New Post
Create a `.md` file in `src/content/posts/`:

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

For the English version, create a second file with the **same slug** but `lang: en`:
- `my-post-slug.md` → `lang: zh-tw`, `slug: my-post-slug`
- `my-post-slug.en.md` → `lang: en`, `slug: my-post-slug`

Pairs are auto-detected at build time by matching slugs across languages.
No need to set `pair_slug` / `pair_lang` unless the slugs differ.

## Slug Convention (New Posts)
- Use the **same slug** for both languages (e.g., `the-mom-test`)
- Filename: `the-mom-test.md` (zh-tw), `the-mom-test.en.md` (en)
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

### The Solution (Raw File Read + set:html)
Both `src/pages/zh-tw/[slug].astro` and `src/pages/en/[slug].astro` now:
1. Read the raw `.md` file from disk using `readFileSync`
2. Strip frontmatter with a line-aware regex: `/^---\n[\s\S]*?\n---\n?/`
   (requires `---` on its own line, avoiding false matches mid-path)
3. Pass the raw HTML body to `<Fragment set:html={htmlContent} />`

This bypasses `render(post)` and Astro's Markdown pipeline entirely.

### Writing New Posts
Write the body in **pure Markdown**. The page routes auto-detect format:
- Body starts with `<` → treated as raw HTML (all 23 migrated Ghost posts)
- Body starts with anything else → processed through `marked` as Markdown (new posts)

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
