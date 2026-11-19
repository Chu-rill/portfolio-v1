import { lazy, Suspense } from "react";
import { m } from "framer-motion";
import {
  ArrowDown,
  Download,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Twitter,
} from "lucide-react";
import { Container } from "../common/Container";
import { useTheme } from "../../theme/themeContext";
import type { Profile } from "../../types";

// WebGL particle field: loaded after the hero text so it never delays first paint.
const Antigravity = lazy(() => import("../common/Antigravity/Antigravity"));

// Matches the blue → purple of the name gradient (brand-500 → purple-600).
const PARTICLE_COLORS = ["#60A5FA", "#818CF8", "#A855F7"];

interface HeroProps {
  profile: Profile;
}

export function Hero({ profile }: HeroProps) {
  const { theme } = useTheme();
  // Fewer particles on phones: less GPU work and a less crowded small screen.
  const isSmallScreen =
    typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const top =
        element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const socialLinks = [
    {
      name: "GitHub",
      url: profile.socials.github,
      icon: Github,
      color: "hover:text-gray-900 dark:hover:text-white",
    },
    {
      name: "LinkedIn",
      url: profile.socials.linkedin,
      icon: Linkedin,
      color: "hover:text-blue-600",
    },
    {
      name: "X",
      url: profile.socials.x,
      icon: Twitter,
      color: "hover:text-blue-400",
    },
    {
      name: "Email",
      url: `mailto:${profile.email}`,
      icon: Mail,
      color: "hover:text-red-500",
    },
  ].filter((link) => link.url);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-white dark:bg-background-dark relative overflow-hidden"
    >
      {/* Interactive particle background. It tracks the cursor via window
          listeners, so it can sit under the content without blocking clicks. */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <Suspense fallback={null}>
          <Antigravity
            colors={PARTICLE_COLORS}
            count={isSmallScreen ? 600 : 1200}
            magnetRadius={isSmallScreen ? 7 : 9}
            ringRadius={isSmallScreen ? 5 : 7}
            particleSize={0.9}
            ambient={0.2}
            lightMode={theme === "light"}
            opacity={theme === "light" ? 0.7 : 0.85}
          />
        </Suspense>
      </div>

      <Container className="relative z-10 text-center">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Greeting */}
          <m.p
            className="text-brand-500 dark:text-brand-400 font-medium text-lg mb-4 mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Hi, I'm
          </m.p>

          {/* Name */}
          <m.h1
            className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="text-gradient">{profile.name}</span>
          </m.h1>

          {/* Role */}
          <m.h2
            className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-600 dark:text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {profile.role}
          </m.h2>

          {/* Tagline */}
          <m.p
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {profile.tagline}
          </m.p>

          {/* CTA Buttons */}
          <m.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <button
              onClick={() => scrollToSection("projects")}
              className="btn-primary group inline-flex items-center"
            >
              View Projects
              <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className="btn-secondary inline-flex items-center"
            >
              Get In Touch
              <Mail className="ml-2 h-4 w-4" />
            </button>

            {profile.resume && (
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center"
              >
                Download CV
                <Download className="ml-2 h-4 w-4" />
              </a>
            )}
          </m.div>

          {/* Social Links */}
          <m.div
            className="flex items-center justify-center space-x-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target={social.name !== "Email" ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className={`text-gray-500 dark:text-gray-400 ${social.color} transition-colors duration-200 transform hover:scale-110`}
                aria-label={social.name}
              >
                <social.icon className="h-6 w-6" />
              </a>
            ))}
          </m.div>

          {/* Scroll indicator */}
          <m.button
            onClick={() => scrollToSection("about")}
            className="text-gray-400 dark:text-gray-500 hover:text-brand-500 dark:hover:text-brand-400 transition-colors animate-bounce"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            aria-label="Scroll to about section"
          >
            <ArrowDown className="h-6 w-6 mx-auto" />
          </m.button>
        </m.div>
      </Container>
    </section>
  );
}
