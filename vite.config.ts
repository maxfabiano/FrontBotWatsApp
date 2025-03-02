import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { BootstrapVueNextResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [BootstrapVueNextResolver()],
    }),
  ],
  base: "/", // Certifique-se de que a base está correta
  build: {
    outDir: 'dist',
    emptyOutDir: true, // Garante que a pasta dist seja limpa antes do build
    rollupOptions: {
      input: 'index.html' // ⬅️ Garante que o index.html seja incluído
    }
  }
})
