export interface Profile {
  name: string;
  role: string;
  location: string;
  tagline: string;
  bio: string;
  email: string;
  phone?: string;
  availability: string;
  yearsExperience: number;
  image?: string;
  resume?: string;
  socials: {
    github?: string;
    linkedin?: string;
    x?: string;
    discord?: string;
    website?: string;
  };
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  enhancedDetails?: string;
  tags: string[];
  image?: string;
  links: {
    demo?: string;
    github?: string;
    live?: string;
  };
  featured: boolean;
  status: "completed" | "in-progress" | "planned";
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location?: string;
  type: "full-time" | "part-time" | "contract" | "internship" | "freelance";
  startDate: string;
  endDate?: string; // null means current position
  current: boolean;
  highlights: string[];
  technologies?: string[];
  companyUrl?: string;
}

export interface Skill {
  name: string;
  category: "database" | "tools" | "languages" | "frameworks";
  level: number; // 1-100
  icon?: string;
  color?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
  subject?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color?: string;
}
