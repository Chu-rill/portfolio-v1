import { lazy, Suspense } from "react";
import { useTheme } from "../../theme/themeContext";

// WebGL particle field: loaded after the page content so it never delays first paint.
const Antigravity = lazy(() => import("./Antigravity/Antigravity"));

// Matches the blue → purple of the name gradient (brand-500 → purple-600).
const PARTICLE_COLORS = ["#60A5FA", "#818CF8", "#A855F7"];

/**
 * Full-viewport particle background, fixed behind the page content.
 * It tracks the cursor through window listeners, so it can sit under everything
 * with pointer-events disabled and never block clicks or text selection.
 */
export function ParticleBackground() {
  const { theme } = useTheme();
  const isSmallScreen = window.matchMedia("(max-width: 767px)").matches;
  // On touch screens every scroll swipe is a pointer press, which would trigger
  // the click burst constantly. Let the ring drift on its own there instead.
  const isTouch = window.matchMedia("(pointer: coarse)").matches;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Suspense fallback={null}>
        <Antigravity
          colors={PARTICLE_COLORS}
          count={isSmallScreen ? 600 : 1200}
          magnetRadius={isSmallScreen ? 7 : 9}
          ringRadius={isSmallScreen ? 5 : 7}
          particleSize={0.9}
          ambient={0.18}
          interactive={!isTouch}
          clickBurst={!isTouch}
          lightMode={theme === "light"}
          // Softer than in the hero alone, so body text stays easy to read.
          opacity={theme === "light" ? 0.55 : 0.7}
        />
      </Suspense>
    </div>
  );
}
