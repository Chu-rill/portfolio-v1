import { motion } from "framer-motion";
import { MapPin, Calendar, Award } from "lucide-react";
import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import type { Profile } from "../../types";

interface AboutSectionProps {
  profile: Profile;
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const stagger = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function AboutSection({ profile }: AboutSectionProps) {
  const stats = [
    {
      icon: Calendar,
      label: "Years Experience",
      value: `${profile.yearsExperience}+`,
      color: "text-blue-500",
    },
    // {
    //   icon: Coffee,
    //   label: "Coffee Consumed",
    //   value: "1000+",
    //   color: "text-amber-500",
    // },
    {
      icon: Award,
      label: "Projects Completed",
      value: "5+",
      color: "text-green-500",
    },
    {
      icon: MapPin,
      label: "Based In",
      value: profile.location,
      color: "text-purple-500",
    },
  ];

  return (
    <section id="about" className="py-24 bg-gray-50 dark:bg-gray-900/50">
      <Container>
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <SectionHeader
            title="About Me"
            subtitle="Get to know more about who I am, what I do, and what inspires me"
            className="  w-full flex flex-col items-center"
          />

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Section */}
            <motion.div className="relative" variants={fadeInUp}>
              <div className="relative z-10">
                {profile.image ? (
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                  />
                ) : (
                  <div className="w-full max-w-md mx-auto h-96 bg-gradient-to-br from-brand-500 to-purple-600 rounded-2xl shadow-2xl flex items-center justify-center text-white text-6xl font-bold">
                    {profile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                )}
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-500/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"></div>
            </motion.div>

            {/* Content Section */}
            <motion.div className="space-y-8" variants={fadeInUp}>
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Hi, I'm {profile.name.split(" ")[0]}
                </h3>

                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {profile.bio}
                  </p>
                </div>

                <div className="flex items-center space-x-2 text-brand-500 dark:text-brand-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">{profile.availability}</span>
                </div>
              </div>

              {/* Stats Grid */}
              <motion.div className="grid grid-cols-2 gap-6" variants={stagger}>
                {stats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    variants={fadeInUp}
                    className="card p-6 text-center group hover:shadow-xl transition-all duration-300"
                  >
                    <stat.icon
                      className={`h-8 w-8 mx-auto mb-3 ${stat.color} group-hover:scale-110 transition-transform`}
                    />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Contact Info */}
              <motion.div
                variants={fadeInUp}
                className="pt-6 border-t border-gray-200 dark:border-gray-700"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Get in touch
                    </p>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-brand-500 dark:text-brand-400 hover:text-brand-600 dark:hover:text-brand-300 font-medium transition-colors"
                    >
                      {profile.email}
                    </a>
                  </div>

                  {profile.phone && (
                    <div className="text-right">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        Call me
                      </p>
                      <a
                        href={`tel:${profile.phone}`}
                        className="text-brand-500 dark:text-brand-400 hover:text-brand-600 dark:hover:text-brand-300 font-medium transition-colors"
                      >
                        {profile.phone}
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
