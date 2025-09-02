import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
    // Optimizaciones para SEO y rendimiento
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['react-icons']
        }
      }
    },
    // Minificación agresiva
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // Generar source maps para debugging
    sourcemap: false,
    // Optimizar assets
    assetsInlineLimit: 4096,
    // Chunk size warnings
    chunkSizeWarningLimit: 1000
  },
  // Optimizaciones de desarrollo
  server: {
    port: 3000,
    open: true
  },
  // Preload de módulos críticos
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-icons', 'react-router-dom']
  },
  // Configuración para SPA routing
  preview: {
    port: 3000
  }
})
