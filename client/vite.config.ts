import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Forward /api requests to the Express server during development,
    // so the client can call fetch('/api/...') without CORS issues.
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
})
