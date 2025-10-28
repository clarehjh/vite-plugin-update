# vite-plugin-update 使用指南

## 🎯 功能概述

这是一个基于 `vite-plugin-pwa` 二次封装的版本更新提示插件，提供了精美的 UI 界面和友好的用户体验。

## 🚀 核心特性

### 1. 美观的 UI 设计

- 渐变紫色背景
- 流畅的滑入动画
- 现代化按钮设计
- 响应式布局

### 2. 智能更新检测

- 基于 Service Worker 的可靠更新机制
- 自动检查新版本
- 提示用户更新

### 3. 灵活配置

- 自定义提示文案
- 可配置更新检查频率
- 支持 PWA 和简单模式

## 📦 安装

```bash
pnpm add vite-plugin-update
```

## 🎨 使用方式

### 基础配置

```typescript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VitePluginUpdate from 'vite-plugin-update';

export default defineConfig({
  plugins: [vue(), VitePluginUpdate()],
});
```

### 完整配置示例

```typescript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VitePluginUpdate from 'vite-plugin-update';

export default defineConfig({
  plugins: [
    vue(),
    VitePluginUpdate({
      // 启用插件
      enable: true,

      // 使用 PWA 的 Service Worker（推荐）
      usePWA: true,

      // 检查更新的间隔时间（毫秒）
      checkInterval: 60000, // 每 60 秒检查一次

      // 只在生产环境启用
      onlyProduction: true,

      // 自定义提示文案
      title: '🎉 发现新版本',
      description: '检测到应用有新版本可用，是否立即更新？',
      confirmText: '立即更新',
      cancelText: '稍后提醒',

      // PWA 配置
      pwaOptions: {
        // Service Worker 注册类型
        registerType: 'prompt', // 或 'autoUpdate'

        // Service Worker 策略
        strategy: 'generateSW', // 或 'injectManifest'

        // Workbox 配置
        workbox: {
          cleanupOutdatedCaches: true,
          skipWaiting: false,
          clientsClaim: true,
        },
      },
    }),
  ],
});
```

## 🎭 两种模式

### 1. PWA 模式（推荐）

使用 Service Worker 检测更新，更加可靠：

```typescript
VitePluginUpdate({
  usePWA: true,
  pwaOptions: {
    registerType: 'prompt',
    strategy: 'generateSW',
  },
});
```

**优点：**

- 可靠的更新检测
- 支持离线功能
- 更好的缓存管理
- 完整的 PWA 体验

### 2. 简单模式

使用 ETag 检查文件变化：

```typescript
VitePluginUpdate({
  usePWA: false,
  checkInterval: 60000,
});
```

**优点：**

- 不依赖 Service Worker
- 配置简单
- 快速部署

## 🎨 UI 自定义

插件会自动注入样式，你可以通过 CSS 变量来自定义：

```css
:root {
  /* 提示卡片背景 */
  --update-prompt-background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  /* 主要按钮颜色 */
  --update-prompt-button-primary: white;
  --update-prompt-button-primary-hover: #f8f9fa;

  /* 次要按钮颜色 */
  --update-prompt-button-secondary: rgba(255, 255, 255, 0.2);
}
```

## 📋 配置选项详解

| 选项             | 类型      | 默认值            | 说明                 |
| ---------------- | --------- | ----------------- | -------------------- |
| `enable`         | `boolean` | `true`            | 是否启用插件         |
| `usePWA`         | `boolean` | `true`            | 是否使用 PWA 模式    |
| `checkInterval`  | `number`  | `60000`           | 更新检查间隔（毫秒） |
| `title`          | `string`  | `'🎉 发现新版本'` | 提示标题             |
| `description`    | `string`  | `'检测到...'`     | 提示描述             |
| `confirmText`    | `string`  | `'立即更新'`      | 确认按钮文本         |
| `cancelText`     | `string`  | `'稍后提醒'`      | 取消按钮文本         |
| `onlyProduction` | `boolean` | `true`            | 只在生产环境启用     |
| `pwaOptions`     | `object`  | `{}`              | PWA 配置选项         |

## 🔧 工作原理

### PWA 模式流程

1. **构建时**：插件会配置 `vite-plugin-pwa`，生成 Service Worker
2. **运行时**：自动注册 Service Worker
3. **检测更新**：Service Worker 检测到新版本时触发回调
4. **显示提示**：弹出更新提示 UI
5. **用户操作**：用户点击更新后刷新页面

### 简单模式流程

1. **运行时**：定期请求 `/index.html`
2. **比较 ETag**：对比本地存储的 ETag
3. **检测变化**：ETag 不一致时触发更新
4. **显示提示**：弹出更新提示 UI
5. **用户操作**：用户点击更新后刷新页面

## 📝 测试

### 本地测试

1. 构建项目：

   ```bash
   cd examples/vite-vue3
   pnpm install
   pnpm run build
   ```

2. 预览：

   ```bash
   pnpm run preview
   ```

3. 修改代码重新构建：

   ```bash
   # 修改一些代码
   pnpm run build
   ```

4. 刷新页面，你应该看到更新提示

## 🚨 注意事项

1. **Service Worker 注册**：确保应用运行在 HTTPS 或 localhost 上
2. **浏览器兼容性**：需要支持 Service Worker 的浏览器
3. **更新时机**：建议在用户空闲时提示更新
4. **缓存策略**：合理配置 Workbox 的缓存策略

## 📚 更多资源

- [vite-plugin-pwa 文档](https://vite-pwa-org.netlify.app/)
- [Workbox 文档](https://developers.google.com/web/tools/workbox)
- [PWA 最佳实践](https://web.dev/progressive-web-apps/)

## 🤝 贡献

欢迎提交 Issue 和 PR！

## 📄 许可证

MIT
