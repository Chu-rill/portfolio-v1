import { Project, Skill, SocialLink, NavLink, Experience } from "../types";

export const navLinks: NavLink[] = [
  { name: "Home", url: "#home" },
  { name: "About", url: "#about" },
  { name: "Projects", url: "#projects" },
  { name: "Experience", url: "#experience" },
  { name: "Contact", url: "#contact" },
];

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/Chu-rill",
    icon: "Github",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/churchill-daniel-b66a752a7/",
    icon: "Linkedin",
  },
  {
    name: "Twitter",
    url: "https://x.com/chu_rill",
    icon: "Twitter",
  },
  {
    name: "Email",
    url: "mailto:churchilldaniel687@gmail.com",
    icon: "Mail",
  },
];

export const projects: Project[] = [
  {
    id: 1,
    title: "InnkeeperPro",
    description:
      "InnkeeperPro is a FullStack hotel management system used to view listed hotels,rooms and make booking with an admin dashboard.",
    image: "/images/project4.png",
    tags: ["React", "NestJs", "PostgreSQL", "Tailwind", "Prisma"],
    demoLink: "https://innkeeperpro.vercel.app/",
    codeLink: "https://github.com/Chu-rill/hotel-management-client",
  },
  {
    id: 2,
    title: "Recapify",
    description:
      "A text transformation tool that allows users to summarize, paraphrase, and generate text using Gemini API and a TTS audio file that is download able. It features a user-friendly interface built with React and TailwindCSS.",
    image: "/images/project1.png",
    tags: [
      "REACT",
      "NestJs",
      "PostgreSQL",
      "Gemini",
      "Unrealspeech",
      "TypeScript",
    ],
    demoLink: "https://recapify-omega.vercel.app/",
    codeLink: "https://github.com/Chu-rill/Recapify",
  },
  {
    id: 3,
    title: "ChatSpace",
    description:
      "A real-time full-stack chat application using React, Express, and MongoDB, featuring serverless functions hosted on Google Cloud.",
    image: "/images/project3.png",
    tags: ["REACT", "EXPRESS", "MONGODB", "SOCKET.IO"],
    demoLink: "https://chat-space-sand.vercel.app/",
    codeLink: "https://github.com/Chu-rill/ChatSpace",
  },
  {
    id: 4,
    title: "Trivio",
    description:
      "A fullstack quiz application that allows users to create quizzes, answer questions from various categories. It tracks scores, provides a leaderboard, and lets users filter quizzes by category and difficulty.",
    image: "/images/project7.png",
    tags: ["React", "MongoDB", "Express"],
    demoLink: "https://trivio-chi.vercel.app/",
    codeLink: "https://github.com/Chu-rill/Quiz_app",
  },
  {
    id: 5,
    title: "StoryNest",
    description:
      "StoryNest is a modern social blogging platform that enables users to share stories, experiences, and engage with a community of writers and readers.",
    image: "/images/project2.png",
    tags: ["React", "MongoDB", "Express", "Cloudinary"],
    demoLink: "https://story-nest-mu.vercel.app/",
    codeLink: "https://github.com/Chu-rill/StoryNest",
  },
];

