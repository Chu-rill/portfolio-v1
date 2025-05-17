import React, { useState } from "react";
import { Send } from "lucide-react";
import SocialLinks from "./SocialLinks";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });

      // Reset the success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Get In Touch
        </h2>

        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Contact Information
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Feel free to reach out if you're looking for a developer, have a
                question, or just want to connect.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <span className="text-blue-600 dark:text-blue-400 font-medium w-24">
                    Email:
                  </span>
                  <a
                    href="mailto:contact@chukwunonsoprosper.live"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    churchilldaniel687@gmail.com
                  </a>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-600 dark:text-blue-400 font-medium w-24">
                    Location:
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Abuja, Nigeria
                  </span>
                </div>
              </div>
              <div className="mb-8">
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Connect with me:
                </h4>
                <SocialLinks />
              </div>
            </div>
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-all duration-300 text-lg font-medium disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <Send size={18} className="mr-2" /> Send Message
                    </>
                  )}
                </button>
                {submitted && (
                  <div className="mt-4 p-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg">
                    Your message has been sent successfully!
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
