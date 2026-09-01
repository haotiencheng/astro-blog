// Dev-only integration: serves /api/admin/* from the Vite dev server (real Node),
// because Astro API routes run inside workerd where node:fs is unavailable.
import type { AstroIntegration } from "astro";
import fsp from "node:fs/promises";
import path from "node:path";
import {
  LANGS,
  buildFile,
  detectMode,
  filePath,
  normalizeTags,
  postsRoot,
  slugify,
  splitFile,
  type Frontmatter,
} from "../lib/admin/posts";

const IMAGE_EXT: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
  "image/svg+xml": "svg",
};

const safeSlug = (s: unknown) =>
  typeof s === "string" && /^[a-z0-9][a-z0-9-]*$/.test(s) ? s : null;
const exists = (p: string) => fsp.stat(p).then(() => true, () => false);

export default function adminEditor(): AstroIntegration {
  return {
    name: "admin-editor",
    hooks: {
      // Editor UI is dev-only: injecting the routes here (instead of keeping
      // them in src/pages) keeps the TipTap bundle out of production builds.
      "astro:config:setup": ({ command, injectRoute }) => {
        if (command !== "dev") return;
        injectRoute({ pattern: "/admin", entrypoint: "./src/admin/index.astro" });
        injectRoute({ pattern: "/admin/edit", entrypoint: "./src/admin/edit.astro" });
      },
      "astro:server:setup": ({ server }) => {
        const cwd = process.cwd();

        server.middlewares.use(async (req: any, res: any, next: any) => {
          const url = new URL(req.url ?? "/", "http://localhost");
          if (!url.pathname.startsWith("/api/admin/")) return next();

          const send = (status: number, data: unknown) => {
            res.statusCode = status;
            res.setHeader("content-type", "application/json");
            res.end(JSON.stringify(data));
          };
          const bad = (msg: string) => send(400, { error: msg });

          const readBody = async () => {
            const chunks: Buffer[] = [];
            for await (const c of req) chunks.push(c as Buffer);
            return Buffer.concat(chunks);
          };

          try {
            /* ---- listing / single post ---- */
            if (url.pathname === "/api/admin/posts" && req.method === "GET") {
              const lang = url.searchParams.get("lang");
              const slug = url.searchParams.get("slug");

              if (lang && slug) {
                if (!LANGS.includes(lang as any) || !safeSlug(slug)) return bad("bad lang/slug");
                for (const ext of ["mdx", "md"]) {
                  const raw = await fsp
                    .readFile(filePath(cwd, lang, slug, ext), "utf8")
                    .catch(() => null);
                  if (raw === null) continue;
                  const { data, body } = splitFile(raw);
                  return send(200, {
                    frontmatter: data,
                    body,
                    ext,
                    mode: detectMode(ext, body),
                  });
                }
                return send(404, { error: "not found" });
              }

              const posts: any[] = [];
              for (const l of LANGS) {
                const dir = `${postsRoot(cwd)}/${l}`;
                for (const f of await fsp.readdir(dir).catch(() => [])) {
                  const m = f.match(/^(.+)\.(md|mdx)$/);
                  if (!m) continue;
                  const { data, body } = splitFile(await fsp.readFile(`${dir}/${f}`, "utf8"));
                  posts.push({
                    lang: l,
                    slug: data.slug ?? m[1],
                    file: `${l}/${f}`,
                    ext: m[2],
                    mode: detectMode(m[2], body),
                    title: data.title ?? m[1],
                    excerpt: data.excerpt ?? "",
                    featured: !!data.featured,
                    published_at: data.published_at ?? "",
                    feature_image: data.feature_image ?? null,
                  });
                }
              }
              posts.sort((a, b) => String(b.published_at).localeCompare(String(a.published_at)));
              return send(200, { posts });
            }

            /* ---- save ---- */
            if (url.pathname === "/api/admin/posts" && req.method === "POST") {
              const payload = JSON.parse((await readBody()).toString("utf8")) as {
                frontmatter: Frontmatter;
                body: string;
                ext: "md" | "mdx";
                original?: { lang: string; slug: string; ext: string } | null;
              };
              const fm = payload.frontmatter;
              const ext = payload.ext === "mdx" ? "mdx" : "md";
              const slug = safeSlug(fm?.slug);
              if (!slug) return bad("slug must be lowercase a-z0-9 and dashes");
              if (!LANGS.includes(fm?.lang as any)) return bad("bad lang");
              if (!fm.title?.trim()) return bad("title required");

              const now = new Date().toISOString();
              const clean: Frontmatter = {
                ...fm,
                slug,
                excerpt: fm.excerpt ?? "",
                feature_image: fm.feature_image || null,
                featured: !!fm.featured,
                created_at: fm.created_at || now,
                published_at: fm.published_at || now,
                updated_at: now,
                tags: normalizeTags(fm.tags),
                pair_slug: fm.pair_slug || null,
                pair_lang: fm.pair_lang || null,
              };

              const target = filePath(cwd, clean.lang, slug, ext);
              const orig = payload.original;
              const origPath =
                orig && safeSlug(orig.slug) && LANGS.includes(orig.lang as any)
                  ? filePath(cwd, orig.lang, orig.slug, orig.ext === "mdx" ? "mdx" : "md")
                  : null;

              if (origPath !== target && (await exists(target))) {
                return bad(`${clean.lang}/${slug}.${ext} already exists`);
              }

              await fsp.mkdir(path.dirname(target), { recursive: true });
              await fsp.writeFile(target, buildFile(clean, payload.body ?? ""), "utf8");
              if (origPath && origPath !== target) await fsp.rm(origPath, { force: true });

              return send(200, { ok: true, lang: clean.lang, slug, ext, updated_at: clean.updated_at });
            }

            /* ---- delete ---- */
            if (url.pathname === "/api/admin/posts" && req.method === "DELETE") {
              const lang = url.searchParams.get("lang");
              const slug = safeSlug(url.searchParams.get("slug"));
              const ext = url.searchParams.get("ext") === "mdx" ? "mdx" : "md";
              if (!slug || !LANGS.includes(lang as any)) return bad("bad lang/slug");
              await fsp.rm(filePath(cwd, lang!, slug, ext), { force: true });
              return send(200, { ok: true });
            }

            /* ---- image upload ---- */
            if (url.pathname === "/api/admin/upload" && req.method === "POST") {
              const buf = await readBody();
              const form = await new Response(buf, {
                headers: { "content-type": req.headers["content-type"] ?? "" },
              }).formData();
              const file = form.get("file");
              if (!(file instanceof File)) return bad("no file");

              const ext = IMAGE_EXT[file.type] ?? file.name.split(".").pop()?.toLowerCase();
              if (!ext || !Object.values(IMAGE_EXT).includes(ext)) {
                return bad(`unsupported type ${file.type}`);
              }

              const d = new Date();
              const rel = `images/uploads/${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}`;
              const dir = path.join(cwd, "public", rel);
              await fsp.mkdir(dir, { recursive: true });

              const base = slugify(file.name.replace(/\.[^.]+$/, "")) || "image";
              let name = `${base}.${ext}`;
              let n = 1;
              while (await exists(path.join(dir, name))) name = `${base}-${n++}.${ext}`;

              await fsp.writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
              return send(200, { url: `/${rel}/${name}` });
            }

            return send(404, { error: "unknown endpoint" });
          } catch (err: any) {
            return send(500, { error: err?.message ?? String(err) });
          }
        });
      },
    },
  };
}
