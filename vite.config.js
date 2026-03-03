

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import analyzer from 'vite-bundle-analyzer'

export default defineConfig({
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
    minify: 'esbuild',
    cssMinify: true,
      terserOptions:{compress:false,mangle:false},

  },
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
    analyzer(),
  ],
})