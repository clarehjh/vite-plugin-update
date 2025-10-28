# vite-plugin-update

🚀 基于 [vite-plugin-pwa](https://github.com/vite-pwa/vite-plugin-pwa) 二次封装的友好版本更新提示插件

## ✨ 特性

- 🎨 **精美的 UI 设计** - 渐变背景，流畅动画，现代化设计
- 🔔 **智能更新检测** - 基于 Service Worker 的可靠更新机制
- ⚙️ **灵活配置** - 支持自定义提示文案、更新频率等
- 📦 **开箱即用** - 无需额外代码，自动注入更新逻辑
- 🎯 **框架无关** - 适用于 React、Vue、Vue3 等所有框架
- 📱 **PWA 支持** - 完整的 PWA 集成，支持离线使用

## 📦 安装

```bash
pnpm add vite-plugin-update
# 或
npm install vite-plugin-update
# 或
yarn add vite-plugin-update
```

## 🚀 快速开始

### 基础使用

在你的 `vite.config.ts` 中：

```typescript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VitePluginUpdate from 'vite-plugin-update';

export default defineConfig({
  plugins: [
    vue(),
    VitePluginUpdate({
      // 使用 PWA 的 Service Worker（推荐）
      usePWA: true,
      // 更新检查间隔（毫秒）
      checkInterval: 60000,
      // 自定义提示文案
      title: '🎉 发现新版本',
      description: '检测到应用有新版本可用，是否立即更新？',
      confirmText: '立即更新',
      cancelText: '稍后提醒',
    }),
  ],
});
```

### 不依赖 PWA 的版本

如果你不想使用 Service Worker，也可以使用简单的 ETag 检查：

```typescript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VitePluginUpdate from 'vite-plugin-update';

export default defineConfig({
  plugins: [
    vue(),
    VitePluginUpdate({
      // 不使用 PWA
      usePWA: false,
      // 其他配置...
    }),
  ],
});
```

## 📖 配置选项

### UpdatePromptOptions

| 选项             | 类型      | 默认值                                     | 说明                                |
| ---------------- | --------- | ------------------------------------------ | ----------------------------------- |
| `enable`         | `boolean` | `true`                                     | 是否启用更新提示                    |
| `checkInterval`  | `number`  | `60000`                                    | 检查更新的间隔时间（毫秒）          |
| `title`          | `string`  | `'🎉 发现新版本'`                          | 更新提示标题                        |
| `description`    | `string`  | `'检测到应用有新版本可用，是否立即更新？'` | 更新提示描述                        |
| `confirmText`    | `string`  | `'立即更新'`                               | 确认按钮文本                        |
| `cancelText`     | `string`  | `'稍后提醒'`                               | 取消按钮文本                        |
| `onlyProduction` | `boolean` | `true`                                     | 只在生产环境启用                    |
| `usePWA`         | `boolean` | `true`                                     | 使用 PWA 的 Service Worker 更新机制 |
| `pwaOptions`     | `object`  | `{}`                                       | PWA 配置选项                        |

### PWA 配置选项

当 `usePWA: true` 时，可以传入 PWA 相关配置：

```typescript
VitePluginUpdate({
  usePWA: true,
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
});
```

## 🎨 UI 预览

插件会自动注入一个精美的更新提示 UI，包含：

- 渐变背景色（紫色系）
- 流畅的滑入动画
- 响应式设计
- 现代化的按钮样式

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

## 🔧 工作原理

### PWA 模式（推荐）

1. 插件会自动配置 `vite-plugin-pwa`
2. 使用 Service Worker 检测更新
3. 当有新版本时，显示更新提示
4. 用户点击更新后，刷新页面获取新版本

### 简单模式

1. 使用 ETag 检查文件变化
2. 定期检查 `/index.html` 的 ETag
3. 发现变化时显示更新提示
4. 刷新页面获取新版本

## 📄 许可证

MIT

## 🙏 致谢

- [vite-plugin-pwa](https://github.com/vite-pwa/vite-plugin-pwa) - 强大的 PWA 插件
- [Workbox](https://developers.google.com/web/tools/workbox) - Google 的 PWA 工具库

## 🤝 贡献

欢迎提交 Issue 和 PR！

---

Made with ❤️ by [clarehjh](https://github.com/clarehjh)
