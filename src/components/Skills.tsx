import React from "react";
import { skills } from "../data";
import * as LucideIcons from "lucide-react";

const Skills: React.FC = () => {
  const categories = ["frontend", "backend", "tools", "other"] as const;

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          My Skills
        </h2>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {categories.map((category) => {
              const categorySkills = skills.filter(
                (skill) => skill.category === category
              );
              if (categorySkills.length === 0) return null;

              return (
                <div
                  key={category}
                  className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md"
                >
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6 capitalize flex items-center">
                    <span>{category}</span>
                  </h3>
                  <div className="space-y-5">
                    {categorySkills.map((skill) => {
                      // Fixed TypeScript error by checking if the icon exists in LucideIcons
                      // and using type assertion to ensure it's a valid component
                      const IconComponent =
                        skill.icon in LucideIcons
                          ? (LucideIcons[
                              skill.icon as keyof typeof LucideIcons
                            ] as React.ComponentType<{
                              size?: number;
                              className?: string;
                            }>)
                          : null;

                      const proficiency = skill.proficiency || 75; // Fallback value

                      return (
                        <div key={skill.id} className="group relative">
                          <div className="flex items-center mb-1.5">
                            {IconComponent && (
                              <IconComponent
                                size={20}
                                className="text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0"
                              />
                            )}
                            <span className="text-gray-800 dark:text-gray-200 font-medium">
                              {skill.name}
                            </span>
                            <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
                              {proficiency}%
                            </span>
                          </div>

                          {/* Progress bar background */}
                          <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                            {/* Progress bar indicator */}
                            <div
                              className="h-full bg-blue-600 dark:bg-blue-400 rounded-full transition-all duration-500 ease-out group-hover:opacity-90"
                              style={{ width: `${proficiency}%` }}
                            >
                              {/* Animated pulse effect on hover */}
                              {/* <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-1000">
                                <div className="h-full w-full bg-white opacity-20 rounded-full"></div>
                              </div> */}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
