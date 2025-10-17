import { motion } from "framer-motion";
import { MapPin, Calendar, Briefcase } from "lucide-react";
import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import type { Experience } from "../../types";

interface ExperienceSectionProps {
  experiences: Experience[];
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

function ExperienceCard({ experience }: { experience: Experience }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const typeColors = {
    "full-time":
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    "part-time":
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    contract:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
    internship:
      "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
    freelance:
      "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400",
  };

  return (
    <motion.div variants={fadeInUp} className="relative">
      {/* Timeline connector */}
      <div className="hidden md:flex absolute left-8 top-16 bottom-0 w-px bg-gray-300 dark:bg-gray-600"></div>

      {/* Timeline dot */}
      <div className="hidden md:flex absolute left-6 top-8 w-5 h-5 bg-brand-500 rounded-full border-4 border-white dark:border-background-dark shadow-lg"></div>

      <div className="md:ml-16">
        <div className="card p-8 hover:shadow-xl transition-all duration-300 group">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-brand-500 dark:group-hover:text-brand-400 transition-colors">
                {experience.role}
              </h3>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-lg font-medium text-brand-500 dark:text-brand-400">
                  {experience.company}
                </span>
                {/* {experience.companyUrl && (
                  <a
                    href={experience.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
                    aria-label={`Visit ${experience.company}`}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )} */}
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {formatDate(experience.startDate)} -{" "}
                    {experience.endDate
                      ? formatDate(experience.endDate)
                      : "Present"}
                  </span>
                </div>
                {experience.location && (
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{experience.location}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {experience.current && (
                <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                  Current
                </span>
              )}
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${
                  typeColors[experience.type]
                }`}
              >
                {experience.type.replace("-", " ")}
              </span>
            </div>
          </div>

          {/* Highlights */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <Briefcase className="h-4 w-4 mr-2" />
              Key Achievements
            </h4>
            <ul className="space-y-2">
              {experience.highlights.map((highlight, highlightIndex) => (
                <li
                  key={highlightIndex}
                  className="flex items-start space-x-3 text-gray-600 dark:text-gray-300"
                >
                  <div className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="leading-relaxed">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          {experience.technologies && experience.technologies.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  // Sort experiences by start date (newest first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <section id="experience" className="py-12 md:py-24 bg-white dark:bg-background-dark">
      <Container>
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
        >
          <SectionHeader
            title="Work Experience"
            subtitle="My professional journey and the experiences that have shaped my expertise"
            center
          />

          {/* Experience Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {sortedExperiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>

          {/* Summary Stats */}
          <motion.div
            variants={fadeInUp}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            <div className="text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-900/50">
              <div className="text-3xl font-bold text-brand-500 dark:text-brand-400 mb-2">
                {experiences.length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Positions Held
              </div>
            </div>

            <div className="text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-900/50">
              <div className="text-3xl font-bold text-brand-500 dark:text-brand-400 mb-2">
                {Math.max(
                  ...experiences.map((exp) => {
                    const start = new Date(exp.startDate);
                    const end = exp.endDate
                      ? new Date(exp.endDate)
                      : new Date();
                    return Math.ceil(
                      (end.getTime() - start.getTime()) /
                        (1000 * 60 * 60 * 24 * 365)
                    );
                  })
                )}
                +
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Years at One Company
              </div>
            </div>

            <div className="text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-900/50">
              <div className="text-3xl font-bold text-brand-500 dark:text-brand-400 mb-2">
                {
                  [
                    ...new Set(
                      experiences.flatMap((exp) => exp.technologies || [])
                    ),
                  ].length
                }
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Technologies Used
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
