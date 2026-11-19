---
title: Hello, World — Starting This Blog
description: A starter post showing everything the blog supports. Replace or delete me.
date: 2026-11-19
tags: [meta, writing]
draft: true
---

This is a **starter post**. It's marked `draft: true`, so you'll see it with `npm run dev` but it won't appear on the live site. Flip it to `false` (or delete the line) to publish.

## Writing a new post

Create a file in `src/content/blog/`. The filename becomes the URL, so `my-first-post.md` lives at `/blog/my-first-post`.

Frontmatter fields:

| Field         | Required | Notes                                   |
| ------------- | -------- | --------------------------------------- |
| `title`       | yes      | Shown on the card and the page          |
| `description` | yes      | Card summary + SEO description          |
| `date`        | yes      | `YYYY-MM-DD`, used for sorting          |
| `tags`        | no       | `[react, typescript]`                   |
| `cover`       | no       | Path in `public/`, e.g. `/images/x.png` |
| `draft`       | no       | `true` hides it in production           |

## Code blocks are highlighted

```ts
export function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

## Everything else in GitHub-flavored Markdown works

- [x] Task lists
- [ ] ~~Strikethrough~~
- Links like [my GitHub](https://github.com/Chu-rill)

> Blockquotes look like this.
