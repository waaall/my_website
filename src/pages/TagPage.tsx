import React from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '@/components/Common/Seo';
import { Container } from '@/components/Layout';
import { useTagCounts } from '@/hooks/usePosts';
import { useI18n } from '@/hooks/useI18n';
import { siteConfig } from '@/config/site';

// 标签云：按文章数降序
export const TagPage: React.FC = () => {
  const { t, lang } = useI18n();
  const tags = useTagCounts(lang);

  return (
    <Container width="narrow">
      <Seo title={`${t.common.allTags} · ${siteConfig.name[lang]}`} lang={lang} />

      <h1
        style={{
          fontFamily: 'Charter, Georgia, serif',
          fontSize: '1.8rem',
          fontWeight: 700,
          margin: '8px 0 24px',
          letterSpacing: '-0.01em',
        }}
      >
        {t.common.allTags}
      </h1>

      {tags.length === 0 ? (
        <p style={{ color: 'var(--fg-muted)' }}>{t.common.empty}</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {tags.map(([tag, count]) => (
            <Link
              key={tag}
              to={`/${lang}/tags/${encodeURIComponent(tag)}`}
              style={{
                padding: '6px 12px',
                border: '1px solid var(--border)',
                borderRadius: 999,
                color: 'var(--fg)',
                fontSize: 14,
                textDecoration: 'none',
                background: 'var(--bg-elevated)',
              }}
            >
              {tag} <span style={{ color: 'var(--fg-subtle)', fontSize: 12 }}>{count}</span>
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
};
