import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@components': path.resolve(import.meta.dirname, './src/components'),
      '@styles': path.resolve(import.meta.dirname, './src/styles'),
    },
  },
  server: {
    port: 3000,
    strictPort: true,
  },
})
