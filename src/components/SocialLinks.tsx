import React from "react";
import { socialLinks } from "../data";
import * as LucideIcons from "lucide-react";

const SocialLinks: React.FC = () => {
  return (
    <div className="flex items-center justify-center space-x-6">
      {socialLinks.map((link) => {
        // Fixed TypeScript error by properly typing the IconComponent
        const IconComponent =
          link.icon in LucideIcons
            ? (LucideIcons[
                link.icon as keyof typeof LucideIcons
              ] as React.ComponentType<{ size?: number; className?: string }>)
            : null;

        return (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${link.name}`}
            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
          >
            {IconComponent && <IconComponent size={24} />}
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
