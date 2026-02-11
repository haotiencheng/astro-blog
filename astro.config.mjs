// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://reallyniceday.com",
  integrations: [tailwind(), sitemap()],
  redirects: {
    // Old Ghost URLs -> new i18n URLs
    // Chinese posts were at /[slug]/, now at /zh-tw/[slug]/
    // English posts were at /en/[slug]-en/, now at /en/[slug]-en/
    // Add specific redirects here as needed
  },
});
