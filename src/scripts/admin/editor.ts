import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { Placeholder } from "@tiptap/extensions";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";
import { marked } from "marked";

type Lang = "zh-tw" | "en";
type Mode = "wysiwyg" | "raw";

const TAGS: [string, string][] = [
  ["ai", "AI"],
  ["automation", "Automation"],
  ["book-review", "Book Review"],
  ["business", "Business"],
  ["development", "Development"],
  ["n8n", "n8n"],
  ["productivity", "Productivity"],
  ["psychology", "Psychology"],
  ["social-media", "Social Media"],
  ["startup", "Startup"],
];

const td = new TurndownService({
  headingStyle: "atx",
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
  emDelimiter: "*",
  hr: "---",
});
td.use(gfm);

// TipTap wraps list item content in <p>; unwrap it so lists stay tight.
td.addRule("tightListItemParagraph", {
  filter: (node) =>
    node.nodeName === "P" && node.parentNode?.nodeName === "LI" && node.parentNode.childNodes.length === 1,
  replacement: (content) => content,
});

// Same as Turndown's default list rule, but indents with 2 spaces (repo style).
td.addRule("listItem", {
  filter: "li",
  replacement: (content, node, options) => {
    const body = content
      .replace(/^\n+/, "")
      .replace(/\n+$/, "\n")
      .replace(/\n/gm, "\n  ");
    const parent = node.parentNode as HTMLElement;
    let prefix = `${options.bulletListMarker} `;
    if (parent?.nodeName === "OL") {
      const start = parent.getAttribute("start");
      const index = Array.prototype.indexOf.call(parent.children, node);
      prefix = `${start ? Number(start) + index : index + 1}. `;
    }
    return prefix + body + (node.nextSibling && !/\n$/.test(body) ? "\n" : "");
  },
});
// Keep bare HTML blocks (embeds, iframes) untouched instead of stripping them.
td.keep(["iframe", "figure", "video", "sup", "sub"]);

const $ = <T = HTMLElement>(sel: string) => document.querySelector(sel as any) as T;

const state = {
  original: null as { lang: string; slug: string; ext: string } | null,
  ext: "md" as "md" | "mdx",
  mode: "wysiwyg" as Mode,
  dirty: false,
  saving: false,
  ready: false,
};

let editor: Editor | null = null;

/* ---------------- frontmatter form ---------------- */

function readForm() {
  const tags = [...document.querySelectorAll<HTMLInputElement>(".fm-tag:checked")].map((el) => ({
    slug: el.value,
    name: TAGS.find(([s]) => s === el.value)![1],
  }));
  return {
    title: $<HTMLInputElement>("#fm-title").value.trim(),
    slug: $<HTMLInputElement>("#fm-slug").value.trim(),
    lang: $<HTMLSelectElement>("#fm-lang").value as Lang,
    excerpt: $<HTMLTextAreaElement>("#fm-excerpt").value.trim(),
    feature_image: $<HTMLInputElement>("#fm-feature").value.trim() || null,
    featured: $<HTMLInputElement>("#fm-featured").checked,
    published_at: toIso($<HTMLInputElement>("#fm-published").value),
    created_at: $<HTMLInputElement>("#fm-created").dataset.iso || new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tags,
    pair_slug: $<HTMLInputElement>("#fm-pair-slug").value.trim() || null,
    pair_lang: ($<HTMLSelectElement>("#fm-pair-lang").value || null) as Lang | null,
  };
}

function fillForm(fm: any) {
  $<HTMLInputElement>("#fm-title").value = fm.title ?? "";
  $<HTMLInputElement>("#fm-slug").value = fm.slug ?? "";
  $<HTMLSelectElement>("#fm-lang").value = fm.lang ?? "zh-tw";
  $<HTMLTextAreaElement>("#fm-excerpt").value = fm.excerpt ?? "";
  $<HTMLInputElement>("#fm-feature").value = fm.feature_image ?? "";
  $<HTMLInputElement>("#fm-featured").checked = !!fm.featured;
  $<HTMLInputElement>("#fm-published").value = toLocalInput(fm.published_at);
  const created = $<HTMLInputElement>("#fm-created");
  created.dataset.iso = fm.created_at ?? new Date().toISOString();
  created.value = toLocalInput(created.dataset.iso);
  $<HTMLInputElement>("#fm-pair-slug").value = fm.pair_slug ?? "";
  $<HTMLSelectElement>("#fm-pair-lang").value = fm.pair_lang ?? "";
  const slugs = new Set((fm.tags ?? []).map((t: any) => (typeof t === "string" ? t : t.slug)));
  document.querySelectorAll<HTMLInputElement>(".fm-tag").forEach((el) => {
    el.checked = slugs.has(el.value);
  });
  $("#doc-title").textContent = fm.title || "Untitled";
}

