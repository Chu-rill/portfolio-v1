import { Link } from "react-router-dom";
import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import { BlogCard } from "./BlogCard";
import type { BlogPost } from "../../types";

const stagger = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

interface BlogPreviewProps {
  posts: BlogPost[];
}

// Latest posts on the home page. Renders nothing until there's a published post.
export function BlogPreview({ posts }: BlogPreviewProps) {
  if (posts.length === 0) return null;

  return (
    <section id="blog" className="py-12 md:py-24 bg-white dark:bg-background-dark">
      <Container>
        <m.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
        >
          <SectionHeader
            title="Latest Writing"
            subtitle="Notes on what I'm building, learning, and breaking."
            center
          />

          <m.div
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </m.div>

          <div className="text-center mt-12">
            <Link to="/blog" className="btn-secondary inline-flex items-center group">
              View all posts
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </m.div>
      </Container>
    </section>
  );
}
