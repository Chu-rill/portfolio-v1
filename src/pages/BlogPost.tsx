import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { m } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import { Navbar } from "../components/nav/Navbar";
import { Footer } from "../components/footer/Footer";
import { Container } from "../components/common/Container";
import { ScrollToTop } from "../components/common/ScrollToTop";
import { CodeBlock } from "../components/blog/CodeBlock";
import { ShareButton } from "../components/blog/ShareButton";
import { formatPostDate, getAllPosts, getPostBySlug } from "../lib/blog";
import { NotFound } from "./NotFound";
import profileData from "../data/profile.json";
import type { Profile } from "../types";

const profile = profileData as Profile;

export function BlogPost() {
  const { slug = "" } = useParams();
  const post = getPostBySlug(slug);

  // Client-side navigation keeps the old scroll position; start each post at the top.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) return <NotFound />;

  // Posts are sorted newest first.
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === post.slug);
  const newer = posts[index - 1];
  const older = posts[index + 1];

  const author = profile.name.trim();
  const url = `${window.location.origin}/blog/${post.slug}`;
  const image = new URL(
    post.cover ?? `/og/${post.slug}.png`,
    window.location.origin,
  ).href;

  return (
    <>
      <Helmet>
        <title>
          {post.title} - {author}
        </title>
        <meta name="description" content={post.description} />
        <meta name="author" content={author} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <link rel="canonical" href={url} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={image} />
        <meta name="twitter:image" content={image} />
        <meta property="article:published_time" content={post.date} />
        {post.tags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            author: { "@type": "Person", name: author },
            keywords: post.tags.join(", "),
          })}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-white dark:bg-background-dark">
        <Navbar />

        <main className="flex-1 pt-28 pb-24">
          <Container size="sm">
            <Link
              to="/blog"
              className="inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors mb-8 group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              All posts
            </Link>

            <m.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <header className="mb-10">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={post.date}>
                        {formatPostDate(post.date)}
                      </time>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      {post.readingTime} min read
                    </span>
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        to={`/blog?tag=${encodeURIComponent(tag)}`}
                        className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-brand-500 hover:text-white transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                  <ShareButton post={post} />
                </div>
                {post.cover && (
                  <img
                    src={post.cover}
                    alt=""
                    className="mt-8 w-full rounded-2xl border border-gray-200 dark:border-gray-800"
                  />
                )}
              </header>

              <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-a:text-brand-600 dark:prose-a:text-brand-400 prose-code:before:content-none prose-code:after:content-none prose-pre:p-0 prose-pre:bg-transparent prose-img:rounded-xl">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    // External links open in a new tab; internal ones stay in the SPA.
                    a: ({ href = "", children, ...props }) =>
                      href.startsWith("/") ? (
                        <Link to={href}>{children}</Link>
                      ) : (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          {...props}
                        >
                          {children}
                        </a>
                      ),
                    pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>

              <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-surface-dark px-6 py-5">
                <p className="font-semibold text-gray-900 dark:text-white">
                  Enjoyed this post? Pass it on.
                </p>
                <ShareButton post={post} openUpward label="Share this post" />
              </div>
            </m.article>

            {(newer || older) && (
              <nav
                aria-label="More posts"
                className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 grid sm:grid-cols-2 gap-4"
              >
                {older ? (
                  <Link
                    to={`/blog/${older.slug}`}
                    className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-brand-400 dark:hover:border-brand-500 transition-colors"
                  >
                    <span className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-1">
                      <ArrowLeft className="mr-1 h-3 w-3" /> Older
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {older.title}
                    </span>
                  </Link>
                ) : (
                  <span />
                )}
                {newer && (
                  <Link
                    to={`/blog/${newer.slug}`}
                    className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-brand-400 dark:hover:border-brand-500 transition-colors sm:text-right"
                  >
                    <span className="flex items-center sm:justify-end text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Newer <ArrowRight className="ml-1 h-3 w-3" />
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {newer.title}
                    </span>
                  </Link>
                )}
              </nav>
            )}
          </Container>
        </main>

        <Footer profile={profile} />
        <ScrollToTop />
      </div>
    </>
  );
}
