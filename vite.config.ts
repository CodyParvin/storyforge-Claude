
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Development server configuration
  server: {
    host: "::",
    port: 8080,
  },
  
  // Plugins configuration
  plugins: [
    react(),
    // Only add component tagger in development mode
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  
  // Path resolution aliases
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
  // Build configuration optimized for different environments
  build: {
    // Use esbuild for faster builds instead of terser
    minify: mode === 'production' ? 'esbuild' : false,
    sourcemap: mode !== 'production',
    
    // Rollup configuration for code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for React ecosystem
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // UI chunk for component libraries
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-toast', 'lucide-react'],
        },
      },
    },
    
    // Increase chunk size warning threshold for better DX
    chunkSizeWarningLimit: 1000,
  },
  
  // Environment variable definitions
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
  },
}));
