import React from 'react';
import { useI18n } from '@/hooks/useI18n';
import type { ArticleTocItem } from '@/hooks/useArticleToc';
import './PostToc.css';

interface PostTocProps {
  items: ArticleTocItem[];
  activeId: string;
  variant?: 'aside' | 'mobile';
}

const MIN_TOC_ITEMS = 2;

// 文章目录：桌面端为 sticky 侧栏，移动端为折叠目录；链接使用标准 hash 锚点
export const PostToc: React.FC<PostTocProps> = ({ items, activeId, variant = 'aside' }) => {
  const { t } = useI18n();

  if (items.length < MIN_TOC_ITEMS) return null;

  const list = (
    <nav className={`post-toc post-toc--${variant}`} aria-label={t.common.tableOfContents}>
      {variant === 'aside' && <div className="post-toc-title">{t.common.tableOfContents}</div>}
      <ul className="post-toc-list">
        {items.map((item) => {
          const isActive = activeId === item.id;

          return (
            <li
              key={item.id}
              className={`post-toc-item post-toc-item--level-${item.level}${
                isActive ? ' post-toc-item--active' : ''
              }`}
            >
              <a
                href={`#${encodeURIComponent(item.id)}`}
                className="post-toc-link"
                aria-current={isActive ? 'location' : undefined}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  if (variant === 'mobile') {
    return (
      <details className="post-toc-mobile-panel">
        <summary>{t.common.tableOfContents}</summary>
        {list}
      </details>
    );
  }

  return list;
};
