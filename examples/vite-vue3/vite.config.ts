import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VitePluginUpdate from 'vite-plugin-update';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    vue(),
    VitePluginUpdate({
      enable: true,
      usePWA: true,
      checkInterval: 60000, // 每 60 秒检查一次
      title: '🎉 发现新版本',
      description: '检测到应用有新版本可用，是否立即更新？',
      confirmText: '立即更新',
      cancelText: '稍后提醒',
      pwaOptions: {
        registerType: 'prompt',
        strategy: 'generateSW',
        workbox: {
          cleanupOutdatedCaches: true,
          skipWaiting: false,
          clientsClaim: true,
        },
      },
    }),
  ],
  server: {
    port: 8080,
    hmr: {
      host: 'localhost',
      port: 8080,
    },
    proxy: {
      '/api': {
        target: 'your https address',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ''),
      },
    },
  },
});
