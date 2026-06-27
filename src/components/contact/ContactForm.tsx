import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Send,
  Phone,
  MapPin,
  CheckCircle,
  AlertCircle,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import type { Profile } from "../../types";

interface ContactFormProps {
  profile: Profile;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
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

export function ContactForm({ profile }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Send email using EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject || "Contact from Portfolio",
        message: formData.message,
        to_email: profile.email,
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Email send error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      color: "text-red-500",
    },
    ...(profile.phone
      ? [
          {
            icon: Phone,
            label: "Phone",
            value: profile.phone,
            href: `tel:${profile.phone}`,
            color: "text-green-500",
          },
        ]
      : []),
    {
      icon: MapPin,
      label: "Location",
      value: profile.location,
      href: "#",
      color: "text-blue-500",
    },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      url: profile.socials.github,
      icon: Github,
      gradient: "from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800",
      hoverGradient: "hover:from-gray-900 hover:to-black dark:hover:from-gray-600 dark:hover:to-gray-700"
    },
    {
      name: "LinkedIn",
      url: profile.socials.linkedin,
      icon: Linkedin,
      gradient: "from-blue-600 to-blue-700",
      hoverGradient: "hover:from-blue-700 hover:to-blue-800"
    },
    {
      name: "X",
      url: profile.socials.x,
      icon: Twitter,
      gradient: "from-slate-800 to-slate-900 dark:from-slate-700 dark:to-slate-800",
      hoverGradient: "hover:from-slate-900 hover:to-black dark:hover:from-slate-600 dark:hover:to-slate-700"
    },
  ].filter((link) => link.url);

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-white dark:from-background-dark to-gray-50 dark:to-gray-900/50 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl" />
      </div>

      <Container>
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <SectionHeader
            title="Get In Touch"
            subtitle="Have a project in mind or just want to chat? I'd love to hear from you."
            center
          />

          <div className="max-w-5xl mx-auto">
            {/* Contact Information */}
            <motion.div variants={fadeInUp} className="space-y-12">
              {/* Main CTA */}
              <div className="text-center max-w-3xl mx-auto">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Let's start a conversation
                </h3>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                  I'm always interested in hearing about new opportunities,
                  interesting projects, or just connecting with fellow
                  developers.
                </p>

                {/* Primary Contact Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold text-lg hover:from-brand-600 hover:to-brand-700 transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/30 group"
                  >
                    <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    <span>Send me an email</span>
                  </a>
                  {profile.resume && (
                    <a
                      href={profile.resume}
                      download
                      className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold text-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:shadow-xl group"
                    >
                      <Send className="w-6 h-6 group-hover:rotate-45 transition-transform" />
                      <span>Download Resume</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Contact Methods Grid */}
              <div className="grid md:grid-cols-3 gap-6">
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={method.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="relative group"
                  >
                    <div className="h-full p-6 rounded-2xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 hover:border-brand-400 dark:hover:border-brand-500 transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/10">
                      {/* Icon */}
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${method.color === 'text-red-500' ? 'from-red-500 to-red-600' : method.color === 'text-green-500' ? 'from-green-500 to-green-600' : 'from-blue-500 to-blue-600'} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                        <method.icon className="h-6 w-6" />
                      </div>

                      {/* Label */}
                      <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                        {method.label}
                      </div>

                      {/* Value */}
                      {method.href !== "#" ? (
                        <a
                          href={method.href}
                          className="text-lg font-semibold text-gray-900 dark:text-white hover:text-gradient transition-all duration-300 break-all"
                        >
                          {method.value}
                        </a>
                      ) : (
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                          {method.value}
                        </div>
                      )}

                      {/* Decorative Corner */}
                      <div className={`absolute top-0 right-0 w-16 h-16 ${method.color} opacity-5 rounded-bl-full`} />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Enhanced Social Links */}
              <div className="pt-8">
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                  Connect with me on social media
                </h4>
                <div className="flex flex-wrap justify-center gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -5 }}
                      className="group relative"
                      aria-label={social.name}
                    >
                      <div className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${social.gradient} ${social.hoverGradient} flex items-center justify-center text-white transition-all duration-300 shadow-lg hover:shadow-xl`}>
                        <social.icon className="h-7 w-7 relative z-10 group-hover:scale-110 transition-transform" />
                      </div>
                      {/* Tooltip */}
                      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg bg-gray-900 dark:bg-gray-700 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {social.name}
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            {/* <motion.div variants={fadeInUp}>
              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.name
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 dark:border-gray-600 focus:border-brand-500 focus:ring-brand-500"
                      } bg-white dark:bg-surface-dark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-surface-dark transition-colors`}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.email
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 dark:border-gray-600 focus:border-brand-500 focus:ring-brand-500"
                      } bg-white dark:bg-surface-dark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-surface-dark transition-colors`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>


                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-surface-dark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-surface-dark transition-colors"
                    placeholder="What's this about?"
                  />
                </div>


                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.message
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 dark:border-gray-600 focus:border-brand-500 focus:ring-brand-500"
                    } bg-white dark:bg-surface-dark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-surface-dark transition-colors resize-vertical`}
                    placeholder="Tell me about your project or just say hello..."
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.message}
                    </p>
                  )}
                </div>


                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>


                {submitStatus === "success" && (
                  <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    Something went wrong. Please try again or contact me
                    directly.
                  </div>
                )}
              </form>
            </motion.div> */}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
