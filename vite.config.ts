import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-assets',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && req.url.startsWith('/assets/')) {
            const assetPath = path.join(__dirname, req.url.split('?')[0]);
            if (fs.existsSync(assetPath) && fs.statSync(assetPath).isFile()) {
              const ext = path.extname(assetPath).toLowerCase();
              const mimes: Record<string, string> = {
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.png': 'image/png',
                '.svg': 'image/svg+xml',
                '.mp3': 'audio/mpeg',
                '.mp4': 'video/mp4',
              };
              res.setHeader('Content-Type', mimes[ext] || 'application/octet-stream');
              return fs.createReadStream(assetPath).pipe(res);
            }
          }
          next();
        });
      },
      closeBundle() {
        // Copy assets to dist/assets on build
        const distAssets = path.join(__dirname, 'dist/assets');
        const srcAssets = path.join(__dirname, 'assets');
        if (fs.existsSync('dist') && fs.existsSync(srcAssets)) {
          fs.cpSync(srcAssets, distAssets, { recursive: true });
        }
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion', 'gsap'],
          'vendor-media': ['swiper', 'yet-another-react-lightbox'],
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },
  server: {
    port: 5173,
    host: true
  }
});