export const skills: Skill[] = [
  { id: 1, name: "HTML", icon: "Code", category: "frontend", proficiency: 95 },
  {
    id: 2,
    name: "CSS",
    icon: "Paintbrush",
    category: "frontend",
    proficiency: 90,
  },
  {
    id: 3,
    name: "JavaScript",
    icon: "FileCode",
    category: "frontend",
    proficiency: 92,
  },
  {
    id: 4,
    name: "TypeScript",
    icon: "FileCode",
    category: "frontend",
    proficiency: 88,
  },
  { id: 5, name: "React", icon: "Atom", category: "frontend", proficiency: 90 },
  {
    id: 6,
    name: "Node.js",
    icon: "Server",
    category: "backend",
    proficiency: 85,
  },
  {
    id: 7,
    name: "Express",
    icon: "Server",
    category: "backend",
    proficiency: 87,
  },
  {
    id: 8,
    name: "MongoDB",
    icon: "Database",
    category: "backend",
    proficiency: 82,
  },
  {
    id: 9,
    name: "Git",
    icon: "code",
    category: "tools",
    proficiency: 89,
  },
  {
    id: 10,
    name: "TailwindCSS",
    icon: "Palette",
    category: "frontend",
    proficiency: 92,
  },
  // {
  //   id: 11,
  //   name: "Redux",
  //   icon: "Layers",
  //   category: "frontend",
  //   proficiency: 84,
  // },
  // { id: 12, name: "Firebase", icon: "Flame", category: "backend", proficiency: 80 },
  {
    id: 13,
    name: "PostgreSQL",
    icon: "Database",
    category: "backend",
    proficiency: 78,
  },
  {
    id: 14,
    name: "NestJs",
    icon: "Server",
    category: "backend",
    proficiency: 83,
  },
  {
    id: 15,
    name: "Prisma",
    icon: "Database",
    category: "backend",
    proficiency: 80,
  },
  {
    id: 16,
    name: "Socket.IO",
    icon: "Plug",
    category: "backend",
    proficiency: 79,
  },
  { id: 17, name: "Linux", icon: "code", category: "tools", proficiency: 75 },
  { id: 18, name: "Jest", icon: "code", category: "tools", proficiency: 76 },
  {
    id: 19,
    name: "Go",
    icon: "FileCode",
    category: "backend",
    proficiency: 20,
  },
  {
    id: 20,
    name: "PHP",
    icon: "FileCode",
    category: "backend",
    proficiency: 30,
  },
];

export const experiences: Experience[] = [
  {
    id: 1,
    role: "Backend Developer",
    company: "Melcom eX (Startup)",
    period: "June 2024 - Present",
    description: [
      "Collaborating with developers to build and optimize backend infrastructure",
      "Designed and Deployed Application programming interface (API)",
      "Working on scalable backend solutions for startup projects",
    ],
  },
  {
    id: 2,
    role: "Core Team Member",
    company: "Google Developer Group on Campus (GDGOC) - University of Ilorin",
    period: "September 2024 - Present",
    description: [
      "Collaborating with developers to build the website for our events (Build with AI)",
      "Organize technical workshops and events",
      "Contributing to the developer community growth on campus",
    ],
  },
  // {
  //   id: 3,
  //   role: "Web Developer Intern",
  //   company: "StartUp Ventures",
  //   period: "Jun 2019 - Feb 2020",
  //   description: [
  //     "Assisted in developing and maintaining company websites",
  //     "Created responsive layouts using HTML, CSS, and JavaScript",
  //     "Collaborated with senior developers on feature implementation",
  //     "Participated in daily stand-ups and sprint planning meetings",
  //   ],
  // },
];

export const about = {
  name: "Churchill Daniel",
  title: "Software Developer",
  description: `I'm a passionate software developer focused on building robust, user-friendly web applications with modern technologies. Specializing in fullstack development with React, NestJS, and TypeScript, I create accessible and performant digital solutions.`,
  longDescription: `With a strong foundation in both frontend and backend technologies, I transform ideas into scalable, maintainable code. My GitHub repositories showcase my commitment to clean architecture and continuous improvement across various projects.

My technical journey is driven by curiosity and problem-solving. I've built applications ranging from intuitive user interfaces with React to powerful APIs with NestJS, always prioritizing code quality and user experience. My work on Recapify demonstrates my ability to implement complex features while maintaining a clean, organized codebase.

When not coding, I explore emerging technologies, contribute to open-source projects, and share insights about software development on social media. I'm particularly interested in system architecture, performance optimization, and creating accessible web experiences.

I believe in the power of technology to solve real-world problems and am always looking for opportunities to collaborate on meaningful projects. My approach combines technical expertise with creative thinking to deliver solutions that exceed expectations.

Connect with me on GitHub (@Chu-rill) to see my work or follow me on Twitter (@chu_rill) for tech insights and updates. I'm open to new challenges and excited to build the future of the web together!`,
  github: "https://github.com/Chu-rill",
  twitter: "https://x.com/chu_rill",
};
