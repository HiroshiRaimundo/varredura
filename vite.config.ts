import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "localhost",
    port: 3000,
    strictPort: true
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      external: ['workers'],
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('scheduler')) {
              return 'vendor-react';
            }
            if (id.includes('@radix-ui')) {
              return 'vendor-ui';
            }
            if (id.includes('@nivo')) {
              return 'vendor-charts';
            }
            if (id.includes('@tiptap')) {
              return 'vendor-editor';
            }
            if (id.includes('date-fns') || 
                id.includes('zod') || 
                id.includes('@hookform') || 
                id.includes('clsx') || 
                id.includes('class-variance-authority') || 
                id.includes('tailwind-merge')) {
              return 'vendor-utils';
            }
            return 'vendor';
          }
        }
      }
    },
    target: 'esnext',
    sourcemap: true,
    chunkSizeWarningLimit: 500
  },
  worker: {
    format: 'es',
    plugins: () => []
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@nivo/core',
      '@nivo/geo',
      '@nivo/line',
      '@nivo/bar',
      '@nivo/pie'
    ]
  }
}));
