import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// 处理直接打开 /posts/x#heading 的场景：React 渲染出标题后再补一次滚动
export const useInitialHeadingScroll = (contentKey: string): void => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    let headingId = location.hash.slice(1);
    try {
      headingId = decodeURIComponent(headingId);
    } catch {
      // 非法编码的 hash 直接按原文尝试，避免整页因为锚点解析失败报错
    }
    if (!headingId) return;

    const frame = window.requestAnimationFrame(() => {
      const heading = document.getElementById(headingId);
      heading?.scrollIntoView({ block: 'start' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [contentKey, location.hash]);
};
