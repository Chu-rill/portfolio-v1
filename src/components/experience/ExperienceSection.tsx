import { motion } from "framer-motion";
import { MapPin, Calendar, Briefcase, CheckCircle2, TrendingUp } from "lucide-react";
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
    <motion.div
      variants={fadeInUp}
      whileHover={{ x: 8 }}
      className="relative mb-12 last:mb-0"
    >
      {/* Enhanced Timeline connector */}
      <div className="hidden md:block absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-brand-500 via-brand-400 to-transparent"></div>

      {/* Enhanced Timeline dot with pulse animation */}
      <div className="hidden md:flex absolute left-6 top-8 w-5 h-5">
        <div className="absolute inset-0 bg-brand-500 rounded-full animate-ping opacity-20"></div>
        <div className="relative w-5 h-5 bg-gradient-to-br from-brand-400 to-brand-600 rounded-full border-4 border-white dark:border-background-dark shadow-lg"></div>
      </div>

      <div className="md:ml-16">
        <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 hover:border-brand-400 dark:hover:border-brand-500 p-8 hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-500">
          {/* Background Gradient on Hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500/0 via-brand-400/0 to-brand-600/0 group-hover:from-brand-500/5 group-hover:via-brand-400/5 group-hover:to-brand-600/5 transition-all duration-500 pointer-events-none" />
          {/* Header */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between mb-6">
            <div className="mb-4 md:mb-0 flex-1">
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-gradient transition-all duration-300">
                    {experience.role}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl font-semibold text-brand-600 dark:text-brand-400">
                      {experience.company}
                    </span>
                    {experience.current && (
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold">
                        <TrendingUp className="w-3 h-3" />
                        <span>Current Position</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <Calendar className="h-4 w-4 text-brand-500" />
                  <span className="font-medium">
                    {formatDate(experience.startDate)} -{" "}
                    {experience.endDate
                      ? formatDate(experience.endDate)
                      : "Present"}
                  </span>
                </div>
                {experience.location && (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    <MapPin className="h-4 w-4 text-brand-500" />
                    <span className="font-medium">{experience.location}</span>
                  </div>
                )}
                <span
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize ${
                    typeColors[experience.type]
                  }`}
                >
                  {experience.type.replace("-", " ")}
                </span>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="relative z-10 mb-6">
            <h4 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <div className="p-2 rounded-lg bg-brand-100 dark:bg-brand-900/20">
                <Briefcase className="h-4 w-4 text-brand-600 dark:text-brand-400" />
              </div>
              Key Achievements
            </h4>
            <ul className="space-y-3">
              {experience.highlights.map((highlight, highlightIndex) => (
                <motion.li
                  key={highlightIndex}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: highlightIndex * 0.1 }}
                  className="flex items-start gap-3 text-gray-700 dark:text-gray-300 group/item"
                >
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-5 h-5 text-green-500 group-hover/item:scale-110 transition-transform" />
                  </div>
                  <span className="leading-relaxed text-sm md:text-base">
                    {highlight}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          {experience.technologies && experience.technologies.length > 0 && (
            <div className="relative z-10">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech, idx) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1.5 text-xs font-semibold bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 rounded-full hover:bg-brand-100 dark:hover:bg-brand-900/30 transition-all duration-300 cursor-default border border-brand-200 dark:border-brand-800"
                  >
                    {tech}
                  </motion.span>
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
