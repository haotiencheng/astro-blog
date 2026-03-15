import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const TagEnum = z.enum([
  "ai",
  "automation",
  "book-review",
  "business",
  "development",
  "n8n",
  "productivity",
  "psychology",
  "startup",
]);

const tagNames: Record<z.infer<typeof TagEnum>, string> = {
  ai: "AI",
  automation: "Automation",
  "book-review": "Book Review",
  business: "Business",
  development: "Development",
  n8n: "n8n",
  productivity: "Productivity",
  psychology: "Psychology",
  startup: "Startup",
};

const posts = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/posts",
    // Derive ID from lang+slug frontmatter so same-named files in zh-tw/ and en/
    // never collide in the collection store.
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
    tags: z
      .array(z.union([TagEnum, z.object({ name: z.string(), slug: TagEnum })]))
      .transform((tags) =>
        tags.map((tag) => {
          const slug = typeof tag === "string" ? tag : tag.slug;
          const name = typeof tag === "string" ? tagNames[slug] : tag.name;
          return { slug, name };
        }),
      ),
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
