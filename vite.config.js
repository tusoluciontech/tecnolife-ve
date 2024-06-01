import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        pagina1: resolve(__dirname, 'pagina-1/index.html'),
        pagina2: resolve(__dirname, 'pagina-2/index.html'),
      },
    },
  },
})