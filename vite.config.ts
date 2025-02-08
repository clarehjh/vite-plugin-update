import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VitePluginUpdate from "./src/index";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePluginUpdate({
      enable: true,
      message: "Version Update Plugin Activated!",
      debounceTime: 1000, // 设置防抖时间为 1 秒
    }),
  ],
});
