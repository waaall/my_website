import React from 'react';
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom';
import { Seo } from '@/components/Common/Seo';
import { Container } from '@/components/Layout';
import { MarkdownRenderer, PostMeta, Toc } from '@/components/Post';
import { useSinglePost, useOtherLangPost, useNeighbors } from '@/hooks/usePosts';
import { useI18n } from '@/hooks/useI18n';
import { useLangStore } from '@/stores/langStore';
import { siteConfig } from '@/config/site';
import { formatDate } from '@/utils/format';

// 文章详情：带 TOC + 上下篇 + 缺失语言提示
export const PostDetail: React.FC = () => {
  const { t, lang } = useI18n();
  const { slug } = useParams<{ slug: string }>();
  const post = useSinglePost(slug, lang);
  const otherLang = useOtherLangPost(slug, lang);
  const { prev, next } = useNeighbors(slug, lang);
  const setLang = useLangStore((s) => s.setLang);
  const navigate = useNavigate();

  const switchToOtherLang = () => {
    if (!otherLang) return;

    // 切换文章语言时同步更新 URL，避免 LangSync 再把 store 改回旧语言
    setLang(otherLang.lang);
    navigate(`/${otherLang.lang}/posts/${otherLang.slug}`);
  };

  // 当前语言无版本但另一语言有：提示并允许切换
  if (!post && otherLang) {
    return (
      <Container width="narrow">
        <div
          style={{
            padding: '40px 0',
            color: 'var(--fg-muted)',
            textAlign: 'center',
          }}
        >
          <p>{t.common.langMissing}</p>
          <button
            type="button"
            onClick={switchToOtherLang}
            style={{
              marginTop: 12,
              padding: '8px 16px',
              border: '1px solid var(--border)',
              borderRadius: 6,
              color: 'var(--fg)',
              background: 'var(--bg-elevated)',
            }}
          >
            {t.common.langSwitchTo}
          </button>
        </div>
      </Container>
    );
  }

  if (!post) {
    return <Navigate to={`/${lang}/404`} replace />;
  }

  return (
    <>
      <Seo
        title={`${post.title} · ${siteConfig.name[lang]}`}
        description={post.summary || siteConfig.description[lang]}
        lang={lang}
        meta={[{ property: 'article:published_time', content: post.date }]}
      />

      <Container width="wide">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) 220px',
            gap: 48,
            alignItems: 'start',
          }}
          className="post-grid"
        >
          <div
            style={{ minWidth: 0, maxWidth: 'var(--content-max)', margin: '0 auto', width: '100%' }}
          >
            <h1
              style={{
                fontFamily: 'Charter, Georgia, serif',
                fontSize: '2.2rem',
                fontWeight: 700,
                margin: '8px 0 16px',
                letterSpacing: '-0.02em',
                lineHeight: 1.25,
              }}
            >
              {post.title}
            </h1>

            <PostMeta post={post} />

            <MarkdownRenderer content={post.content} />

            <hr />

            <nav
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'stretch',
                gap: 16,
                marginTop: 24,
                fontSize: 14,
              }}
            >
              {prev ? (
                <Link
                  to={`/${lang}/posts/${prev.slug}`}
                  style={{
                    flex: 1,
                    padding: '12px 14px',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    color: 'var(--fg)',
                    textDecoration: 'none',
                  }}
                >
                  <div style={{ color: 'var(--fg-subtle)', fontSize: 12 }}>
                    ← {t.common.previous}
                  </div>
                  <div style={{ fontWeight: 600, marginTop: 4 }}>{prev.title}</div>
                </Link>
              ) : (
                <span style={{ flex: 1 }} />
              )}
              {next ? (
                <Link
                  to={`/${lang}/posts/${next.slug}`}
                  style={{
                    flex: 1,
                    padding: '12px 14px',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    color: 'var(--fg)',
                    textDecoration: 'none',
                    textAlign: 'right',
                  }}
                >
                  <div style={{ color: 'var(--fg-subtle)', fontSize: 12 }}>{t.common.next} →</div>
                  <div style={{ fontWeight: 600, marginTop: 4 }}>{next.title}</div>
                </Link>
              ) : (
                <span style={{ flex: 1 }} />
              )}
            </nav>

            <div style={{ color: 'var(--fg-subtle)', fontSize: 13, marginTop: 32 }}>
              {t.common.publishedOn} {formatDate(post.date, lang)}
              {otherLang && (
                <>
                  {' · '}
                  <button
                    type="button"
                    onClick={switchToOtherLang}
                    style={{ color: 'var(--fg-muted)', textDecoration: 'underline' }}
                  >
                    {t.common.langSwitchTo}
                  </button>
                </>
              )}
            </div>
          </div>

          <aside className="post-aside">
            <Toc content={post.content} />
          </aside>
        </div>
      </Container>
    </>
  );
};
