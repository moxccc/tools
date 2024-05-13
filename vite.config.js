import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  build: {
    sourcemap: false, // 输出.map文件,默认是false
    rollupOptions: {
      output: {
        chunkFileNames: `static/js/[name].[hash]${new Date().getTime()}.js`,
        entryFileNames: `static/js/[name].[hash]${new Date().getTime()}.js`,
        assetFileNames: `static/[ext]/[name].[hash]${new Date().getTime()}.[ext]`,
      },
    }
  },
})
