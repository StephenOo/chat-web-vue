import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    //vueDevTools(),
  ],
  resolve: {
    alias: {
      //'@': fileURLToPath(new URL('./src', import.meta.url)),
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // 设置本地启动的访问地址
    host: 'localhost',   // ip地址
    port: 9510, // 端口号
    open: true,          // 启动后是否自动打开浏览器
    // 配置代理
    proxy: {
      '^/dwc/api/sse/.*': {  // 拦截规则
        target: 'http://localhost:9500',   // 后端本地地址
        rewrite: (path) => path.replace(/^\/dwc\/api\/sse/, '')
      },
      '/dwc/api': {  // 拦截规则
        target: 'http://localhost:9500',   // 后端本地地址
        rewrite: (path) => path.replace(/^\/dwc\/api/, '')  // 重写路径，去除/dwc/api前缀
      },

    }
  }
})
