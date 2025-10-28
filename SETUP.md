# 快速启动指南

## 🔧 问题解决

如果遇到 `Cannot find module 'vite-plugin-update'` 错误，请按照以下步骤操作：

## 📝 步骤

### 1. 先构建插件

```bash
cd vite-plugin-update
pnpm install
pnpm run build
```

### 2. 使用 pnpm link 链接插件

在插件根目录运行：

```bash
cd vite-plugin-update
pnpm link --global
```

然后在每个示例项目中：

```bash
cd examples/vite-vue3
pnpm link --global vite-plugin-update
pnpm install
```

### 3. 或者使用 file: 协议（已配置）

在示例项目的 package.json 中已配置：

```json
{
  "devDependencies": {
    "vite-plugin-update": "^1.0.0"
  }
}
```

直接运行：

```bash
cd examples/vite-vue3
pnpm install
```

### 4. 测试示例

```bash
# 构建示例项目
cd examples/vite-vue3
pnpm run build

# 预览
pnpm run preview
```

## 🎯 为什么会报错？

1. **插件未构建**：`dist` 目录可能没有最新的代码
2. **依赖未安装**：示例项目的 `node_modules` 中没有插件
3. **路径问题**：Windows 路径中包含中文可能导致链接失败

## 💡 推荐做法

### 开发时

使用 `pnpm link` 方式：

```bash
# 1. 在插件目录
cd vite-plugin-update
pnpm link --global

# 2. 在示例项目
cd examples/vite-vue3
pnpm link --global vite-plugin-update
```

### 发布后

直接安装：

```bash
pnpm add vite-plugin-update
```

## 🚨 常见问题

### Q: 为什么使用 `file:../../` 还是不工作？

A: Windows 路径包含中文字符可能导致问题。建议使用 `pnpm link`。

### Q: 如何取消链接？

A: 在示例项目中运行：

```bash
pnpm unlink vite-plugin-update
```

### Q: 如何检查链接状态？

A: 运行：

```bash
pnpm list vite-plugin-update
```
