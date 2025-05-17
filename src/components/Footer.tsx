import React from "react";
import { navLinks } from "../data";
import SocialLinks from "./SocialLinks";
import { ChevronUp } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-8">
          <a
            href="#home"
            className="bg-blue-600 hover:bg-blue-700 rounded-full p-3 transition-colors duration-300"
            aria-label="Back to top"
          >
            <ChevronUp size={24} />
          </a>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold text-blue-400 mb-6">CD</div>

          <nav className="mb-6">
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mb-8">
            <SocialLinks />
          </div>

          <div className="text-sm text-gray-400 text-center">
            <p>&copy; {currentYear} Churchill Daniel. All rights reserved.</p>
            <p className="mt-1">
              Designed and built with React and TailwindCSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
