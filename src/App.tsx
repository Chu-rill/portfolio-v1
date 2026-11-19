import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./theme/ThemeProvider";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Analytics } from "@vercel/analytics/react";

// Blog pages pull in the markdown renderer, so keep them out of the home bundle.
const BlogIndex = lazy(() =>
  import("./pages/BlogIndex").then((m) => ({ default: m.BlogIndex })),
);
const BlogPost = lazy(() =>
  import("./pages/BlogPost").then((m) => ({ default: m.BlogPost })),
);

function App() {
  return (
    <HelmetProvider>
      {/* `m` components + domAnimation ship a fraction of Framer Motion's full bundle.
          `strict` throws if a full `motion` component sneaks back in. */}
      <LazyMotion features={domAnimation} strict>
        {/* Honour the OS "reduce motion" setting for JS-driven animations too. */}
        <MotionConfig reducedMotion="user">
          <ThemeProvider>
            <Router>
              <Suspense
                fallback={
                  <div className="min-h-screen bg-white dark:bg-background-dark" />
                }
              >
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/blog" element={<BlogIndex />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </Router>
          </ThemeProvider>
        </MotionConfig>
      </LazyMotion>
      <Analytics />
    </HelmetProvider>
  );
}

export default App;
