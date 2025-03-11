import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // We've replaced Lucide icons with custom SVG components
    include: [],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Custom chunks for better performance
          'react-vendor': ['react', 'react-dom', 'framer-motion'],
        },
      },
    },
  },
  server: {
    // Add headers to avoid CORS and ad blocker issues
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-store',
    },
  },
});
