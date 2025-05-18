import React from "react";
import { about } from "../data";

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            About Me
          </h2>
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-1/3">
              <div className="relative w-64 h-64 mx-auto">
                <div className="absolute inset-0 bg-blue-600 rounded-lg transform translate-x-3 translate-y-3"></div>
                <img
                  src="/images/profile2.jpeg"
                  alt="Churchill Daniel"
                  className="relative z-10 w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
            <div className="md:w-2/3">
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {about.longDescription.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </p>
              <a
                href="#contact"
                className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-all duration-300 text-lg font-medium"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