function toIso(local: string) {
  return local ? new Date(local).toISOString() : new Date().toISOString();
}
function toLocalInput(iso?: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/* ---------------- images ---------------- */

async function uploadImage(file: File): Promise<string | null> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  const json = (await res.json()) as any;
  if (!res.ok) {
    toast(json.error ?? "upload failed", true);
    return null;
  }
  return json.url as string;
}

async function insertImageFiles(files: File[]) {
  for (const f of files) {
    if (!f.type.startsWith("image/")) continue;
    const url = await uploadImage(f);
    if (url) editor?.chain().focus().setImage({ src: url, alt: f.name }).run();
  }
}

/* ---------------- slash menu ---------------- */

type Cmd = { label: string; hint: string; run: () => void };

const commands = (): Cmd[] => {
  const c = () => editor!.chain().focus();
  return [
    { label: "Heading 2", hint: "Section title", run: () => c().toggleHeading({ level: 2 }).run() },
    { label: "Heading 3", hint: "Sub-section", run: () => c().toggleHeading({ level: 3 }).run() },
    { label: "Bullet list", hint: "Unordered list", run: () => c().toggleBulletList().run() },
    { label: "Numbered list", hint: "Ordered list", run: () => c().toggleOrderedList().run() },
    { label: "Quote", hint: "Blockquote", run: () => c().toggleBlockquote().run() },
    { label: "Code block", hint: "Fenced code", run: () => c().toggleCodeBlock().run() },
    { label: "Divider", hint: "Horizontal rule", run: () => c().setHorizontalRule().run() },
    { label: "Image", hint: "Upload from disk", run: () => pickImage() },
  ];
};

function pickImage() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.multiple = true;
  input.onchange = () => insertImageFiles([...(input.files ?? [])]);
  input.click();
}

let slashIndex = 0;
let slashItems: Cmd[] = [];

function slashState() {
  if (!editor) return null;
  const { $from, empty } = editor.state.selection as any;
  if (!empty || $from.parent.type.name !== "paragraph") return null;
  const text = $from.parent.textContent;
  const m = text.match(/^\/([\w\s-]*)$/);
  return m ? { query: m[1].toLowerCase(), len: text.length } : null;
}

function renderSlash() {
  const menu = $("#slash-menu");
  const s = slashState();
  if (!s) {
    menu.hidden = true;
    return;
  }
  slashItems = commands().filter((c) => c.label.toLowerCase().includes(s.query));
  if (!slashItems.length) {
    menu.hidden = true;
    return;
  }
  slashIndex = Math.min(slashIndex, slashItems.length - 1);
  menu.innerHTML = slashItems
    .map(
      (c, i) =>
        `<button type="button" data-i="${i}" class="slash-item${i === slashIndex ? " is-active" : ""}"><span>${c.label}</span><em>${c.hint}</em></button>`,
    )
    .join("");
  const coords = editor!.view.coordsAtPos(editor!.state.selection.from);
  menu.style.top = `${coords.bottom + 6}px`;
  menu.style.left = `${coords.left}px`;
  menu.hidden = false;
}

function runSlash(i: number) {
  const s = slashState();
  if (!s || !slashItems[i]) return;
  const from = editor!.state.selection.from - s.len;
  editor!.chain().focus().deleteRange({ from, to: editor!.state.selection.from }).run();
  slashItems[i].run();
  $("#slash-menu").hidden = true;
}

/* ---------------- bubble toolbar ---------------- */

