import React from 'react';
import './PostArticleLayout.css';

interface PostArticleLayoutProps {
  children: React.ReactNode;
  aside?: React.ReactNode;
  mobileAside?: React.ReactNode;
}

// 文章详情布局：桌面端正文 + 右侧目录，窄屏自动退化为单栏阅读
export const PostArticleLayout: React.FC<PostArticleLayoutProps> = ({
  children,
  aside,
  mobileAside,
}) => {
  const hasAside = Boolean(aside);

  return (
    <div className="post-article-shell">
      <div
        className={
          hasAside
            ? 'post-article-layout post-article-layout--with-aside'
            : 'post-article-layout post-article-layout--single'
        }
      >
        <main className="post-article-main">
          {mobileAside && <div className="post-article-mobile-aside">{mobileAside}</div>}
          {children}
        </main>

        {aside && <aside className="post-article-aside">{aside}</aside>}
      </div>
    </div>
  );
};
