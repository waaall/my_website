import { useEffect, useMemo, useState } from 'react';

// 滚动监听：根据当前视口顶部附近的标题，计算 TOC 高亮项
export const useActiveHeading = (ids: readonly string[]): string => {
  const [active, setActive] = useState('');
  const idSignature = useMemo(() => ids.join('\u0000'), [ids]);

  useEffect(() => {
    if (!idSignature) {
      return;
    }

    const headingIds = idSignature.split('\u0000');
    const elements = headingIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!elements.length) {
      return;
    }

    // 初始默认高亮第一个标题；放进 rAF，避免 effect 同步 setState 造成级联渲染
    const initialFrame = window.requestAnimationFrame(() => {
      setActive((current) => (headingIds.includes(current) ? current : elements[0].id));
    });

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]?.target.id) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: '-72px 0px -70% 0px', threshold: [0, 1] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => {
      window.cancelAnimationFrame(initialFrame);
      observer.disconnect();
    };
  }, [idSignature]);

  return active;
};