function renderBubble() {
  const bar = $("#bubble");
  if (!editor) return;
  const { empty, from, to } = editor.state.selection;
  if (empty || !editor.isFocused) {
    bar.hidden = true;
    return;
  }
  const start = editor.view.coordsAtPos(from);
  const end = editor.view.coordsAtPos(to);
  bar.hidden = false;
  bar.style.top = `${Math.min(start.top, end.top) - bar.offsetHeight - 8}px`;
  bar.style.left = `${(start.left + end.right) / 2 - bar.offsetWidth / 2}px`;
  bar.querySelectorAll<HTMLButtonElement>("[data-mark]").forEach((b) => {
    const name = b.dataset.mark!;
    const active =
      name === "h2"
        ? editor!.isActive("heading", { level: 2 })
        : name === "h3"
          ? editor!.isActive("heading", { level: 3 })
          : editor!.isActive(name);
    b.classList.toggle("is-active", active);
  });
}

function bubbleAction(name: string) {
  const c = editor!.chain().focus();
  switch (name) {
    case "bold": return c.toggleBold().run();
    case "italic": return c.toggleItalic().run();
    case "strike": return c.toggleStrike().run();
    case "code": return c.toggleCode().run();
    case "h2": return c.toggleHeading({ level: 2 }).run();
    case "h3": return c.toggleHeading({ level: 3 }).run();
    case "blockquote": return c.toggleBlockquote().run();
    case "link": {
      const prev = editor!.getAttributes("link").href ?? "";
      const href = window.prompt("Link URL", prev);
      if (href === null) return;
      if (href === "") return c.unsetLink().run();
      return c.setLink({ href }).run();
    }
  }
}

/* ---------------- save ---------------- */

function toast(msg: string, isError = false) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.toggle("is-error", isError);
  el.hidden = false;
  window.setTimeout(() => (el.hidden = true), 3000);
}

function markDirty() {
  if (!state.ready) return;
  state.dirty = true;
  $("#save-state").textContent = "Unsaved";
}

async function save() {
  if (state.saving) return;
  state.saving = true;
  $("#save-state").textContent = "Saving…";
  const body =
    state.mode === "raw"
      ? $<HTMLTextAreaElement>("#raw-editor").value
      : td.turndown(editor!.getHTML());

  const res = await fetch("/api/admin/posts", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      frontmatter: readForm(),
      body,
      ext: state.ext,
      original: state.original,
    }),
  });
  const json = (await res.json()) as any;
  state.saving = false;
  if (!res.ok) {
    $("#save-state").textContent = "Unsaved";
    toast(json.error ?? "save failed", true);
    return;
  }
  state.original = { lang: json.lang, slug: json.slug, ext: json.ext };
  state.dirty = false;
  $("#save-state").textContent = "Saved";
  toast("Saved to disk");
  const url = new URL(location.href);
  url.searchParams.set("lang", json.lang);
  url.searchParams.set("slug", json.slug);
  url.searchParams.delete("new");
  history.replaceState(null, "", url);
  $<HTMLAnchorElement>("#view-link").href = `/${json.lang}/${json.slug}/`;
}

/* ---------------- boot ---------------- */

