import React from 'react';
import { useToc, useActiveHeading } from '@/hooks/useToc';
import { useI18n } from '@/hooks/useI18n';

interface Props {
  content: string;
}

// 文章目录：仅在桌面端展示（窄屏由 CSS 隐藏）
export const Toc: React.FC<Props> = ({ content }) => {
  const items = useToc(content);
  const ids = items.map((i) => i.id);
  const active = useActiveHeading(ids);
  const { t } = useI18n();

  if (items.length < 2) return null;

  return (
    <nav
      className="toc-aside"
      style={{
        position: 'sticky',
        top: 88,
        fontSize: 13,
        lineHeight: 1.7,
        color: 'var(--fg-muted)',
        maxHeight: 'calc(100vh - 120px)',
        overflowY: 'auto',
      }}
    >
      <div
        style={{
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          fontSize: 11,
          fontWeight: 600,
          color: 'var(--fg-subtle)',
          marginBottom: 10,
        }}
      >
        {t.common.tableOfContents}
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((item) => (
          <li
            key={item.id}
            style={{
              paddingLeft: (item.level - 2) * 12,
              borderLeft: '2px solid',
              borderLeftColor: active === item.id ? 'var(--fg)' : 'transparent',
              transition: 'border-color 0.15s ease',
              margin: '2px 0',
            }}
          >
            <a
              href={`#${item.id}`}
              style={{
                display: 'block',
                padding: '2px 10px',
                color: active === item.id ? 'var(--fg)' : 'var(--fg-muted)',
                fontWeight: active === item.id ? 600 : 400,
                textDecoration: 'none',
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
