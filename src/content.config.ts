import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/posts",
    // Use lang+slug from frontmatter as ID so two files with the same slug
    // (zh-tw and en versions) never collide in the collection.
    generateId: ({ data }) => `${data.lang}-${data.slug}`,
  }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    lang: z.enum(["zh-tw", "en"]),
    excerpt: z.string(),
    feature_image: z.string().nullable(),
    featured: z.boolean(),
    published_at: z.string(),
    updated_at: z.string(),
    created_at: z.string(),
    tags: z.array(z.object({ name: z.string(), slug: z.string() })),
    pair_slug: z.string().nullable(),
    pair_lang: z.enum(["zh-tw", "en"]).nullable(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "src/data/pages" }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    slug: z.string(),
    html: z.string(),
    feature_image: z.string().nullable(),
    published_at: z.string(),
    updated_at: z.string(),
  }),
});

export const collections = { posts, pages };
