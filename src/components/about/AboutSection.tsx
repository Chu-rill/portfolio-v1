import { motion, useInView } from "framer-motion";
import { MapPin, Calendar, Award, Download, Sparkles } from "lucide-react";
import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import type { Profile } from "../../types";
import { useRef, useEffect, useState } from "react";

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

// Animated Counter Component
function AnimatedCounter({
  end,
  duration = 2,
}: {
  end: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const isInView = useInView(counterRef, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min(
        (currentTime - startTime) / (duration * 1000),
        1,
      );

      const easeOutQuad = (t: number) => t * (2 - t);
      const currentCount = Math.floor(
        startValue + (end - startValue) * easeOutQuad(progress),
      );

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, isInView]);

  return <span ref={counterRef}>{count}</span>;
}

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
              <div className="relative z-10 group">
                {profile.image ? (
                  <div className="relative">
                    <img
                      src={profile.image}
                      alt={profile.name}
                      className="w-full max-w-md mx-auto rounded-2xl shadow-2xl ring-4 ring-brand-500/20 dark:ring-brand-400/20 group-hover:ring-brand-500/40 dark:group-hover:ring-brand-400/40 transition-all duration-500"
                    />
                  </div>
                ) : (
                  <div className="w-full max-w-md mx-auto h-96 bg-gradient-to-br from-brand-500 to-purple-600 rounded-2xl shadow-2xl flex items-center justify-center text-white text-6xl font-bold ring-4 ring-brand-500/20">
                    {profile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                )}
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-brand-500/20 dark:bg-brand-400/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-purple-500/20 dark:bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-brand-500/5 to-purple-500/5 rounded-3xl blur-2xl"></div>
            </motion.div>

            {/* Content Section */}
            <motion.div className="space-y-8" variants={fadeInUp}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                    Hi, I'm{" "}
                    <span className="text-gradient">
                      {profile.name.split(" ")[0]}
                    </span>
                  </h3>
                  <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-medium">
                    {profile.tagline}
                  </p>
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                    {profile.bio}
                  </p>
                </div>

                {/* Download Resume Button */}
                {profile.resume && (
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={profile.resume}
                      download
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold hover:from-brand-600 hover:to-brand-700 transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/30 group"
                    >
                      <Download className="w-5 h-5 group-hover:animate-bounce" />
                      <span>Download Resume</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Stats Grid */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
                variants={stagger}
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    variants={fadeInUp}
                    whileHover={{ y: -5 }}
                    className="relative overflow-hidden card p-6 text-center group hover:shadow-xl hover:shadow-brand-500/10 transition-all duration-300 border border-gray-200 dark:border-gray-800"
                  >
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-500/0 via-brand-400/0 to-brand-600/0 group-hover:from-brand-500/5 group-hover:via-brand-400/5 group-hover:to-brand-600/5 transition-all duration-500" />

                    <div className="relative z-10">
                      <stat.icon
                        className={`h-8 w-8 mx-auto mb-3 ${stat.color} group-hover:scale-110 transition-transform`}
                      />
                      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                        {typeof stat.value === "string" &&
                        stat.value.includes("+") ? (
                          <>
                            <AnimatedCounter
                              end={parseInt(stat.value)}
                              duration={2 + index * 0.2}
                            />
                            +
                          </>
                        ) : (
                          stat.value
                        )}
                      </div>
                      <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
                        {stat.label}
                      </div>
                    </div>

                    {/* Decorative Corner */}
                    <div
                      className={`absolute top-0 right-0 w-16 h-16 ${stat.color} opacity-5 rounded-bl-full`}
                    />
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
