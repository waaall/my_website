import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Seo } from '@/components/Common/Seo';
import { Container } from '@/components/Layout';
import { PostCard } from '@/components/Post';
import { SearchBox } from '@/components/Common/SearchBox';
import { Pagination } from '@/components/Common/Pagination';
import { usePostList } from '@/hooks/usePosts';
import { useI18n } from '@/hooks/useI18n';
import { siteConfig } from '@/config/site';

// 文章列表：可选 :tag 参数过滤；带搜索 + 分页
export const PostList: React.FC = () => {
  const { t, lang } = useI18n();
  const params = useParams<{ tag?: string }>();
  const tag = params.tag ? decodeURIComponent(params.tag) : undefined;
  const posts = usePostList(lang, tag);
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(posts.length / siteConfig.postsPerPage));
  const pageItems = useMemo(() => {
    const start = (page - 1) * siteConfig.postsPerPage;
    return posts.slice(start, start + siteConfig.postsPerPage);
  }, [posts, page]);

  const title = tag ? `${t.nav.tags} · ${tag}` : t.nav.posts;

  return (
    <Container width="narrow">
      <Seo title={`${title} · ${siteConfig.name[lang]}`} lang={lang} />

      <h1
        style={{
          fontFamily: 'Charter, Georgia, serif',
          fontSize: '1.8rem',
          fontWeight: 700,
          margin: '8px 0 24px',
          letterSpacing: '-0.01em',
        }}
      >
        {title}
      </h1>

      <SearchBox />

      {pageItems.length === 0 ? (
        <p style={{ color: 'var(--fg-muted)', padding: '24px 0' }}>{t.common.empty}</p>
      ) : (
        pageItems.map((p) => <PostCard key={p.slug} post={p} />)
      )}

      <Pagination current={page} total={totalPages} onChange={setPage} />
    </Container>
  );
};
