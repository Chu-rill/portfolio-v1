import { motion } from "framer-motion";
import {
  ArrowDown,
  Download,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
} from "lucide-react";
import { Container } from "../common/Container";
import type { Profile } from "../../types";

interface HeroProps {
  profile: Profile;
}

export function Hero({ profile }: HeroProps) {
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
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-80 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute -bottom-40 -left-80 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <Container className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Greeting */}
          <motion.p
            className="text-brand-500 dark:text-brand-400 font-medium text-lg mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Hello, I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {profile.name}
          </motion.h1>

          {/* Role */}
          <motion.h2
            className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-600 dark:text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {profile.role}
          </motion.h2>

          {/* Tagline */}
          <motion.p
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {profile.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
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
          </motion.div>

          {/* Social Links */}
          <motion.div
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
          </motion.div>

          {/* Scroll indicator */}
          <motion.button
            onClick={() => scrollToSection("about")}
            className="text-gray-400 dark:text-gray-500 hover:text-brand-500 dark:hover:text-brand-400 transition-colors animate-bounce"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            aria-label="Scroll to about section"
          >
            <ArrowDown className="h-6 w-6 mx-auto" />
          </motion.button>
        </motion.div>
      </Container>
    </section>
  );
}
