import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/test_react_alfa/', // Важно для GitHub Pages!
  build: {
    outDir: 'dist',
    sourcemap: false,
  }
})