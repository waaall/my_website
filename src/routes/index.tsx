import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { AppLayout } from '@/components/Layout';
import { Home } from '@/pages/Home';
import { PostList } from '@/pages/PostList';
import { PostDetail } from '@/pages/PostDetail';
import { TagPage } from '@/pages/TagPage';
import { Archive } from '@/pages/Archive';
import { About } from '@/pages/About';
import { NotFound } from '@/pages/NotFound';
import { useLangStore } from '@/stores/langStore';
import type { Lang } from '@/types/post';

// URL 中的 :lang 段同步到 store
const LangSync: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { lang: paramLang } = useParams<{ lang: string }>();
  const setLang = useLangStore((s) => s.setLang);
  const currentLang = useLangStore((s) => s.lang);

  useEffect(() => {
    if (paramLang === 'zh' || paramLang === 'en') {
      if (paramLang !== currentLang) setLang(paramLang as Lang);
    }
  }, [paramLang, currentLang, setLang]);

  return <>{children}</>;
};

export const AppRouter: React.FC = () => {
  const lang = useLangStore((s) => s.lang);
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to={`/${lang}`} replace />} />
        <Route
          path="/:lang"
          element={
            <LangSync>
              <AppLayout />
            </LangSync>
          }
        >
          <Route index element={<Home />} />
          <Route path="posts" element={<PostList />} />
          <Route path="posts/:slug" element={<PostDetail />} />
          <Route path="tags" element={<TagPage />} />
          <Route path="tags/:tag" element={<PostList />} />
          <Route path="archive" element={<Archive />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
