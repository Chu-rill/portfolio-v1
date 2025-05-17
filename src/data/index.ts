import { Project, Skill, SocialLink, NavLink, Experience } from "../types";

export const navLinks: NavLink[] = [
  { name: "Home", url: "#home" },
  { name: "About", url: "#about" },
  { name: "Projects", url: "#projects" },
  // { name: 'Experience', url: '#experience' },
  { name: "Contact", url: "#contact" },
];

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/chukwunonsoprosper",
    icon: "Github",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/chukwunonsoprosper",
    icon: "Linkedin",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/chukwunonsoprosper",
    icon: "Twitter",
  },
  {
    name: "Email",
    url: "mailto:contact@chukwunonsoprosper.live",
    icon: "Mail",
  },
];

export const projects: Project[] = [
  {
    id: 1,
    title: "InnkeeperPro",
    description:
      "InnkeeperPro is a FullStack hotel management system used to view listed hotels,rooms and make booking with an admin dashboard.",
    image: "../../public/project4.png",
    tags: ["React", "NestJs", "PostgreSQL", "Tailwind", "Prisma"],
    demoLink: "https://innkeeperpro.vercel.app/",
    codeLink: "https://github.com/Chu-rill/hotel-management-client",
  },
  {
    id: 2,
    title: "ChatSpace",
    description:
      "A real-time full-stack chat application using React, Express, and MongoDB, featuring serverless functions hosted on Google Cloud.",
    image: "../../public/project3.png",
    tags: ["REACT", "EXPRESS", "MONGODB", "SOCKET.IO"],
    demoLink: "https://chat-space-sand.vercel.app/",
    codeLink: "https://github.com/Chu-rill/ChatSpace",
  },
  {
    id: 3,
    title: "Conversa",
    description:
      "A chatbot application leveraging Google's Gemini API for intelligent conversation experiences.",
    image: "../../public/project1.png",
    tags: ["HTML", "CSS", "JAVASCRIPT"],
    demoLink: "https://gdsc-chatbot.netlify.app/",
    codeLink: "https://github.com/Chu-rill/GDSC-Ai",
  },
  {
    id: 4,
    title: "Trivio",
    description:
      "A fullstack quiz application that allows users to create quizzes, answer questions from various categories. It tracks scores, provides a leaderboard, and lets users filter quizzes by category and difficulty.",
    image: "../../public/project7.png",
    tags: ["React", "MongoDB", "Express"],
    demoLink: "https://trivio-chi.vercel.app/",
    codeLink: "https://github.com/Chu-rill/Quiz_app",
  },
];

export const skills: Skill[] = [
  { id: 1, name: "HTML", icon: "Code", category: "frontend" },
  { id: 2, name: "CSS", icon: "Paintbrush", category: "frontend" },
  { id: 3, name: "JavaScript", icon: "FileCode", category: "frontend" },
  { id: 4, name: "TypeScript", icon: "FileCode", category: "frontend" },
  { id: 5, name: "React", icon: "Atom", category: "frontend" },
  { id: 6, name: "Node.js", icon: "Server", category: "backend" },
  { id: 7, name: "Express", icon: "Server", category: "backend" },
  { id: 8, name: "MongoDB", icon: "Database", category: "backend" },
  { id: 9, name: "Git", icon: "Git", category: "tools" },
  { id: 10, name: "TailwindCSS", icon: "Palette", category: "frontend" },
  { id: 11, name: "Redux", icon: "Layers", category: "frontend" },
  { id: 12, name: "Firebase", icon: "Flame", category: "backend" },
];

export const experiences: Experience[] = [
  {
    id: 1,
    role: "Senior Frontend Developer",
    company: "Tech Innovations Inc.",
    period: "Jan 2022 - Present",
    description: [
      "Led a team of 5 developers in building and maintaining multiple web applications",
      "Implemented modern UI/UX designs using React and TailwindCSS",
      "Optimized application performance, resulting in a 40% reduction in load time",
      "Collaborated with design and backend teams to ensure seamless integration",
    ],
  },
  {
    id: 2,
    role: "Frontend Developer",
    company: "Digital Solutions LLC",
    period: "Mar 2020 - Dec 2021",
    description: [
      "Developed responsive web applications using React and TypeScript",
      "Implemented state management solutions using Redux and Context API",
      "Created reusable component libraries for increased development efficiency",
      "Participated in code reviews and mentored junior developers",
    ],
  },
  {
    id: 3,
    role: "Web Developer Intern",
    company: "StartUp Ventures",
    period: "Jun 2019 - Feb 2020",
    description: [
      "Assisted in developing and maintaining company websites",
      "Created responsive layouts using HTML, CSS, and JavaScript",
      "Collaborated with senior developers on feature implementation",
      "Participated in daily stand-ups and sprint planning meetings",
    ],
  },
];

export const about = {
  name: "Churchill Daniel",
  title: "Software Developer",
  description: `I'm a passionate software developer with experience in creating efficient, scalable, and user-friendly web applications. My expertise lies in React,NestJs and modern TypeScript, and I am dedicated to building accessible and performant solutions.`,
  longDescription: `Driven by a fascination with technology, my journey has led to a deep commitment to developing digital solutions that have a meaningful impact. I advocate for clean, maintainable code, robust system architecture, and a culture of continuous learning and improvement.

When I'm not coding, I'm often exploring new technologies, contributing to open-source projects, or writing about my experiences on various platforms. I am always eager to tackle new challenges and collaborate on innovative projects.

Let's connect and build the future together!`,
};
