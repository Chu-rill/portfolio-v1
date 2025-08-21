import { motion } from "framer-motion";
import { ExternalLink, Github, Eye, Clock } from "lucide-react";
import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import type { Project } from "../../types";

interface ProjectsGridProps {
  projects: Project[];
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const stagger = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function ProjectCard({ project }: { project: Project }) {
  const statusColors = {
    completed:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    "in-progress":
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    planned: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
  };

  const statusIcons = {
    completed: null,
    "in-progress": Clock,
    planned: Clock,
  };

  const StatusIcon = statusIcons[project.status];

  return (
    <motion.div
      variants={fadeInUp}
      className="group relative overflow-hidden card hover:shadow-2xl transition-all duration-500"
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-brand-500/20 to-purple-500/20">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-400 dark:text-gray-500">
            {project.title
              .split(" ")
              .map((word) => word[0])
              .join("")}
          </div>
        )}

        {/* Overlay with links */}
        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
              aria-label="View demo"
            >
              <Eye className="h-5 w-5" />
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
              aria-label="View source code"
            >
              <Github className="h-5 w-5" />
            </a>
          )}
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
              aria-label="View live site"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-brand-500 dark:group-hover:text-brand-400 transition-colors">
            {project.title}
          </h3>

          <div className="flex items-center space-x-2">
            {/* {project.featured && (
              <span className="px-2 py-1 text-xs font-medium bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400 rounded-full">
                Featured
              </span>
            )} */}
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full flex items-center space-x-1 ${
                statusColors[project.status]
              }`}
            >
              {StatusIcon && <StatusIcon className="h-3 w-3" />}
              <span className="capitalize">
                {project.status.replace("-", " ")}
              </span>
            </span>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const featuredProjects = projects.filter((project) => project.featured);
  const otherProjects = projects.filter((project) => !project.featured);

  return (
    <section id="projects" className="py-12 md:py-24 bg-white dark:bg-background-dark">
      <Container>
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
        >
          <SectionHeader
            title="Featured Projects"
            subtitle="Here are some of the projects I've worked on recently. Each one represents a unique challenge and learning experience."
            center
          />

          {/* Featured Projects */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-16"
            variants={stagger}
          >
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>

          {/* Other Projects */}
          {otherProjects.length > 0 && (
            <>
              <motion.div variants={fadeInUp} className="text-center mb-12">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Other Notable Projects
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Additional projects that showcase my skills and experience
                </p>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
                variants={stagger}
              >
                {otherProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </motion.div>
            </>
          )}

          {/* View More Button */}
          <motion.div variants={fadeInUp} className="text-center mt-12">
            <a
              href="#contact"
              className="btn-primary inline-flex items-center group"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById("contact");
                if (element) {
                  const offset = 80;
                  const top =
                    element.getBoundingClientRect().top +
                    window.pageYOffset -
                    offset;
                  window.scrollTo({ top, behavior: "smooth" });
                }
              }}
            >
              Interested in working together?
              <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
