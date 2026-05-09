import React from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '@/components/Common/Seo';
import { Container } from '@/components/Layout';
import { useArchive } from '@/hooks/usePosts';
import { useI18n } from '@/hooks/useI18n';
import { formatDate } from '@/utils/format';
import { siteConfig } from '@/config/site';

// 归档：按年份分组、按日期降序
export const Archive: React.FC = () => {
  const { t, lang } = useI18n();
  const groups = useArchive(lang);
  const total = groups.reduce((acc, g) => acc + g.posts.length, 0);

  return (
    <Container width="narrow">
      <Seo title={`${t.nav.archive} · ${siteConfig.name[lang]}`} lang={lang} />

      <h1
        style={{
          fontFamily: 'Charter, Georgia, serif',
          fontSize: '1.8rem',
          fontWeight: 700,
          margin: '8px 0 8px',
          letterSpacing: '-0.01em',
        }}
      >
        {t.nav.archive}
      </h1>
      <p style={{ color: 'var(--fg-muted)', marginTop: 0, marginBottom: 32 }}>
        {t.archive.total(total)}
      </p>

      {groups.map((g) => (
        <section key={g.year} style={{ marginBottom: 36 }}>
          <h2
            style={{
              fontFamily: 'Charter, Georgia, serif',
              fontSize: '1.2rem',
              fontWeight: 700,
              margin: '0 0 12px',
              color: 'var(--fg-muted)',
            }}
          >
            {g.year}
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {g.posts.map((post) => (
              <li
                key={post.slug}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 14,
                  padding: '8px 0',
                  borderBottom: '1px solid var(--border-subtle)',
                }}
              >
                <span
                  style={{
                    color: 'var(--fg-subtle)',
                    fontSize: 13,
                    fontVariantNumeric: 'tabular-nums',
                    minWidth: 110,
                  }}
                >
                  {formatDate(post.date, lang)}
                </span>
                <Link
                  to={`/${lang}/posts/${post.slug}`}
                  style={{ color: 'var(--fg)', textDecoration: 'none', flex: 1 }}
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </Container>
  );
};
