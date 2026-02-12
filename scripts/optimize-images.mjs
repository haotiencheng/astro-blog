#!/usr/bin/env node

/**
 * Image optimization script.
 * - Converts PNG/JPG to WebP (quality 80)
 * - Generates 480w thumbnails for card grid
 * - Deletes original PNG/JPG after conversion
 * - Updates all image references in content files
 * - Removes oversized Ghost variants (w1600, w2400)
 * - Skips GIFs and ICOs
 */

import sharp from "sharp";
import {
  readFileSync, writeFileSync, unlinkSync, mkdirSync,
  existsSync, readdirSync, statSync, rmdirSync,
} from "fs";
import { join, extname, dirname, relative } from "path";

const IMAGE_DIR = "public/images/ghost";
const CONTENT_DIR = "src/content/posts";
const PAGES_DIR = "src/data/pages";
const THUMB_WIDTH = 480;
const WEBP_QUALITY = 80;

function walkDir(dir) {
  const results = [];
  function walk(d) {
    for (const entry of readdirSync(d, { withFileTypes: true })) {
      const full = join(d, entry.name);
      if (entry.isDirectory()) walk(full);
      else results.push(full);
    }
  }
  walk(dir);
  return results;
}

const CONVERTIBLE = new Set([".png", ".jpg", ".jpeg"]);
const allImages = walkDir(IMAGE_DIR);
const toConvert = allImages.filter((f) => CONVERTIBLE.has(extname(f).toLowerCase()));

console.log(`Found ${allImages.length} images, ${toConvert.length} to convert to WebP\n`);

// Step 1: Convert to WebP + generate thumbnails
let converted = 0;
let thumbs = 0;
let savedBytes = 0;

for (const imgPath of toConvert) {
  const webpPath = imgPath.replace(/\.(png|jpe?g)$/i, ".webp");

  if (existsSync(webpPath)) {
    converted++;
    continue;
  }

  try {
    const originalSize = statSync(imgPath).size;
    const img = sharp(imgPath);
    const meta = await img.metadata();

    await img.webp({ quality: WEBP_QUALITY }).toFile(webpPath);
    const newSize = statSync(webpPath).size;
    savedBytes += originalSize - newSize;
    converted++;

    // Generate card thumbnail for main content images
    const relPath = relative(IMAGE_DIR, imgPath);
    if (!relPath.startsWith("size/") && !relPath.startsWith("icon/") && meta.width > THUMB_WIDTH) {
      const thumbSubDir = join(IMAGE_DIR, "thumb", dirname(relPath));
      mkdirSync(thumbSubDir, { recursive: true });
      const thumbPath = join(IMAGE_DIR, "thumb", relPath.replace(/\.(png|jpe?g)$/i, ".webp"));

      if (!existsSync(thumbPath)) {
        await sharp(imgPath)
          .resize(THUMB_WIDTH)
          .webp({ quality: WEBP_QUALITY })
          .toFile(thumbPath);
        thumbs++;
      }
    }

    if (converted % 50 === 0) {
      process.stdout.write(`  ${converted}/${toConvert.length} converted...\n`);
    }
  } catch (err) {
    console.error(`  ✗ ${imgPath}: ${err.message}`);
  }
}

console.log(`\n✓ Converted ${converted} images to WebP`);
console.log(`✓ Generated ${thumbs} thumbnails (${THUMB_WIDTH}px)`);
console.log(`✓ Saved ${(savedBytes / 1024 / 1024).toFixed(1)}MB\n`);

// Step 2: Delete original PNG/JPG files
let deleted = 0;
for (const imgPath of toConvert) {
  const webpPath = imgPath.replace(/\.(png|jpe?g)$/i, ".webp");
  if (existsSync(webpPath)) {
    try {
      unlinkSync(imgPath);
      deleted++;
    } catch {}
  }
}
console.log(`✓ Deleted ${deleted} original PNG/JPG files\n`);

// Step 3: Update image references in content
function updateRefs(dir, ext) {
  const files = walkDir(dir).filter((f) => f.endsWith(ext));
  let updated = 0;
  for (const file of files) {
    let content = readFileSync(file, "utf-8");
    const original = content;
    content = content.replace(
      /(\/images\/ghost\/[^"'\s)]+)\.(png|jpe?g|JPG)/gi,
      "$1.webp"
    );
    if (content !== original) {
      writeFileSync(file, content);
      updated++;
    }
  }
  return updated;
}

const postsUpdated = updateRefs(CONTENT_DIR, ".md");
const pagesUpdated = updateRefs(PAGES_DIR, ".json");
console.log(`✓ Updated ${postsUpdated} post files`);
console.log(`✓ Updated ${pagesUpdated} page files\n`);

// Step 4: Remove oversized Ghost variants
for (const size of ["w1600", "w2400"]) {
  const dir = join(IMAGE_DIR, "size", size);
  if (existsSync(dir)) {
    const files = walkDir(dir);
    for (const f of files) {
      try { unlinkSync(f); } catch {}
    }
    // Clean empty dirs
    function rmEmpty(d) {
      for (const e of readdirSync(d, { withFileTypes: true })) {
        if (e.isDirectory()) rmEmpty(join(d, e.name));
      }
      try { rmdirSync(d); } catch {}
    }
    rmEmpty(dir);
    console.log(`✓ Removed size/${size}/ variant`);
  }
}

// Final summary
console.log("");
const finalImages = walkDir(IMAGE_DIR);
let totalSize = 0;
for (const f of finalImages) {
  totalSize += statSync(f).size;
}
console.log(`Final: ${finalImages.length} files, ${(totalSize / 1024 / 1024).toFixed(1)}MB`);
console.log(`(was 151MB → ${(totalSize / 1024 / 1024).toFixed(1)}MB)`);
