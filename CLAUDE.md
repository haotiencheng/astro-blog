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
- **Bilingual pairs**: `pair_slug` in frontmatter links zh-tw ↔ en versions
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
feature_image: /images/ghost/2025/03/cover.png
featured: false
published_at: "2025-03-01T00:00:00.000Z"
updated_at: "2025-03-01T00:00:00.000Z"
created_at: "2025-03-01T00:00:00.000Z"
tags:
  - name: AI
    slug: ai
pair_slug: my-post-slug-en    # null if no translation
pair_lang: en                  # null if no translation
---

Your Markdown content here.
```

For English version, set `lang: en` and `pair_slug` pointing back to the Chinese slug.

## Slug Convention
- Chinese posts: descriptive English slug (e.g., `the-mom-test`)
- English posts: same slug + `-en` suffix (e.g., `the-mom-test-en`)
- This convention is used to auto-detect bilingual pairs

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

## Ghost HTML in Migrated Posts
Existing posts contain raw Ghost HTML in the Markdown body (bookmark cards, image cards, etc.).
Astro's Markdown pipeline passes through HTML blocks. New posts should be written in pure Markdown.

## Domain
- Production: https://reallyniceday.com
- Original platform: Ghost (no longer used as frontend)
