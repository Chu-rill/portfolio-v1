import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { m } from "framer-motion";
import { Navbar } from "../components/nav/Navbar";
import { Footer } from "../components/footer/Footer";
import { Container } from "../components/common/Container";
import { SectionHeader } from "../components/common/SectionHeader";
import { ScrollToTop } from "../components/common/ScrollToTop";
import { BlogCard } from "../components/blog/BlogCard";
import { getAllPosts, getAllTags } from "../lib/blog";
import profileData from "../data/profile.json";
import type { Profile } from "../types";

const profile = profileData as Profile;

const stagger = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

export function BlogIndex() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTag = searchParams.get("tag");

  const posts = getAllPosts();
  const tags = getAllTags();
  const visiblePosts = activeTag
    ? posts.filter((post) => post.tags.includes(activeTag))
    : posts;

  const selectTag = (tag: string | null) => {
    setSearchParams(tag ? { tag } : {});
  };

  const tagClass = (active: boolean) =>
    `px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
      active
        ? "bg-brand-500 text-white"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
    }`;

  return (
    <>
      <Helmet>
        <title>Blog - {profile.name.trim()}</title>
        <meta
          name="description"
          content={`Articles and notes by ${profile.name.trim()}, ${profile.role}.`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Blog - ${profile.name.trim()}`} />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-white dark:bg-background-dark">
        <Navbar />

        <main className="flex-1 pt-28 pb-24">
          <Container size="lg">
            <SectionHeader
              title="Blog"
              subtitle="Notes on what I'm building, learning, and breaking."
              center
            />

            {tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-12">
                <button onClick={() => selectTag(null)} className={tagClass(!activeTag)}>
                  All
                </button>
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => selectTag(tag)}
                    className={tagClass(activeTag === tag)}
                    aria-pressed={activeTag === tag}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}

            {visiblePosts.length > 0 ? (
              <m.div
                key={activeTag ?? "all"}
                initial="initial"
                animate="animate"
                variants={stagger}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {visiblePosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </m.div>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 py-16">
                {activeTag
                  ? `No posts tagged "${activeTag}" yet.`
                  : "No posts yet — check back soon."}
              </p>
            )}
          </Container>
        </main>

        <Footer profile={profile} />
        <ScrollToTop />
      </div>
    </>
  );
}
