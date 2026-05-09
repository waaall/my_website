import React, { useMemo } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { Seo } from '@/components/Common/Seo';
import { Container } from '@/components/Layout';
import {
  MarkdownRenderer,
  PostArticleLayout,
  PostMeta,
  PostPager,
  PostToc,
} from '@/components/Post';
import { useSinglePost, useOtherLangPost, useNeighbors } from '@/hooks/usePosts';
import { useI18n } from '@/hooks/useI18n';
import { useLangStore } from '@/stores/langStore';
import { siteConfig } from '@/config/site';
import { formatDate } from '@/utils/format';
import { routePaths } from '@/utils/routes';
import { useArticleToc } from '@/hooks/useArticleToc';
import { useActiveHeading } from '@/hooks/useActiveHeading';
import { useInitialHeadingScroll } from '@/hooks/useHeadingScroll';
import './PostDetail.css';

// 文章详情：带 TOC + 上下篇 + 缺失语言提示
export const PostDetail: React.FC = () => {
  const { t, lang } = useI18n();
  const { slug } = useParams<{ slug: string }>();
  const post = useSinglePost(slug, lang);
  const otherLang = useOtherLangPost(slug, lang);
  const { prev, next } = useNeighbors(slug, lang);
  const setLang = useLangStore((s) => s.setLang);
  const navigate = useNavigate();
  const tocItems = useArticleToc(post?.content ?? '');
  const tocIds = useMemo(() => tocItems.map((item) => item.id), [tocItems]);
  const activeHeading = useActiveHeading(tocIds);
  const contentKey = post ? `${post.lang}:${post.slug}` : '';
  useInitialHeadingScroll(contentKey);

  const switchToOtherLang = () => {
    if (!otherLang) return;

    // 切换文章语言时同步更新 URL，避免 LangSync 再把 store 改回旧语言
    setLang(otherLang.lang);
    navigate(routePaths.post(otherLang.lang, otherLang.slug));
  };

  // 当前语言无版本但另一语言有：提示并允许切换
  if (!post && otherLang) {
    return (
      <Container width="narrow">
        <div className="post-lang-missing">
          <p>{t.common.langMissing}</p>
          <button type="button" onClick={switchToOtherLang} className="post-lang-missing-button">
            {t.common.langSwitchTo}
          </button>
        </div>
      </Container>
    );
  }

  if (!post) {
    return <Navigate to={routePaths.notFound(lang)} replace />;
  }

  const hasToc = tocItems.length >= 2;
  const desktopToc = hasToc ? <PostToc items={tocItems} activeId={activeHeading} /> : undefined;
  const mobileToc = hasToc ? (
    <PostToc items={tocItems} activeId={activeHeading} variant="mobile" />
  ) : undefined;

  return (
    <>
      <Seo
        title={`${post.title} · ${siteConfig.name[lang]}`}
        description={post.summary || siteConfig.description[lang]}
        lang={lang}
        meta={[{ property: 'article:published_time', content: post.date }]}
      />

      <PostArticleLayout aside={desktopToc} mobileAside={mobileToc}>
        <h1 className="post-detail-title">{post.title}</h1>

        <PostMeta post={post} />

        <MarkdownRenderer content={post.content} />

        <hr />

        <PostPager prev={prev} next={next} />

        <div className="post-detail-footer">
          {t.common.publishedOn} {formatDate(post.date, lang)}
          {otherLang && (
            <>
              {' · '}
              <button
                type="button"
                onClick={switchToOtherLang}
                className="post-detail-language-button"
              >
                {t.common.langSwitchTo}
              </button>
            </>
          )}
        </div>
      </PostArticleLayout>
    </>
  );
};
