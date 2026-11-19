/**
 * Link previews for blog posts.
 *
 * Link-preview crawlers (LinkedIn, X, Slack, WhatsApp, iMessage...) don't run
 * JavaScript, so they only ever see the plain index.html. After the build this
 * plugin writes a copy of index.html for every post at dist/blog/<slug>/index.html
 * with that post's title, description and Open Graph tags, plus a generated
 * 1200x630 preview image at dist/og/<slug>.png (unless the post sets `cover`).
 *
 * Vercel serves those files before the SPA rewrite, so crawlers get the right
 * preview and visitors still get the normal app.
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { parsePost, previewImagePath } from "../src/lib/parsePost";
import type { BlogPost, Profile } from "../src/types";

const require = createRequire(import.meta.url);
const root = fileURLToPath(new URL("..", import.meta.url));
const postsDir = path.join(root, "src/content/blog");

function loadProfile(): Profile {
  return JSON.parse(fs.readFileSync(path.join(root, "src/data/profile.json"), "utf8"));
}

function loadPosts(includeDrafts: boolean): BlogPost[] {
  return fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) =>
      parsePost(file.replace(/\.md$/, ""), fs.readFileSync(path.join(postsDir, file), "utf8")),
    )
    .filter((post) => includeDrafts || !post.draft);
}

// Absolute site URL; preview tags must use absolute links. On Vercel this comes
// from the project's production domain automatically. Elsewhere, set SITE_URL.
function siteUrl(): string {
  const url =
    process.env.SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL &&
      `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
    "";
  return url.replace(/\/$/, "");
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// ---------------------------------------------------------------------------
// Preview image
// ---------------------------------------------------------------------------

type Node = { type: string; props: Record<string, unknown> };
const h = (style: Record<string, unknown>, ...children: (Node | string)[]): Node => ({
  type: "div",
  props: { style: { display: "flex", ...style }, children },
});

let fonts: { name: string; data: Buffer; weight: 400 | 700 | 800; style: "normal" }[] | null =
  null;
function loadFonts() {
  fonts ??= ([400, 700, 800] as const).map((weight) => ({
    name: "Inter",
    weight,
    style: "normal" as const,
    data: fs.readFileSync(
      require.resolve(`@fontsource/inter/files/inter-latin-${weight}-normal.woff`),
    ),
  }));
  return fonts;
}

interface Card {
  eyebrow: string;
  title: string;
  description: string;
  meta: string[];
  author: string;
}

export async function renderPreviewImage(card: Card): Promise<Buffer> {
  // Satori adds padding on top of width/height, so the content is inset with
  // absolute positioning instead of padding on the full-size root.
  const content = h(
    {
      position: "absolute",
      top: 72,
      right: 80,
      bottom: 72,
      left: 80,
      flexDirection: "column",
      justifyContent: "space-between",
    },
    h(
      { alignItems: "center", gap: 20, fontSize: 28, color: "#9ca3af" },
      h(
        {
          width: 56,
          height: 56,
          borderRadius: 14,
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 800,
          fontSize: 24,
          color: "#ffffff",
          backgroundImage: "linear-gradient(135deg, #60a5fa, #9333ea)",
        },
        "CD",
      ),
      card.eyebrow,
    ),
    h(
      { flexDirection: "column", gap: 24 },
      h(
        {
          fontSize: card.title.length > 60 ? 56 : 68,
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: -1.5,
          display: "block",
          lineClamp: 3,
        },
        card.title,
      ),
      card.description
        ? h(
            { fontSize: 30, color: "#9ca3af", lineHeight: 1.4, display: "block", lineClamp: 2 },
            card.description,
          )
        : "",
    ),
    h(
      { alignItems: "center", justifyContent: "space-between", fontSize: 26 },
      h({ fontWeight: 700 }, card.author),
      h(
        { gap: 12, color: "#d1d5db" },
        ...card.meta.map((item) =>
          h(
            {
              padding: "8px 20px",
              borderRadius: 999,
              backgroundColor: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
            },
            item,
          ),
        ),
      ),
    ),
  );

  const tree = h(
    {
      width: 1200,
      height: 630,
      position: "relative",
      fontFamily: "Inter",
      color: "#f9fafb",
      backgroundColor: "#0b0f14",
      backgroundImage:
        "radial-gradient(circle at 85% 10%, rgba(96,165,250,0.28), transparent 45%), radial-gradient(circle at 10% 95%, rgba(168,85,247,0.25), transparent 45%)",
    },
    content,
  );

  const svg = await satori(tree as unknown as Parameters<typeof satori>[0], {
    width: 1200,
    height: 630,
    fonts: loadFonts(),
  });
  return new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
}

function postCard(post: BlogPost, profile: Profile): Card {
  const author = profile.name.trim();
  return {
    eyebrow: `${author.split(" ")[0]}'s Blog`,
    title: post.title,
    description: post.description,
    meta: [`${post.readingTime} min read`, ...post.tags.slice(0, 2)],
    author,
  };
}

function blogCard(profile: Profile): Card {
  const author = profile.name.trim();
  return {
    eyebrow: `${author.split(" ")[0]}'s Blog`,
    title: "Notes on what I'm building, learning, and breaking.",
    description: profile.role,
    meta: [],
    author,
  };
}

// ---------------------------------------------------------------------------
// HTML
// ---------------------------------------------------------------------------

interface PageMeta {
  title: string;
  description: string;
  url: string;
  image: string;
  type: "article" | "website";
  publishedTime?: string;
  tags?: string[];
}

// data-rh marks the tags as Helmet-managed, so the app replaces them on load
// instead of duplicating them.
function withMeta(template: string, page: PageMeta, profile: Profile): string {
  const tag = (attr: "name" | "property", key: string, content: string) =>
    `    <meta ${attr}="${key}" content="${escapeHtml(content)}" data-rh="true" />`;

  const tags = [
    `    <link rel="canonical" href="${escapeHtml(page.url)}" data-rh="true" />`,
    tag("property", "og:type", page.type),
    tag("property", "og:site_name", profile.name.trim()),
    tag("property", "og:title", page.title),
    tag("property", "og:description", page.description),
    tag("property", "og:url", page.url),
    tag("property", "og:image", page.image),
    tag("property", "og:image:width", "1200"),
    tag("property", "og:image:height", "630"),
    tag("property", "og:image:alt", page.title),
    tag("name", "twitter:card", "summary_large_image"),
    tag("name", "twitter:title", page.title),
    tag("name", "twitter:description", page.description),
    tag("name", "twitter:image", page.image),
    tag("name", "author", profile.name.trim()),
    ...(page.publishedTime
      ? [tag("property", "article:published_time", page.publishedTime)]
      : []),
    ...(page.tags ?? []).map((t) => tag("property", "article:tag", t)),
  ].join("\n");

  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(page.title)} - ${escapeHtml(profile.name.trim())}</title>`)
    .replace(
      /<meta\s+name="description"[\s\S]*?\/>/,
      `<meta name="description" content="${escapeHtml(page.description)}" data-rh="true" />`,
    )
    .replace("</head>", `${tags}\n  </head>`);
}

// ---------------------------------------------------------------------------
// Plugin
// ---------------------------------------------------------------------------

export function blogPreviews(): Plugin {
  let outDir = "dist";

  return {
    name: "blog-previews",

    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },

    // In `npm run dev`, render /og/<slug>.png on request (drafts included) so the
    // share menu shows the real preview image while you write.
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const match = req.url?.match(/^\/og\/([\w-]+)\.png$/);
        if (!match) return next();
        try {
          const profile = loadProfile();
          const post = loadPosts(true).find((p) => p.slug === match[1]);
          const card = match[1] === "blog" ? blogCard(profile) : post && postCard(post, profile);
          if (!card) return next();
          res.setHeader("Content-Type", "image/png");
          res.end(await renderPreviewImage(card));
        } catch (error) {
          next(error);
        }
      });
    },

    async closeBundle() {
      const indexPath = path.join(outDir, "index.html");
      if (!fs.existsSync(indexPath)) return; // not a client build

      const site = siteUrl();
      if (!site) {
        this.warn(
          "SITE_URL is not set, so blog link previews will use relative URLs that " +
            "LinkedIn, X and others ignore. Set SITE_URL (e.g. https://example.com) " +
            "when building outside Vercel.",
        );
      }

      const template = fs.readFileSync(indexPath, "utf8");
      const profile = loadProfile();
      const posts = loadPosts(false);
      fs.mkdirSync(path.join(outDir, "og"), { recursive: true });

      const write = (file: string, html: string) => {
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, html);
      };

      for (const post of posts) {
        let image = previewImagePath(post);
        if (image.startsWith("/og/")) {
          fs.writeFileSync(
            path.join(outDir, "og", `${post.slug}.png`),
            await renderPreviewImage(postCard(post, profile)),
          );
        }
        if (image.startsWith("/")) image = site + image;

        write(
          path.join(outDir, "blog", post.slug, "index.html"),
          withMeta(
            template,
            {
              title: post.title,
              description: post.description,
              url: `${site}/blog/${post.slug}`,
              image,
              type: "article",
              publishedTime: post.date,
              tags: post.tags,
            },
            profile,
          ),
        );
      }

      // The /blog listing gets its own preview too.
      fs.writeFileSync(path.join(outDir, "og", "blog.png"), await renderPreviewImage(blogCard(profile)));
      write(
        path.join(outDir, "blog", "index.html"),
        withMeta(
          template,
          {
            title: "Blog",
            description: `Articles and notes by ${profile.name.trim()}, ${profile.role}.`,
            url: `${site}/blog`,
            image: `${site}/og/blog.png`,
            type: "website",
          },
          profile,
        ),
      );

      this.info?.(`blog-previews: wrote link previews for ${posts.length} post(s)`);
    },
  };
}
