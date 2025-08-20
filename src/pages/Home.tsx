import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/nav/Navbar";
import { Hero } from "../components/hero/Hero";
import { AboutSection } from "../components/about/AboutSection";
import { ProjectsGrid } from "../components/projects/ProjectsGrid";
import { TechSection } from "../components/tech/TechSection";
import { ExperienceSection } from "../components/experience/ExperienceSection";
import { ContactForm } from "../components/contact/ContactForm";
import { Footer } from "../components/footer/Footer";

// Import data
import profileData from "../data/profile.json";
import projectsData from "../data/projects.json";
import experienceData from "../data/experience.json";
import skillsData from "../data/skills.json";

// Import types
import type { Profile, Project, Experience, Skill } from "../types";

const profile = profileData as Profile;
const projects = projectsData as Project[];
const experiences = experienceData as Experience[];
const skills = skillsData as Skill[];

export function Home() {
  return (
    <>
      <Helmet>
        <title>
          {profile.name} - {profile.role}
        </title>
        <meta name="description" content={profile.tagline} />
        <meta
          name="keywords"
          content={`${profile.name}, ${profile.role}, developer, portfolio, React, TypeScript, ${profile.location}`}
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={`${profile.name} - ${profile.role}`}
        />
        <meta property="og:description" content={profile.tagline} />
        <meta
          property="og:url"
          content={typeof window !== "undefined" ? window.location.href : ""}
        />
        {profile.image && <meta property="og:image" content={profile.image} />}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${profile.name} - ${profile.role}`}
        />
        <meta name="twitter:description" content={profile.tagline} />
        {profile.image && <meta name="twitter:image" content={profile.image} />}

        {/* Additional SEO */}
        <meta name="author" content={profile.name} />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="EN" />
        <meta name="theme-color" content="#60A5FA" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: profile.name,
            jobTitle: profile.role,
            description: profile.bio,
            email: profile.email,
            telephone: profile.phone,
            address: {
              "@type": "PostalAddress",
              addressLocality: profile.location,
            },
            url:
              profile.socials.website ||
              (typeof window !== "undefined" ? window.location.href : ""),
            sameAs: [
              profile.socials.linkedin,
              profile.socials.github,
              profile.socials.x,
            ].filter(Boolean),
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-background-dark">
        <Navbar />

        <main>
          <Hero profile={profile} />
          <AboutSection profile={profile} />
          <ProjectsGrid projects={projects} />
          <TechSection skills={skills} />
          <ExperienceSection experiences={experiences} />
          <ContactForm profile={profile} />
        </main>

        <Footer profile={profile} />
      </div>
    </>
  );
}
