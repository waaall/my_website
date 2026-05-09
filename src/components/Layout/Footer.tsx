import React from 'react';
import { siteConfig } from '@/config/site';
import { useI18n } from '@/hooks/useI18n';
import { Container } from './Container';

export const Footer: React.FC = () => {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  // BrowserRouter 下资源链接必须基于 Vite base，避免在 /zh/posts/x 内被解析为相对路径
  const rssHref = `${import.meta.env.BASE_URL}rss.xml`;

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-subtle)',
        marginTop: 80,
        padding: '32px 0',
        color: 'var(--fg-muted)',
        fontSize: 14,
      }}
    >
      <Container width="wide">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>
            © {year} {siteConfig.author}
          </span>
          <span style={{ display: 'flex', gap: 16 }}>
            <a href={rssHref} target="_blank" rel="noreferrer">
              RSS
            </a>
            <a href={siteConfig.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <span>{t.footer.poweredBy}</span>
          </span>
        </div>
      </Container>
    </footer>
  );
};
