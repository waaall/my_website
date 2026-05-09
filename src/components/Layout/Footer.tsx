import React from 'react';
import { siteConfig } from '@/config/site';
import { useI18n } from '@/hooks/useI18n';
import { Container } from './Container';

export const Footer: React.FC = () => {
  const { t } = useI18n();
  const year = new Date().getFullYear();
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
            <a href="./rss.xml" target="_blank" rel="noreferrer">
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
