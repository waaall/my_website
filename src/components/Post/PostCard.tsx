import React from 'react';
import { Link } from 'react-router-dom';
import type { Post } from '@/types/post';
import { formatDate } from '@/utils/format';
import { useI18n } from '@/hooks/useI18n';
import { routePaths } from '@/utils/routes';

interface Props {
  post: Post;
}

// 列表项卡片：极简排版，标题 + 摘要 + 元信息
export const PostCard: React.FC<Props> = ({ post }) => {
  const { t, lang } = useI18n();
  return (
    <article style={{ padding: '24px 0', borderBottom: '1px solid var(--border-subtle)' }}>
      <Link
        to={routePaths.post(lang, post.slug)}
        style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
      >
        <h2
          style={{
            fontFamily: 'Charter, Georgia, serif',
            fontSize: '1.5rem',
            fontWeight: 700,
            margin: '0 0 8px',
            letterSpacing: '-0.01em',
            lineHeight: 1.3,
            color: 'var(--fg)',
          }}
        >
          {post.title}
        </h2>
        {post.summary && (
          <p style={{ color: 'var(--fg-muted)', margin: '0 0 12px', lineHeight: 1.65 }}>
            {post.summary}
          </p>
        )}
        <div
          style={{
            color: 'var(--fg-subtle)',
            fontSize: 13,
            display: 'flex',
            gap: '0.7em',
            flexWrap: 'wrap',
          }}
        >
          <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
          <span>·</span>
          <span>{t.common.readingTime(post.readingTime)}</span>
          {post.tags && post.tags.length > 0 && (
            <>
              <span>·</span>
              <span>{post.tags.join(', ')}</span>
            </>
          )}
        </div>
      </Link>
    </article>
  );
};
