import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { Container } from '../components/common/Container';

export function NotFound() {
  const goHome = () => {
    window.location.href = '/';
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      <Helmet>
        <title>404 - Page Not Found</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-background-dark flex items-center justify-center">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* 404 Animation */}
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              className="mb-8"
            >
              <span className="text-9xl font-bold text-transparent bg-gradient-to-r from-brand-500 to-purple-600 bg-clip-text">
                404
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Oops! Page Not Found
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto"
            >
              The page you're looking for doesn't exist or has been moved.
              Let's get you back on track!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                onClick={goHome}
                className="btn-primary inline-flex items-center"
              >
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </button>
              
              <button
                onClick={goBack}
                className="btn-secondary inline-flex items-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </button>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-40 -right-80 w-80 h-80 bg-brand-500/5 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-40 -left-80 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
            </div>
          </motion.div>
        </Container>
      </div>
    </>
  );
}
