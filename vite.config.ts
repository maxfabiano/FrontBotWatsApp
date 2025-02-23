// vite.config.js/ts
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import {BootstrapVueNextResolver} from 'bootstrap-vue-next'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [BootstrapVueNextResolver()],
    }),
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'src/main.ts' // Certifique-se de que este caminho está correto
    }
  }
})