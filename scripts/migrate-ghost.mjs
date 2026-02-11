#!/usr/bin/env node

/**
 * Ghost to Astro migration script.
 * Reads a Ghost export JSON and generates:
 * - Individual JSON files per post in src/data/posts/
 * - Individual JSON files per page in src/data/pages/
 * - Downloads images to public/images/
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, basename } from "path";
import https from "https";
import http from "http";

const GHOST_EXPORT_PATH = process.argv[2];
if (!GHOST_EXPORT_PATH) {
  console.error("Usage: node scripts/migrate-ghost.mjs <ghost-export.json>");
  process.exit(1);
}

const GHOST_URL = "https://reallyniceday.com";
const OUT_POSTS = "src/data/posts";
const OUT_PAGES = "src/data/pages";
const OUT_IMAGES = "public/images/ghost";

// Ensure directories
[OUT_POSTS, OUT_PAGES, OUT_IMAGES].forEach((dir) => {
  mkdirSync(dir, { recursive: true });
});

// Read Ghost export
const raw = readFileSync(GHOST_EXPORT_PATH, "utf-8");
const ghost = JSON.parse(raw);
const data = ghost.db[0].data;

// Build tag lookup: tagId -> tag object
const tagsById = {};
for (const tag of data.tags) {
  tagsById[tag.id] = tag;
}

// Build posts_tags lookup: postId -> [tag objects]
const postTags = {};
for (const pt of data.posts_tags) {
  if (!postTags[pt.post_id]) postTags[pt.post_id] = [];
  postTags[pt.post_id].push({
    ...tagsById[pt.tag_id],
    sort_order: pt.sort_order,
  });
}

// Sort tags by sort_order for each post
for (const postId of Object.keys(postTags)) {
  postTags[postId].sort((a, b) => a.sort_order - b.sort_order);
}

// Collect all image URLs to download
const imageUrls = new Set();

function replaceGhostUrls(html) {
  if (!html) return html;
  // Replace __GHOST_URL__ for images -> local path
  let replaced = html.replace(
    /__GHOST_URL__\/content\/images\//g,
    "/images/ghost/"
  );
  // Replace __GHOST_URL__ for internal links -> relative
  replaced = replaced.replace(/__GHOST_URL__\//g, "/");
  // Collect image URLs from the HTML
  const imgRegex = /\/images\/ghost\/[^"'\s)]+/g;
  const matches = replaced.match(imgRegex);
  if (matches) {
    for (const m of matches) {
      imageUrls.add(m);
    }
  }
  return replaced;
}

function getLanguage(tags) {
  return tags.some((t) => t.slug === "hash-en") ? "en" : "zh-tw";
}

function getPublicTags(tags) {
  return tags
    .filter((t) => t.visibility !== "internal")
    .map((t) => ({ name: t.name, slug: t.slug }));
}

// Find bilingual pairs by slug pattern (en posts end with -en)
function findPairSlug(slug, lang) {
  if (lang === "en") {
    // English slug ends with -en, pair is the base slug
    return slug.replace(/-en$/, "");
  } else {
    // Chinese slug, pair is slug + -en
    return slug + "-en";
  }
}

// Process posts
const posts = data.posts.filter((p) => p.type === "post");
const pages = data.posts.filter((p) => p.type === "page");

const allSlugs = new Set(posts.map((p) => p.slug));

let postCount = 0;
for (const post of posts) {
  const tags = postTags[post.id] || [];
  const lang = getLanguage(tags);
  const publicTags = getPublicTags(tags);
  const pairSlug = findPairSlug(post.slug, lang);
  const hasPair = allSlugs.has(pairSlug);

  const html = replaceGhostUrls(post.html);
  const featureImage = replaceGhostUrls(post.feature_image);

  const postData = {
    id: post.id,
    title: post.title,
    slug: post.slug,
    lang,
    html,
    plaintext: post.plaintext,
    excerpt: post.custom_excerpt || post.plaintext?.slice(0, 160) || "",
    feature_image: featureImage,
    featured: post.featured === 1,
    published_at: post.published_at,
    updated_at: post.updated_at,
    created_at: post.created_at,
    tags: publicTags,
    // Bilingual pair info
    pair_slug: hasPair ? pairSlug : null,
    pair_lang: hasPair ? (lang === "en" ? "zh-tw" : "en") : null,
  };

  const filename = `${post.slug}.json`;
  writeFileSync(join(OUT_POSTS, filename), JSON.stringify(postData, null, 2));
  postCount++;
}

// Process pages
let pageCount = 0;
for (const page of pages) {
  const html = replaceGhostUrls(page.html);
  const featureImage = replaceGhostUrls(page.feature_image);

  const pageData = {
    id: page.id,
    title: page.title,
    slug: page.slug,
    html,
    feature_image: featureImage,
    published_at: page.published_at,
    updated_at: page.updated_at,
  };

  const filename = `${page.slug}.json`;
  writeFileSync(join(OUT_PAGES, filename), JSON.stringify(pageData, null, 2));
  pageCount++;
}

console.log(`✓ Migrated ${postCount} posts to ${OUT_POSTS}/`);
console.log(`✓ Migrated ${pageCount} pages to ${OUT_PAGES}/`);

// Download images
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const fullUrl = GHOST_URL + "/content/images/" + url.replace("/images/ghost/", "");
    const client = fullUrl.startsWith("https") ? https : http;

    // Ensure directory exists
    const dir = join(dest, "..");
    mkdirSync(dir, { recursive: true });

    client
      .get(fullUrl, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          downloadFile(res.headers.location, dest).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${fullUrl}`));
          return;
        }

        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => {
          writeFileSync(dest, Buffer.concat(chunks));
          resolve();
        });
        res.on("error", reject);
      })
      .on("error", reject);
  });
}

console.log(`\nDownloading ${imageUrls.size} images...`);

let downloaded = 0;
let failed = 0;
for (const imgPath of imageUrls) {
  const dest = join("public", imgPath);
  if (existsSync(dest)) {
    downloaded++;
    continue;
  }
  try {
    await downloadFile(imgPath, dest);
    downloaded++;
    process.stdout.write(`  ✓ ${downloaded}/${imageUrls.size} ${basename(imgPath)}\n`);
  } catch (err) {
    failed++;
    console.error(`  ✗ Failed: ${imgPath} - ${err.message}`);
  }
}

console.log(`\n✓ Downloaded ${downloaded} images (${failed} failed)`);
console.log("\nMigration complete!");
