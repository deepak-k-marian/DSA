import { existsSync, readFileSync } from 'node:fs';
import { extname, resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repositoryRoot = resolve(import.meta.dirname, '..');
const servedDirectories = new Set(['notes', 'assets', 'problems']);
const contentTypes: Record<string, string> = {
  '.css': 'text/css',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.md': 'text/markdown',
  '.png': 'image/png',
  '.py': 'text/plain',
  '.svg': 'image/svg+xml',
};

export default defineConfig({
  base: './',
  plugins: [
    react(),
    {
      name: 'serve-repository-content',
      configureServer(server) {
        server.middlewares.use((request, response, next) => {
          const requestPath = decodeURIComponent((request.url ?? '').split('?')[0]);
          const [directory, ...parts] = requestPath.split('/').filter(Boolean);
          if (!directory || !servedDirectories.has(directory)) {
            next();
            return;
          }

          const filePath = resolve(repositoryRoot, directory, ...parts);
          const directoryRoot = resolve(repositoryRoot, directory);
          if (!filePath.startsWith(`${directoryRoot}/`) || !existsSync(filePath)) {
            next();
            return;
          }

          response.statusCode = 200;
          response.setHeader('Content-Type', contentTypes[extname(filePath)] ?? 'application/octet-stream');
          response.end(readFileSync(filePath));
        });
      },
    },
  ],
});
