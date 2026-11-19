---
title: Supabase for Image Storage
description: Why i Ditched Local File Systems.
date: 2025-08-19
tags: [supabase, storage bucket]
cover: /images/storage.webp
draft: false
---

When i first started coding backend applications i used to store images and files on the local file system. It works fine until you need to scale horizontally I then change my approach and started using Supabase storage buckets to handle my file uploads.

Some of the original problems where:

- Docker containers were ephemeral "files disappear when containers restart"
- Multiple server instances can't share local directories.
- No CDN caching, so images hit my backend server every time.

The Supabase Solution

- Multer handles file upload (MIME validation, size limit)
- Validated files are uploaded to Supabase Storage buckets
- I get back a public or signed URL, which I store in the database.
- Supabase provides a built-in CDN with global caching

Implementation

- Multer validates file type + size.
- Server uploads validated files to Supabase storage bucket.
- Generate signed URL (or public for avatars).
- Store URL in the database.
- The frontend fetches and displays the image via the stored URL.

Some Tradeoffs include

- Added dependency on Supabase
- Storage costs scale with usage

With this changes to my coding flow i went from managing limited disk space to just handling URLs, deployment and scaling became easier.
Sometimes the best architecture decision is using fewer moving parts.
