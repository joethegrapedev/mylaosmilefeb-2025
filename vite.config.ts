import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.JPG', '**/*.jpeg', '**/*.png', '**/*.svg'],
  build: {
    outDir: 'build',
    target: 'esnext',
    minify: 'esbuild',
  },
  esbuild: {
    target: 'esnext',
  },
});
