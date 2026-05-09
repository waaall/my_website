import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '@/hooks/useI18n';
import type { Post } from '@/types/post';
import { routePaths } from '@/utils/routes';
import './PostPager.css';

interface PostPagerProps {
  prev?: Post;
  next?: Post;
}

// 上下篇导航：只关心文章间跳转，不掺入详情页布局逻辑
export const PostPager: React.FC<PostPagerProps> = ({ prev, next }) => {
  const { t, lang } = useI18n();

  return (
    <nav className="post-pager" aria-label={`${t.common.previous} / ${t.common.next}`}>
      {prev ? (
        <Link to={routePaths.post(lang, prev.slug)} className="post-pager-card">
          <span className="post-pager-kicker">← {t.common.previous}</span>
          <span className="post-pager-title">{prev.title}</span>
        </Link>
      ) : (
        <span className="post-pager-spacer" />
      )}

      {next ? (
        <Link
          to={routePaths.post(lang, next.slug)}
          className="post-pager-card post-pager-card--next"
        >
          <span className="post-pager-kicker">{t.common.next} →</span>
          <span className="post-pager-title">{next.title}</span>
        </Link>
      ) : (
        <span className="post-pager-spacer" />
      )}
    </nav>
  );
};
