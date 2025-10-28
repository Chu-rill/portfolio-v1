import { motion } from "framer-motion";
import { Code, Database, Wrench, Layers } from "lucide-react";
import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import type { Skill } from "../../types";

// Animation definitions
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const stagger = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

// Category icons (Lucide)
const categoryIcons = {
  database: Database,
  tools: Wrench,
  languages: Code,
  frameworks: Layers,
};

// Gradient colors for categories
const categoryColors = {
  database: "from-purple-500 to-violet-500",
  tools: "from-orange-500 to-red-500",
  languages: "from-indigo-500 to-blue-500",
  frameworks: "from-pink-500 to-rose-500",
};

// Skill Card (uses Devicon for individual skill icons)
function SkillCard({ skill }: { skill: Skill }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="group relative  rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center space-x-4 mb-4">
        {/* Devicon Icon with skill-specific color */}
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform"
          style={{
            background: `linear-gradient(135deg, ${skill.color}, ${skill.color}80)`,
          }}
        >
          {skill.icon ? (
            // <i className={`${skill.icon} text-2xl`} />
            <img src={skill.icon} alt={skill.name} className="h-8 w-8" />
          ) : (
            skill.name.substring(0, 2).toUpperCase()
          )}
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {skill.name}
          </h3>
        </div>
      </div>

      {/* Progress Bar */}
      <div className=" flex items-center space-x-5">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-3 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ background: skill.color }}
          />
        </div>
        <p>{`${skill.level}%`}</p>
      </div>
    </motion.div>
  );
}

// Skill Category (uses Lucide icons for category)
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
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          ({skills.length})
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
      </div>
    </motion.div>
  );
}

// Tech Section
export function TechSection({ skills }: { skills: Skill[] }) {
  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  // Category display order
  const categoryOrder = ["languages", "frameworks", "tools", "database"];

  return (
    <section id="skills" className="py-12 md:py-24 bg-gray-50 dark:bg-gray-900/50">
      <Container>
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
        >
          <SectionHeader
            title="Skills & Technologies"
            subtitle="Here are the technologies and tools I work with to bring ideas to life"
            center
          />

          {/* Overview Stats */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-16"
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
                      {category.charAt(0).toUpperCase() + category.slice(1)}
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
