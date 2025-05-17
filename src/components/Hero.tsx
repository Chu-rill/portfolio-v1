import React from "react";
import { ChevronDown } from "lucide-react";
import { about } from "../data";
import SocialLinks from "./SocialLinks";

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center relative pt-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            <span className="block">Hi, I'm</span>
            <span className="text-blue-600 dark:text-blue-400">
              {about.name}
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 mb-8">
            {about.title}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 leading-relaxed">
            {about.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="#projects"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-all duration-300 text-lg font-medium"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg transition-all duration-300 text-lg font-medium"
            >
              Contact Me
            </a>
          </div>
          <SocialLinks />
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" aria-label="Scroll to About section">
          <ChevronDown size={30} className="text-gray-600 dark:text-gray-400" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
