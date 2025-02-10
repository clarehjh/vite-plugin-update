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
