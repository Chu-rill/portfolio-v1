import type { BlogPost } from "../types";
import { parsePost } from "./parsePost";

// Every .md file in src/content/blog becomes a post. The filename is the slug.
const files = import.meta.glob("../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const allPosts: BlogPost[] = Object.entries(files)
  .map(([path, raw]) => parsePost(path.split("/").pop()!.replace(/\.md$/, ""), raw))
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
