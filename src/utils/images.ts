import type { ImageMetadata } from "astro";

// Pre-import all images stored in src/assets/posts/ at build time.
// New posts store images here and reference them as /assets/posts/[slug]/image.ext
// in their feature_image frontmatter field.
const postImages = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/posts/**/*.{jpg,jpeg,png,webp,gif,avif,svg,PNG,JPG,JPEG,WEBP}",
  { eager: true },
);

/**
 * Resolve a feature_image path to an ImageMetadata object if the image
 * lives in src/assets/posts/ (new posts). Returns null for legacy ghost
 * paths (/images/ghost/…) or remote URLs — those are rendered as plain <img>.
 *
 * Convention for new posts: store image at src/assets/posts/[slug]/cover.webp
 * and set feature_image: /assets/posts/[slug]/cover.webp in frontmatter.
 */
export function resolvePostImage(path: string | null): ImageMetadata | null {
  if (!path || !path.startsWith("/assets/posts/")) return null;
  const key = `/src${path}`; // /assets/posts/… → /src/assets/posts/…
  return postImages[key]?.default ?? null;
}