export async function initEditor() {
  const params = new URLSearchParams(location.search);
  const lang = params.get("lang") ?? "zh-tw";
  const slug = params.get("slug");
  const isNew = !slug;

  let fm: any = {
    title: "",
    slug: "",
    lang,
    excerpt: "",
    feature_image: null,
    featured: false,
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tags: [],
    pair_slug: null,
    pair_lang: null,
  };
  let body = "";

  if (!isNew) {
    const res = await fetch(`/api/admin/posts?lang=${lang}&slug=${slug}`);
    if (!res.ok) {
      toast("post not found", true);
      return;
    }
    const data = (await res.json()) as any;
    fm = data.frontmatter;
    body = data.body;
    state.ext = data.ext;
    state.mode = data.mode;
    state.original = { lang, slug: slug!, ext: data.ext };
  }

  fillForm(fm);
  $<HTMLAnchorElement>("#view-link").href = isNew ? "#" : `/${lang}/${slug}/`;

  if (state.mode === "raw") {
    $("#wysiwyg-wrap").hidden = true;
    $("#raw-wrap").hidden = false;
    $("#mode-badge").textContent = state.ext === "mdx" ? "MDX source" : "Ghost HTML source";
    const ta = $<HTMLTextAreaElement>("#raw-editor");
    ta.value = body;
    ta.addEventListener("input", markDirty);
  } else {
    $("#mode-badge").textContent = "Markdown";
    editor = new Editor({
      element: $("#editor"),
      extensions: [
        StarterKit.configure({
          heading: { levels: [2, 3, 4] },
          link: { openOnClick: false, autolink: true },
        }),
        Image.configure({ inline: false }),
        Placeholder.configure({
          placeholder: "Write here. Type / for blocks, drop an image anywhere.",
        }),
      ],
      content: await marked.parse(body || ""),
      autofocus: isNew ? false : "start",
      editorProps: {
        attributes: { class: "prose prose-lg max-w-none focus:outline-none" },
        handlePaste: (_view, event) => {
          const files = [...(event.clipboardData?.files ?? [])];
          if (!files.length) return false;
          event.preventDefault();
          insertImageFiles(files);
          return true;
        },
        handleDrop: (_view, event) => {
          const files = [...((event as DragEvent).dataTransfer?.files ?? [])];
          if (!files.length) return false;
          event.preventDefault();
          insertImageFiles(files);
          return true;
        },
      },
      onUpdate: () => {
        markDirty();
        renderSlash();
      },
      onSelectionUpdate: () => {
        renderBubble();
        renderSlash();
      },
      onBlur: () => window.setTimeout(() => renderBubble(), 100),
    });

    // slash menu keyboard nav (capture so it beats ProseMirror)
    $("#editor").addEventListener(
      "keydown",
      (e) => {
        const menu = $("#slash-menu");
        if (menu.hidden) return;
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          e.preventDefault();
          slashIndex =
            (slashIndex + (e.key === "ArrowDown" ? 1 : -1) + slashItems.length) % slashItems.length;
          renderSlash();
        } else if (e.key === "Enter" || e.key === "Tab") {
          e.preventDefault();
          runSlash(slashIndex);
        } else if (e.key === "Escape") {
          menu.hidden = true;
        }
      },
      true,
    );

    $("#slash-menu").addEventListener("mousedown", (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>(".slash-item");
      if (!btn) return;
      e.preventDefault();
      runSlash(Number(btn.dataset.i));
    });

    $("#bubble").addEventListener("mousedown", (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>("[data-mark]");
      if (!btn) return;
      e.preventDefault();
      bubbleAction(btn.dataset.mark!);
      renderBubble();
    });
  }

  // form wiring
  document.querySelectorAll("#sidebar input, #sidebar textarea, #sidebar select").forEach((el) => {
    el.addEventListener("input", markDirty);
  });
  const titleInput = $<HTMLInputElement>("#fm-title");
  titleInput.addEventListener("input", () => {
    $("#doc-title").textContent = titleInput.value || "Untitled";
  });
  $("#fm-feature-pick").addEventListener("click", async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const f = input.files?.[0];
      if (!f) return;
      const url = await uploadImage(f);
      if (url) {
        $<HTMLInputElement>("#fm-feature").value = url;
        markDirty();
      }
    };
    input.click();
  });
  $("#sidebar-toggle").addEventListener("click", () => {
    $("#sidebar").classList.toggle("is-open");
  });
  $("#save-btn").addEventListener("click", save);

  const deleteBtn = $<HTMLButtonElement>("#delete-btn");
  deleteBtn.hidden = isNew;
  deleteBtn.addEventListener("click", async () => {
    const o = state.original;
    if (!o || !window.confirm(`Delete ${o.lang}/${o.slug}.${o.ext}? This removes the file.`)) return;
    const res = await fetch(`/api/admin/posts?lang=${o.lang}&slug=${o.slug}&ext=${o.ext}`, {
      method: "DELETE",
    });
    if (!res.ok) return toast("delete failed", true);
    state.dirty = false;
    location.href = "/admin";
  });

  window.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "s") {
      e.preventDefault();
      save();
    }
  });
  window.addEventListener("beforeunload", (e) => {
    if (state.dirty) e.preventDefault();
  });
  // TipTap normalizes the parsed doc (trailing node etc.) right after mount,
  // which fires onUpdate once; ignore edits until that settles.
  window.setTimeout(() => {
    state.ready = true;
    state.dirty = false;
    $("#save-state").textContent = isNew ? "New post" : "Saved";
  }, 0);
  window.addEventListener("scroll", () => renderBubble(), true);
}
