import React from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '@/components/Common/Seo';
import { Container } from '@/components/Layout';
import { PostCard } from '@/components/Post';
import { usePostList } from '@/hooks/usePosts';
import { useI18n } from '@/hooks/useI18n';
import { siteConfig } from '@/config/site';

// 首页：站点介绍 + 最近 N 篇
const HOME_LIMIT = 5;

export const Home: React.FC = () => {
  const { t, lang } = useI18n();
  const posts = usePostList(lang).slice(0, HOME_LIMIT);

  return (
    <Container width="narrow">
      <Seo title={siteConfig.name[lang]} description={siteConfig.description[lang]} lang={lang} />

      <section style={{ padding: '24px 0 8px' }}>
        <h1
          style={{
            fontFamily: 'Charter, Georgia, serif',
            fontSize: '2.2rem',
            fontWeight: 700,
            margin: '0 0 12px',
            letterSpacing: '-0.02em',
          }}
        >
          {siteConfig.name[lang]}
        </h1>
        <p style={{ color: 'var(--fg-muted)', margin: 0, fontSize: '1.05rem' }}>
          {siteConfig.description[lang]}
        </p>
      </section>

      <section style={{ marginTop: 36 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 4,
          }}
        >
          <h2
            style={{
              fontFamily: 'Charter, Georgia, serif',
              fontSize: '1.2rem',
              fontWeight: 700,
              margin: 0,
            }}
          >
            {t.home.latest}
          </h2>
          <Link to={`/${lang}/posts`} style={{ fontSize: 14, color: 'var(--fg-muted)' }}>
            {t.home.viewAll}
          </Link>
        </div>

        {posts.length === 0 ? (
          <p style={{ color: 'var(--fg-muted)', padding: '24px 0' }}>{t.common.empty}</p>
        ) : (
          posts.map((p) => <PostCard key={p.slug} post={p} />)
        )}
      </section>
    </Container>
  );
};
