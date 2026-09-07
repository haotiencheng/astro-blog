import type { CollectionEntry } from "astro:content";

type Post = CollectionEntry<"posts">;

const time = (value: string | Date | null | undefined) => {
  if (!value) return 0;
  const t = new Date(value).getTime();
  return Number.isNaN(t) ? 0 : t;
};

/**
 * Newest first.
 *
 * Posts written on the same day usually carry the same midnight `published_at`,
 * which leaves the sort a tie and falls back to the collection order (the id,
 * i.e. alphabetical by slug) — so the newest post does not end up on top.
 * `created_at` and then `updated_at` break the tie; the slug is the last resort
 * so the order is at least stable between builds.
 */
export function byNewest(a: Post, b: Post) {
  return (
    time(b.data.published_at) - time(a.data.published_at) ||
    time(b.data.created_at) - time(a.data.created_at) ||
    time(b.data.updated_at) - time(a.data.updated_at) ||
    b.data.slug.localeCompare(a.data.slug)
  );
}

export function sortByNewest(posts: Post[]) {
  return [...posts].sort(byNewest);
}
