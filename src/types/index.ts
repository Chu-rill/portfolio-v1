export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoLink?: string;
  codeLink?: string;
}

export interface Skill {
  id: number;
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'tools' | 'other';
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface NavLink {
  name: string;
  url: string;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string[];
}