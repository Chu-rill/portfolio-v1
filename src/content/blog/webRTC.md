---
title: How I’ve Been Exploring TURN & STUN Servers in WebRTC
description: Learning how the internet works through WebRTC.
date: 2025-09-30
tags: [WebRTC, TURN, STUN, Networking, RealTimeApps]
cover: /images/stun.jpeg
draft: false
---

Lately, I’ve been diving deep into WebRTC trying to really understand what makes real-time communication possible behind the scenes.

If you’ve ever built something like a chat app, live video call, or screen-sharing tool, you’ve probably run into the terms TURN and STUN. I used to gloss over them, but once I started implementing WebRTC, I realized how important they actually are.

Here’s what I’ve learned so far

STUN (Session Traversal Utilities for NAT)
Think of STUN as the “introduction maker.” It helps each peer discover its public IP and port of the client, even when sitting behind a NAT. Once both peers know how to reach each other, they can try to form a direct peer-to-peer connection basically saying, “hey, here’s how to find me.” Google offers a free public STUN server.

On the other hand we have TURN (Traversal Using Relays around NAT)
But sometimes, that direct connection fails usually because of strict firewalls. That’s where TURN server steps in. It relays media traffic through a third-party server, acting as a reliable middleman to keep the connection alive.
examples of TURN servers include:CoTurn,Meterd.ca's Open Relay. Cloudflare also provides TURN server functionality as part of it's services
In short:

STUN tries to make the direct path work.

TURN ensures there’s still a path when STUN fails.

It’s one of those behind-the-scenes components that makes the internet feel a little more magical.

If you’ve ever deployed or configured TURN/STUN servers, I’d love to hear what setup worked best for you — always open to learning from others building in this space!
