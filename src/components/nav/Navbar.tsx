import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "../common/Container";
import { ThemeToggle } from "./ThemeToggle";

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Update active section based on scroll position
      const sections = navLinks.map((link) => link.href.substring(1));
      sections.unshift("hero"); // Add hero section

      for (const section of sections) {
        const element =
          section === "hero"
            ? document.getElementById("hero") || document.body
            : document.getElementById(section);

        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // Account for fixed navbar
      const top =
        element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`
      fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${isScrolled ? "glass-nav shadow-lg" : "bg-transparent"}
    `}
    >
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-xl font-bold text-gray-900 dark:text-white hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
            >
              CD Churchill Daniel
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`
                  text-sm font-medium transition-colors duration-200 cursor-pointer
                  ${
                    activeSection === link.href.substring(1)
                      ? "text-brand-500 dark:text-brand-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-brand-500 dark:hover:text-brand-400"
                  }
                `}
              >
                {link.name}
              </button>
            ))}
            {/* <ThemeToggle /> */}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 py-4 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md rounded-lg border border-gray-200/20 dark:border-gray-800/20">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`
                  block w-full text-left px-4 py-2 text-base font-medium transition-colors
                  ${
                    activeSection === link.href.substring(1)
                      ? "text-brand-500 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20"
                      : "text-gray-700 dark:text-gray-300 hover:text-brand-500 dark:hover:text-brand-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  }
                `}
              >
                {link.name}
              </button>
            ))}
          </div>
        )}
      </Container>
    </nav>
  );
}
