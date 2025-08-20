import { motion } from "framer-motion";
import { Code, Database, Wrench, Layers } from "lucide-react";
import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import type { Skill } from "../../types";

interface TechSectionProps {
  skills: Skill[];
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

const categoryIcons = {
  frontend: Code,
  backend: Database,
  database: Database,
  tools: Wrench,
  languages: Code,
  frameworks: Layers,
};

const categoryColors = {
  frontend: "from-blue-500 to-cyan-500",
  backend: "from-green-500 to-emerald-500",
  database: "from-purple-500 to-violet-500",
  tools: "from-orange-500 to-red-500",
  languages: "from-indigo-500 to-blue-500",
  frameworks: "from-pink-500 to-rose-500",
};

const levelColors = {
  beginner: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  intermediate:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  advanced:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  expert:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
};

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="group relative overflow-hidden rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center space-x-4">
        {/* Skill Icon/Initial */}
        <div
          className={`w-12 h-12 rounded-lg bg-gradient-to-r ${
            categoryColors[skill.category]
          } flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform`}
        >
          {skill.icon ? (
            <span>{skill.icon}</span>
          ) : (
            skill.name.substring(0, 2).toUpperCase()
          )}
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {skill.name}
          </h3>
          <div className="flex items-center space-x-2">
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                levelColors[skill.level]
              }`}
            >
              {skill.level}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
              {skill.category}
            </span>
          </div>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
    </motion.div>
  );
}

function SkillCategory({
  category,
  skills,
  icon: Icon,
}: {
  category: string;
  skills: Skill[];
  icon: React.ComponentType<any>;
}) {
  return (
    <motion.div variants={fadeInUp} className="mb-12">
      <div className="flex items-center space-x-3 mb-6">
        <div
          className={`w-10 h-10 rounded-lg bg-gradient-to-r ${
            categoryColors[category as keyof typeof categoryColors]
          } flex items-center justify-center text-white`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white capitalize">
          {category === "frontend"
            ? "Frontend"
            : category === "backend"
            ? "Backend"
            : category === "database"
            ? "Database"
            : category === "tools"
            ? "Tools"
            : category === "languages"
            ? "Languages"
            : "Frameworks"}
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          ({skills.length})
        </span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
      </div>
    </motion.div>
  );
}

export function TechSection({ skills }: TechSectionProps) {
  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  // Define category order
  const categoryOrder = [
    "languages",
    "frontend",
    "backend",
    "database",
    "frameworks",
    "tools",
  ];

  return (
    <section id="skills" className="py-24 bg-gray-50 dark:bg-gray-900/50">
      <Container>
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <SectionHeader
            title="Skills & Technologies"
            subtitle="Here are the technologies and tools I work with to bring ideas to life"
            center
          />

          {/* Skills Overview Stats */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {Object.entries(skillsByCategory).map(
              ([category, categorySkills]) => {
                const Icon =
                  categoryIcons[category as keyof typeof categoryIcons];
                return (
                  <div
                    key={category}
                    className="text-center p-6 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800"
                  >
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${
                        categoryColors[category as keyof typeof categoryColors]
                      } flex items-center justify-center text-white mx-auto mb-3`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {categorySkills.length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                      {category === "frontend"
                        ? "Frontend"
                        : category === "backend"
                        ? "Backend"
                        : category === "database"
                        ? "Database"
                        : category === "tools"
                        ? "Tools"
                        : category === "languages"
                        ? "Languages"
                        : "Frameworks"}
                    </div>
                  </div>
                );
              }
            )}
          </motion.div>

          {/* Skills by Category */}
          <div className="space-y-12">
            {categoryOrder.map((category) => {
              const categorySkills = skillsByCategory[category];
              if (!categorySkills || categorySkills.length === 0) return null;

              const Icon =
                categoryIcons[category as keyof typeof categoryIcons];
              return (
                <SkillCategory
                  key={category}
                  category={category}
                  skills={categorySkills}
                  icon={Icon}
                />
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
