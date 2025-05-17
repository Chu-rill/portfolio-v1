import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check user preference from localStorage or system preference
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) {
      return savedMode === "true";
    } else {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    // Update localStorage when darkMode changes
    localStorage.setItem("darkMode", darkMode.toString());

    // Update document class
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // SEO modifications
  useEffect(() => {
    // Update title
    document.title = "Daniel Churchill | Software Developer";

    // Add meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      "content",
      "Churchill Daniel is a Software developer specializing in creating beautiful, functional, and user-friendly web applications using React and modern JavaScript."
    );

    // Add keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute(
      "content",
      "Software developer, web developer, react developer, NestJs,ExpressJs,PostgreSQL,Prisma, typescript, churchill, daniel"
    );

    // Add social tags
    const metaTags = [
      {
        property: "og:title",
        content: "Daniel Churchill | Software Developer",
      },
      {
        property: "og:description",
        content:
          "Frontend developer specializing in React and modern JavaScript applications",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://chukwunonsoprosper.live" },
      {
        property: "og:image",
        content:
          "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      { property: "twitter:card", content: "summary_large_image" },
      {
        property: "twitter:title",
        content: "Prosper Chukwunonso | Frontend Developer",
      },
      {
        property: "twitter:description",
        content:
          "Frontend developer specializing in React and modern JavaScript applications",
      },
      {
        property: "twitter:image",
        content:
          "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
    ];

    metaTags.forEach((tag) => {
      let metaTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (!metaTag) {
        metaTag = document.createElement("meta");
        metaTag.setAttribute("property", tag.property);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute("content", tag.content);
    });

    // Add canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", "https://chukwunonsoprosper.live");
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        {/* <Experience /> */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
