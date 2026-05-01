import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './',
  plugins: [vue(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.keqing.web.id',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
