import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Check, Copy, Linkedin, Share2, Twitter } from "lucide-react";
import { previewImagePath } from "../../lib/parsePost";
import type { BlogPost } from "../../types";

interface ShareButtonProps {
  post: BlogPost;
  /** Open the menu above the button (for use near the bottom of the page). */
  openUpward?: boolean;
  label?: string;
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Older browsers / non-secure contexts: fall back to a hidden textarea.
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand("copy");
    textarea.remove();
    return ok;
  }
}

export function ShareButton({ post, openUpward = false, label = "Share" }: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  const url = `${window.location.origin}/blog/${post.slug}`;
  // Same image LinkedIn, X, etc. will show (see previewImagePath).
  const image = previewImagePath(post);
  const canNativeShare = typeof navigator !== "undefined" && "share" in navigator;

  useEffect(() => {
    if (!open) return;
    copyRef.current?.focus();

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    if (await copyText(url)) setCopied(true);
  };

  const handleNativeShare = async () => {
    try {
      await navigator.share({ title: post.title, text: post.description, url });
      setOpen(false);
    } catch {
      // The user closed the share sheet; nothing to do.
    }
  };

  const shareText = encodeURIComponent(post.title);
  const shareUrl = encodeURIComponent(url);
  const socialLinks = [
    {
      name: "X",
      icon: Twitter,
      href: `https://x.com/intent/post?text=${shareText}&url=${shareUrl}`,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    },
  ];

  const itemClass =
    "flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500";

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={menuId}
        className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-700 px-4 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-brand-400 hover:text-brand-600 dark:hover:border-brand-500 dark:hover:text-brand-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      >
        <Share2 className="h-4 w-4" />
        {label}
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            id={menuId}
            role="dialog"
            aria-label="Share this post"
            initial={{ opacity: 0, y: openUpward ? 8 : -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: openUpward ? 8 : -8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className={`absolute right-0 z-40 w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-surface-dark p-4 shadow-2xl ${
              openUpward ? "bottom-full mb-2 origin-bottom-right" : "top-full mt-2 origin-top-right"
            }`}
          >
            {/* Preview: roughly what LinkedIn, X, Slack, etc. show for this link */}
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Link preview
            </p>
            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
              {imageFailed ? (
                <div className="flex aspect-[1200/630] items-center bg-gradient-to-br from-brand-500/20 to-purple-600/20 p-4">
                  <span className="line-clamp-3 text-lg font-bold text-gray-900 dark:text-white">
                    {post.title}
                  </span>
                </div>
              ) : (
                <img
                  src={image}
                  alt=""
                  width={1200}
                  height={630}
                  onError={() => setImageFailed(true)}
                  className="aspect-[1200/630] w-full object-cover bg-gray-100 dark:bg-gray-800"
                />
              )}
              <div className="bg-gray-50 dark:bg-gray-900/60 px-3 py-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">{window.location.host}</p>
                <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                  {post.title}
                </p>
                <p className="line-clamp-2 text-xs text-gray-600 dark:text-gray-400">
                  {post.description}
                </p>
              </div>
            </div>

            {/* Copy link */}
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/60 p-1 pl-3">
              <span className="flex-1 truncate text-sm text-gray-600 dark:text-gray-300" title={url}>
                {url.replace(/^https?:\/\//, "")}
              </span>
              <button
                ref={copyRef}
                type="button"
                onClick={handleCopy}
                className={`${itemClass} shrink-0 ${
                  copied
                    ? "bg-green-500 text-white"
                    : "bg-brand-500 text-white hover:bg-brand-600"
                }`}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied!" : "Copy link"}
              </button>
            </div>
            {/* Announce the copy for screen readers */}
            <span className="sr-only" aria-live="polite">
              {copied ? "Link copied to clipboard" : ""}
            </span>

            <div className={`mt-2 grid gap-2 ${canNativeShare ? "grid-cols-3" : "grid-cols-2"}`}>
              {socialLinks.map(({ name, icon: Icon, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${itemClass} bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700`}
                >
                  <Icon className="h-4 w-4" />
                  {name}
                </a>
              ))}
              {canNativeShare && (
                <button
                  type="button"
                  onClick={handleNativeShare}
                  className={`${itemClass} bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700`}
                >
                  <Share2 className="h-4 w-4" />
                  More
                </button>
              )}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
