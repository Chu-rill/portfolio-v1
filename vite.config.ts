import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { blogPreviews } from './vite-plugins/blogPreviews'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), blogPreviews()],
  build: {
    rollupOptions: {
      output: {
        // Split rarely-changing libraries into their own chunks so a content
        // update doesn't force visitors to re-download React and Framer Motion.
        manualChunks: {
          react: ['react', 'react-dom', 'react-dom/client', 'react-router-dom', 'react-helmet-async'],
          motion: ['framer-motion'],
        },
      },
    },
  },
})
