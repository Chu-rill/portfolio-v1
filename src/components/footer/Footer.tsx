import { useLocation, useNavigate } from "react-router-dom";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Container } from "../common/Container";
import { scrollToId } from "../../lib/scroll";
import type { Profile } from "../../types";

interface FooterProps {
  profile: Profile;
}

export function Footer({ profile }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { name: "GitHub", url: profile.socials.github, icon: Github },
    { name: "LinkedIn", url: profile.socials.linkedin, icon: Linkedin },
    { name: "X", url: profile.socials.x, icon: Twitter },
    { name: "Email", url: `mailto:${profile.email}`, icon: Mail },
  ].filter((link) => link.url);

  const scrollToSection = (href: string) => {
    if (href.startsWith("/")) navigate(href);
    else if (isHome) scrollToId(href.substring(1));
    else navigate(`/${href}`);
  };

  const scrollToTop = () => {
    if (isHome) window.scrollTo({ top: 0, behavior: "smooth" });
    else navigate("/");
  };

  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <Container>
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand & Description */}
            <div className="md:col-span-2">
              <button
                onClick={scrollToTop}
                className="text-2xl font-bold mb-4 hover:text-brand-400 transition-colors"
              >
                {profile.name}
              </button>
              <p className="text-gray-400 max-w-md leading-relaxed">
                {profile.tagline}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <nav className="space-y-3">
                {quickLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Contact & Social */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Connect</h4>
              <div className="space-y-4">
                <a
                  href={`mailto:${profile.email}`}
                  className="block text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {profile.email}
                </a>
                {profile.phone && (
                  <a
                    href={`tel:${profile.phone}`}
                    className="block text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {profile.phone}
                  </a>
                )}
                <div className="text-gray-400 text-sm">{profile.location}</div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4 mt-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target={social.name !== "Email" ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-gray-800 dark:bg-gray-900 flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-500 transition-all duration-200"
                    aria-label={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-gray-800 dark:border-gray-900">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>
                © {currentYear} {profile.name}.
              </span>
              <span>All rights reserved.</span>
            </div>

          </div>
        </div>
      </Container>
    </footer>
  );
}
