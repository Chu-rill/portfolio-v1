import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { formatPostDate } from "../../lib/blog";
import type { BlogPost } from "../../types";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <motion.article
      variants={fadeInUp}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col h-full overflow-hidden rounded-2xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 hover:border-brand-400 dark:hover:border-brand-500 hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-500"
    >
      {post.cover && (
        <div className="h-44 overflow-hidden">
          <img
            src={post.cover}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {post.readingTime} min read
          </span>
          {post.draft && (
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 font-semibold">
              Draft
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
          {/* Stretched link: the whole card is clickable */}
          <Link
            to={`/blog/${post.slug}`}
            className="after:absolute after:inset-0 focus:outline-none focus-visible:after:ring-2 focus-visible:after:ring-brand-500 focus-visible:after:rounded-2xl"
          >
            {post.title}
          </Link>
        </h3>

        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
          {post.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <ArrowRight className="h-4 w-4 shrink-0 text-brand-500 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.article>
  );
}
