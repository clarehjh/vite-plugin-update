import type { PluginOption, ViteDevServer } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { updatePromptStyles, createUpdatePrompt } from './checkUpdate';

export interface UpdatePromptOptions {
  /**
   * 是否启用更新提示
   * @default true
   */
  enable?: boolean;

  /**
   * 检查更新的间隔时间（毫秒）
   * @default 60000
   */
  checkInterval?: number;

  /**
   * 更新提示标题
   * @default '🎉 发现新版本'
   */
  title?: string;

  /**
   * 更新提示描述
   * @default '检测到应用有新版本可用，是否立即更新？'
   */
  description?: string;

  /**
   * 确认按钮文本
   * @default '立即更新'
   */
  confirmText?: string;

  /**
   * 取消按钮文本
   * @default '稍后提醒'
   */
  cancelText?: string;

  /**
   * 只在生产环境启用
   * @default true
   */
  onlyProduction?: boolean;

  /**
   * 使用 PWA 的 Service Worker 更新机制
   * @default true
   */
  usePWA?: boolean;

  /**
   * PWA 配置选项
   */
  pwaOptions?: {
    /**
     * Service Worker 策略
     * @default 'generateSW'
     */
    strategy?: 'generateSW' | 'injectManifest';

    /**
     * 是否注册 Service Worker
     * @default true
     */
    registerType?: 'prompt' | 'autoUpdate';

    /**
     * Workbox 选项
     */
    workbox?: any;
  };
}

/**
 * 生成更新检查脚本
 */
const generateUpdateScript = (
  options: Required<Omit<UpdatePromptOptions, 'pwaOptions'>> & {
    pwaOptions: UpdatePromptOptions['pwaOptions'];
  },
) => {
  const usePWA = options.usePWA;

  if (usePWA) {
    // 使用 PWA 的更新机制
    return `
<script>
(function() {
  if (typeof window === 'undefined') return;
  
  // 注入样式
  const style = document.createElement('style');
  style.textContent = ${JSON.stringify(updatePromptStyles)};
  document.head.appendChild(style);
  
  // 注册 Service Worker（仅在浏览器环境）
  if ('serviceWorker' in navigator) {
    let updateAvailable = false;
    let swRegistration = null;
    
    async function registerSW() {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
        swRegistration = registration;
        
        // 检查是否有更新的 Service Worker 等待
        if (registration.waiting) {
          showUpdatePrompt();
        }
        
        // 监听新的 Service Worker 安装
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                showUpdatePrompt();
              }
            });
          }
        });
        
        // 监听 Service Worker 控制权变化
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          window.location.reload();
        });
      } catch (error) {
        console.error('Service Worker 注册失败:', error);
      }
    }
    
    async function showUpdatePrompt() {
      if (updateAvailable) return;
      updateAvailable = true;
      
      // 移除现有的提示
      const existing = document.querySelector('.app-update-prompt');
      if (existing) return;
      
      const prompt = ${createUpdatePrompt.toString()};
      const element = prompt(
        () => {
          // 触发更新
          if (swRegistration && swRegistration.waiting) {
            swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
            setTimeout(() => window.location.reload(), 100);
          }
        },
        () => {
          updateAvailable = false;
        },
        {
          title: ${JSON.stringify(options.title)},
          description: ${JSON.stringify(options.description)},
          confirmText: ${JSON.stringify(options.confirmText)},
          cancelText: ${JSON.stringify(options.cancelText)}
        }
      );
      document.body.appendChild(element);
    }
    
    // 延迟注册，确保页面加载完成
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', registerSW);
    } else {
      registerSW();
    }
  }
})();
</script>
`;
  } else {
    // 使用简单的 ETag 检查
    return `
<script>
(function() {
  if (typeof window === 'undefined') return;
  
  // 注入样式
  const style = document.createElement('style');
  style.textContent = ${JSON.stringify(updatePromptStyles)};
  document.head.appendChild(style);
  
  let updateAvailable = false;
  
  async function checkForUpdate() {
    try {
      const response = await fetch('/index.html?_=' + Date.now(), {
        method: 'HEAD',
        cache: 'no-store'
      });
      const newEtag = response.headers.get('ETag');
      const storedEtag = localStorage.getItem('app-update-etag') || '';
      
      if (newEtag && newEtag !== storedEtag && storedEtag !== '') {
        // 发现新版本
        localStorage.setItem('app-update-etag', newEtag);
        showUpdatePrompt();
      } else if (!storedEtag && newEtag) {
        // 首次加载，保存 ETag
        localStorage.setItem('app-update-etag', newEtag);
      }
    } catch (error) {
      console.error('更新检查失败:', error);
    }
  }
  
  function showUpdatePrompt() {
    if (updateAvailable) return;
    updateAvailable = true;
    
    const prompt = ${createUpdatePrompt.toString()};
    const element = prompt(
      () => {
        window.location.reload();
      },
      () => {
        updateAvailable = false;
      },
      {
        title: ${JSON.stringify(options.title)},
        description: ${JSON.stringify(options.description)},
        confirmText: ${JSON.stringify(options.confirmText)},
        cancelText: ${JSON.stringify(options.cancelText)}
      }
    );
    document.body.appendChild(element);
  }
  
  // 延迟启动检查
  setTimeout(() => {
    checkForUpdate();
    setInterval(checkForUpdate, ${options.checkInterval});
  }, 3000);
})();
</script>
`;
  }
};

/**
 * Vite 版本更新提示插件
 */
export default function vitePluginUpdate(
  options: UpdatePromptOptions = {},
): PluginOption[] {
  const {
    enable = true,
    checkInterval = 60000,
    title = '🎉 发现新版本',
    description = '检测到应用有新版本可用，是否立即更新？',
    confirmText = '立即更新',
    cancelText = '稍后提醒',
    onlyProduction = true,
    usePWA = true,
    pwaOptions = {},
  } = options;

  const opts = {
    enable,
    checkInterval,
    title,
    description,
    confirmText,
    cancelText,
    onlyProduction,
    usePWA,
    pwaOptions,
  };

  const plugins: PluginOption[] = [];

  // 根据配置决定是否添加 PWA 插件
  if (usePWA && enable) {
    plugins.push(
      VitePWA({
        registerType: pwaOptions.registerType || 'prompt',
        strategies: pwaOptions.strategy || 'generateSW',
        workbox: {
          cleanupOutdatedCaches: true,
          ...pwaOptions.workbox,
        },
      }),
    );
  }

  // 添加更新检查插件
  if (enable) {
    plugins.push({
      name: 'vite-plugin-update-prompt',
      enforce: 'post',
      apply(config, { command }) {
        // 如果设置了 onlyProduction，只在 build 时应用
        if (onlyProduction && command === 'serve') {
          return false;
        }
        return true;
      },
      transformIndexHtml(html) {
        const scripts = generateUpdateScript(opts);
        return html.replace('</body>', `${scripts}</body>`);
      },
    });
  }

  return plugins;
}
