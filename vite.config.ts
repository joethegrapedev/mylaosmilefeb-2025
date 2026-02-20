import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.jpg', '**/*.JPG', '**/*.jpeg', '**/*.png', '**/*.svg'],
  build: {
    outDir: 'build', // Ensure the output directory matches your deployment settings
  },
});
