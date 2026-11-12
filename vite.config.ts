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
          if (req.url === '/' || req.url === '/index.html') {
            req.url = '/template.html';
          }
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
        const distTemplate = path.join(__dirname, 'dist/template.html');
        const distIndex = path.join(__dirname, 'dist/index.html');
        const dist404 = path.join(__dirname, 'dist/404.html');

        if (fs.existsSync(distTemplate)) {
          fs.copyFileSync(distTemplate, distIndex);
          fs.copyFileSync(distTemplate, dist404);
          try { fs.unlinkSync(distTemplate); } catch {}
        }

        // Copy source media assets into dist/assets
        const distAssets = path.join(__dirname, 'dist/assets');
        const srcAssets = path.join(__dirname, 'assets');
        if (fs.existsSync('dist') && fs.existsSync(srcAssets)) {
          fs.cpSync(srcAssets, distAssets, { recursive: true });
        }

        // Copy compiled bundle assets directly into root assets/
        if (fs.existsSync(distAssets)) {
          const files = fs.readdirSync(distAssets);
          for (const f of files) {
            const src = path.join(distAssets, f);
            const dst = path.join(srcAssets, f);
            if (fs.statSync(src).isFile() && (f.endsWith('.js') || f.endsWith('.css') || f.endsWith('.map'))) {
              fs.copyFileSync(src, dst);
            }
          }
        }

        // Sync root index.html and 404.html so GitHub Pages works directly from root (/)
        if (fs.existsSync(distIndex)) {
          fs.copyFileSync(distIndex, path.join(__dirname, 'index.html'));
          fs.copyFileSync(distIndex, path.join(__dirname, '404.html'));
        }

        // Ensure root .nojekyll exists
        fs.writeFileSync(path.join(__dirname, '.nojekyll'), '');

        // Sync docs/ directory so GitHub Pages also works directly from /docs
        const docsDir = path.join(__dirname, 'docs');
        if (!fs.existsSync(docsDir)) fs.mkdirSync(docsDir, { recursive: true });
        if (fs.existsSync('dist')) {
          fs.cpSync(path.join(__dirname, 'dist'), docsDir, { recursive: true });
          fs.writeFileSync(path.join(docsDir, '.nojekyll'), '');
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
      input: {
        main: path.resolve(__dirname, 'template.html'),
      },
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
