/**
 * 更新提示 UI 样式
 */
export const updatePromptStyles = `
.app-update-prompt {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 999999;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px 24px;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  max-width: 420px;
  animation: slideInDown 0.3s ease-out;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

@keyframes slideInDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.app-update-prompt__icon {
  width: 24px;
  height: 24px;
  margin-bottom: 12px;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.app-update-prompt__title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.app-update-prompt__content {
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 16px 0;
  opacity: 0.95;
}

.app-update-prompt__actions {
  display: flex;
  gap: 8px;
}

.app-update-prompt__button {
  flex: 1;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.app-update-prompt__button--primary {
  background: white;
  color: #667eea;
}

.app-update-prompt__button--primary:hover {
  background: #f8f9fa;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
}

.app-update-prompt__button--secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  backdrop-filter: blur(10px);
}

.app-update-prompt__button--secondary:hover {
  background: rgba(255, 255, 255, 0.3);
}

.app-update-prompt__button:active {
  transform: translateY(0);
}
`;

/**
 * 创建更新提示 UI
 */
export const createUpdatePrompt = (
  onUpdate: () => void,
  onDismiss: () => void,
  options: {
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
  } = {},
) => {
  const {
    title = '🎉 发现新版本',
    description = '检测到应用有新版本可用，是否立即更新？',
    confirmText = '立即更新',
    cancelText = '稍后提醒',
  } = options;

  const prompt = document.createElement('div');
  prompt.className = 'app-update-prompt';
  prompt.innerHTML = `
    <div class="app-update-prompt__title">
      ${title}
    </div>
    <div class="app-update-prompt__content">
      ${description}
    </div>
    <div class="app-update-prompt__actions">
      <button class="app-update-prompt__button app-update-prompt__button--secondary" data-action="cancel">
        ${cancelText}
      </button>
      <button class="app-update-prompt__button app-update-prompt__button--primary" data-action="update">
        ${confirmText}
      </button>
    </div>
  `;

  // 添加事件监听
  const updateBtn = prompt.querySelector('[data-action="update"]');
  const cancelBtn = prompt.querySelector('[data-action="cancel"]');

  updateBtn?.addEventListener('click', () => {
    prompt.style.animation = 'slideInDown 0.3s ease-out reverse';
    setTimeout(() => {
      document.body.removeChild(prompt);
      onUpdate();
    }, 300);
  });

  cancelBtn?.addEventListener('click', () => {
    prompt.style.animation = 'slideInDown 0.3s ease-out reverse';
    setTimeout(() => {
      document.body.removeChild(prompt);
      onDismiss();
    }, 300);
  });

  return prompt;
};

/**
 * 检查更新
 */
export const checkForUpdate = async (): Promise<boolean> => {
  try {
    const response = await fetch(`/index.html?_=${Date.now()}`, {
      method: 'HEAD',
      cache: 'no-store',
    });
    const newEtag = response.headers.get('ETag');
    const storedEtag = localStorage.getItem('etag') || '';

    if (newEtag && newEtag !== storedEtag) {
      localStorage.setItem('etag', newEtag);
      return true;
    }
    return false;
  } catch (error) {
    console.error('⚠️ 更新检查失败:', error);
    return false;
  }
};
