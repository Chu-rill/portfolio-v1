import { motion } from "framer-motion";
import { Award, ExternalLink, Calendar, CheckCircle2 } from "lucide-react";
import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import type { Certification } from "../../types";

interface CertificationsSectionProps {
  certifications: Certification[];
}

export function CertificationsSection({
  certifications,
}: CertificationsSectionProps) {
  const featuredCerts = certifications.filter((cert) => cert.featured);
  const otherCerts = certifications.filter((cert) => !cert.featured);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const isExpired = (expiryDate?: string) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  const CertificationCard = ({
    cert,
    featured,
    index,
  }: {
    cert: Certification;
    featured: boolean;
    index: number;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative overflow-hidden rounded-2xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 hover:border-brand-400 dark:hover:border-brand-500 transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/10 ${
        featured ? "md:col-span-2 lg:col-span-1" : ""
      }`}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 text-white text-xs font-semibold shadow-lg">
            <Award className="w-3 h-3" />
            <span>Featured</span>
          </div>
        </div>
      )}

      {/* Expired Badge */}
      {isExpired(cert.expiryDate) && (
        <div className="absolute top-4 left-4 z-10">
          <div className="px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-semibold">
            Expired
          </div>
        </div>
      )}

      <div className="p-6 md:p-8">
        {/* Logo & Header */}
        <div className="flex items-start gap-4 mb-4">
          {cert.logo && (
            <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gray-100 dark:bg-gray-800/50 p-3 flex items-center justify-center overflow-hidden">
              <img
                src={cert.logo}
                alt={cert.issuer}
                className="w-full h-full object-contain"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 line-clamp-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
              {cert.name}
            </h3>
            <p className="text-brand-600 dark:text-brand-400 font-medium text-sm">
              {cert.issuer}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {cert.description}
        </p>

        {/* Date & Status */}
        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>Issued {formatDate(cert.issueDate)}</span>
          </div>
          {cert.expiryDate && !isExpired(cert.expiryDate) && (
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Valid until {formatDate(cert.expiryDate)}</span>
            </div>
          )}
          {!cert.expiryDate && (
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-500">
              <CheckCircle2 className="w-4 h-4" />
              <span>No expiry</span>
            </div>
          )}
        </div>

        {/* Skills Tags */}
        {cert.skills && cert.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {cert.skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Credential Link */}
        {cert.credentialUrl && (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 text-white font-medium text-sm hover:from-brand-600 hover:to-brand-700 transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/30 group/btn"
          >
            <span>View Credential</span>
            <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </a>
        )}

        {/* Credential ID */}
        {cert.credentialId && (
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-500 font-mono">
            ID: {cert.credentialId}
          </p>
        )}
      </div>

      {/* Hover Effect Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-500/0 via-brand-400/0 to-brand-600/0 group-hover:from-brand-500/5 group-hover:via-brand-400/5 group-hover:to-brand-600/5 transition-all duration-500 pointer-events-none" />
    </motion.div>
  );

  return (
    <section
      id="certifications"
      className="py-20 md:py-32 bg-gray-50 dark:bg-background-dark relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-600/5 rounded-full blur-3xl" />
      </div>

      <Container>
        <SectionHeader
          title="Certifications & Credentials"
          subtitle="Professional certifications and achievements that validate my expertise"
          center
        />

        {/* Featured Certifications */}
        {featuredCerts.length > 0 && (
          <div className="mb-12">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2"
            >
              <Award className="w-6 h-6 text-brand-500" />
              Featured Certifications
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCerts.map((cert, index) => (
                <CertificationCard
                  key={cert.id}
                  cert={cert}
                  featured={true}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}

        {/* Other Certifications */}
        {otherCerts.length > 0 && (
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Additional Certifications
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherCerts.map((cert, index) => (
                <CertificationCard
                  key={cert.id}
                  cert={cert}
                  featured={false}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {certifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center py-16"
          >
            <Award className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-500 text-lg">
              Certifications coming soon...
            </p>
          </motion.div>
        )}
      </Container>
    </section>
  );
}
