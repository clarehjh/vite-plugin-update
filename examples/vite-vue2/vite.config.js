import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
import VitePluginUpdate from 'vite-plugin-update';

export default defineConfig({
  plugins: [
    createVuePlugin(),
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
});
