import React from "react";
import { projects } from "../data";
import { ExternalLink, Github } from "lucide-react";

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
          My Projects
        </h2>
        <div className="space-y-20">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`flex flex-col lg:flex-row items-center gap-12 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Project Image */}
              <div className="w-full lg:w-1/2">
                <div className="relative group">
                  <div className="h-80 overflow-hidden rounded-lg shadow-2xl">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-end justify-center pb-6">
                    <div className="flex space-x-4">
                      {project.demoLink && (
                        <a
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                        >
                          <ExternalLink size={18} className="mr-2" /> Live Demo
                        </a>
                      )}
                      {project.codeLink && (
                        <a
                          href={project.codeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                        >
                          <Github size={18} className="mr-2" /> View Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <div className="w-16 h-1 bg-blue-600 rounded"></div>
                </div>

                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies Used */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-sm rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4">
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <ExternalLink size={20} className="mr-2" /> Live Demo
                    </a>
                  )}
                  {project.codeLink && (
                    <a
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center border-2 border-gray-700 dark:border-gray-300 text-gray-700 dark:text-gray-300 hover:bg-gray-700 hover:text-white dark:hover:bg-gray-300 dark:hover:text-gray-900 px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      <Github size={20} className="mr-2" /> View Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
