import React from 'react';
import { experiences } from '../data';
import { Briefcase } from 'lucide-react';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Work Experience
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <div className="relative border-l-2 border-blue-600 dark:border-blue-400 pl-8 ml-4">
            {experiences.map((experience, index) => (
              <div key={experience.id} className={`mb-12 ${index === experiences.length - 1 ? 'mb-0' : ''}`}>
                <div className="absolute -left-3 mt-2 w-6 h-6 bg-blue-600 dark:bg-blue-400 rounded-full flex items-center justify-center">
                  <Briefcase size={14} className="text-white" />
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {experience.role}
                    </h3>
                    <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                      {experience.period}
                    </span>
                  </div>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-3">
                    {experience.company}
                  </p>
                  <ul className="list-disc ml-5 text-gray-600 dark:text-gray-400 space-y-2">
                    {experience.description.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;