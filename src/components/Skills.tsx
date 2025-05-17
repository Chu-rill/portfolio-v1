import React from 'react';
import { skills } from '../data';
import * as LucideIcons from 'lucide-react';

const Skills: React.FC = () => {
  const categories = ['frontend', 'backend', 'tools', 'other'] as const;

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          My Skills
        </h2>
        
        <div className="max-w-4xl mx-auto">
          {categories.map((category) => {
            const categorySkills = skills.filter(skill => skill.category === category);
            if (categorySkills.length === 0) return null;
            
            return (
              <div key={category} className="mb-12 last:mb-0">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6 capitalize">
                  {category}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {categorySkills.map((skill) => {
                    const IconComponent = LucideIcons[skill.icon as keyof typeof LucideIcons];
                    return (
                      <div key={skill.id} className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm transition-transform duration-300 hover:-translate-y-1 flex flex-col items-center">
                        {IconComponent && (
                          <IconComponent 
                            size={32} 
                            className="text-blue-600 dark:text-blue-400 mb-2" 
                          />
                        )}
                        <span className="text-gray-800 dark:text-gray-200">{skill.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;