import React from 'react';
import { Link } from 'react-router-dom';
import type { Post } from '@/types/post';
import { formatDate } from '@/utils/format';
import { useI18n } from '@/hooks/useI18n';

interface Props {
  post: Post;
  showTags?: boolean;
}

// 文章元信息：日期、阅读时长、标签
export const PostMeta: React.FC<Props> = ({ post, showTags = true }) => {
  const { t, lang } = useI18n();
  return (
    <div
      style={{
        color: 'var(--fg-muted)',
        fontSize: 14,
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.4em 0.9em',
        alignItems: 'center',
        marginBottom: 24,
      }}
    >
      <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
      <span style={{ color: 'var(--fg-subtle)' }}>·</span>
      <span>{t.common.readingTime(post.readingTime)}</span>
      {showTags && post.tags && post.tags.length > 0 && (
        <>
          <span style={{ color: 'var(--fg-subtle)' }}>·</span>
          <span style={{ display: 'inline-flex', flexWrap: 'wrap', gap: 6 }}>
            {post.tags.map((tag) => (
              <Link
                key={tag}
                to={`/${lang}/tags/${encodeURIComponent(tag)}`}
                style={{
                  color: 'var(--fg-muted)',
                  fontSize: 13,
                  padding: '2px 8px',
                  border: '1px solid var(--border)',
                  borderRadius: 999,
                  textDecoration: 'none',
                }}
              >
                {tag}
              </Link>
            ))}
          </span>
        </>
      )}
    </div>
  );
};
