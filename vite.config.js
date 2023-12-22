import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 3000
  },
  base: '/',
  plugins: [svgr({ include: "**/*.svg" }), react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
    testTimeout: 20000,
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
});
