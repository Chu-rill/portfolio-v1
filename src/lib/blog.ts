import type { BlogPost } from "../types";

// Every .md file in src/content/blog becomes a post. The filename is the slug.
const files = import.meta.glob("../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const WORDS_PER_MINUTE = 200;

// Minimal frontmatter parser: supports `key: value` and `key: [a, b, c]`.
function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {} as Record<string, string | string[]>, content: raw };

  const data: Record<string, string | string[]> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();

    if (value.startsWith("[") && value.endsWith("]")) {
      data[key] = value
        .slice(1, -1)
        .split(",")
        .map((v) => v.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else {
      value = value.replace(/^["']|["']$/g, "");
      data[key] = value;
    }
  }
  return { data, content: match[2] };
}

function toPost(path: string, raw: string): BlogPost {
  const slug = path.split("/").pop()!.replace(/\.md$/, "");
  const { data, content } = parseFrontmatter(raw);
  const words = content.trim().split(/\s+/).length;

  return {
    slug,
    title: (data.title as string) ?? slug,
    description: (data.description as string) ?? "",
    date: (data.date as string) ?? "",
    tags: (data.tags as string[]) ?? [],
    cover: data.cover as string | undefined,
    draft: data.draft === "true",
    readingTime: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
    content,
  };
}

const allPosts: BlogPost[] = Object.entries(files)
  .map(([path, raw]) => toPost(path, raw))
  // Drafts show up in `npm run dev` but never in production builds.
  .filter((post) => import.meta.env.DEV || !post.draft)
  .sort((a, b) => b.date.localeCompare(a.date));

export function getAllPosts(): BlogPost[] {
  return allPosts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find((post) => post.slug === slug);
}

export function getAllTags(): string[] {
  return [...new Set(allPosts.flatMap((post) => post.tags))].sort();
}

export function formatPostDate(date: string): string {
  if (!date) return "";
  // Parse as a local date so "2026-01-05" doesn't shift a day in western timezones.
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
