import React from "react";
import { skills } from "../data";
import * as LucideIcons from "lucide-react";

const Skills: React.FC = () => {
  const categories = ["language", "framework", "tools", "other"] as const;

  const categoryIcons = {
    language: "Code2",
    framework: "Package",
    tools: "Wrench",
    other: "Sparkles",
  } as const;

  const categoryColors = {
    language: "from-blue-500 to-purple-600",
    framework: "from-green-500 to-teal-600",
    tools: "from-orange-500 to-red-600",
    other: "from-pink-500 to-rose-600",
  } as const;

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mb-4"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A comprehensive overview of the technologies and tools I work with
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category) => {
              const categorySkills = skills.filter(
                (skill) => skill.category === category
              );
              if (categorySkills.length === 0) return null;

              const CategoryIcon =
                categoryIcons[category] in LucideIcons
                  ? (LucideIcons[
                      categoryIcons[category] as keyof typeof LucideIcons
                    ] as React.ComponentType<{
                      size?: number;
                      className?: string;
                    }>)
                  : null;

              return (
                <div
                  key={category}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
                >
                  {/* Category Header */}
                  <div className="flex items-center mb-8">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${categoryColors[category]} flex items-center justify-center mr-4 shadow-lg`}
                    >
                      {CategoryIcon && (
                        <CategoryIcon size={24} className="text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 capitalize">
                        {category === "other" ? "Other Skills" : `${category}s`}
                      </h3>
                      <div
                        className={`w-16 h-1 bg-gradient-to-r ${categoryColors[category]} rounded-full mt-1`}
                      ></div>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {categorySkills.map((skill, index) => {
                      const IconComponent =
                        skill.icon in LucideIcons
                          ? (LucideIcons[
                              skill.icon as keyof typeof LucideIcons
                            ] as React.ComponentType<{
                              size?: number;
                              className?: string;
                            }>)
                          : null;

                      return (
                        <div
                          key={skill.id}
                          className="group/skill relative bg-gray-50 dark:bg-gray-700 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 cursor-pointer transform hover:scale-105"
                          style={{
                            animationDelay: `${index * 100}ms`,
                          }}
                        >
                          <div className="flex items-center">
                            {IconComponent ? (
                              <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center mr-3 shadow-sm group-hover/skill:shadow-md transition-shadow duration-300">
                                <IconComponent
                                  size={20}
                                  className="text-blue-600 dark:text-blue-400 group-hover/skill:scale-110 transition-transform duration-300"
                                />
                              </div>
                            ) : (
                              <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center mr-3 shadow-sm group-hover/skill:shadow-md transition-shadow duration-300">
                                <div className="w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                              </div>
                            )}
                            <div className="flex-1">
                              <span className="text-gray-800 dark:text-gray-200 font-semibold text-sm group-hover/skill:text-gray-900 dark:group-hover/skill:text-white transition-colors duration-300">
                                {skill.name}
                              </span>
                            </div>
                          </div>

                          {/* Hover Effect Border */}
                          <div
                            className={`absolute inset-0 rounded-xl bg-gradient-to-r ${categoryColors[category]} opacity-0 group-hover/skill:opacity-10 transition-opacity duration-300`}
                          ></div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Skill Count Badge */}
                  <div className="absolute top-4 right-4">
                    <div
                      className={`w-8 h-8 rounded-full bg-gradient-to-r ${categoryColors[category]} flex items-center justify-center shadow-lg`}
                    >
                      <span className="text-white text-sm font-bold">
                        {categorySkills.length}
                      </span>
                    </div>
                  </div>

                  {/* Background Decoration */}
                  <div
                    className={`absolute -top-2 -right-2 w-24 h-24 bg-gradient-to-r ${categoryColors[category]} rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-500`}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center bg-white dark:bg-gray-800 rounded-full px-8 py-4 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex -space-x-2 mr-4">
              {categories.slice(0, 4).map((category, index) => (
                <div
                  key={category}
                  className={`w-8 h-8 rounded-full bg-gradient-to-r ${categoryColors[category]} border-2 border-white dark:border-gray-800 shadow-sm`}
                  style={{ zIndex: 10 - index }}
                ></div>
              ))}
            </div>
            <span className="text-gray-600 dark:text-gray-400 font-medium">
              {skills.length} Skills Across {categories.length} Categories
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
