import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

export default defineConfig({
  base: './',
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
        // Create 404.html in dist for GitHub Pages SPA routing fallback
        const distIndex = path.join(__dirname, 'dist/index.html');
        const dist404 = path.join(__dirname, 'dist/404.html');
        if (fs.existsSync(distIndex)) {
          fs.copyFileSync(distIndex, dist404);
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
