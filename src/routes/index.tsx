import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom';
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
import { getLegacyHashPath, routePaths } from '@/utils/routes';

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

// 根路径入口：优先迁移旧 HashRouter URL，否则进入用户当前语言首页
const RootRedirect: React.FC = () => {
  const lang = useLangStore((s) => s.lang);
  const location = useLocation();
  const legacyPath = getLegacyHashPath(location.hash);

  return <Navigate to={legacyPath ?? routePaths.langHome(lang)} replace />;
};

export const AppRouter: React.FC = () => {
  // BrowserRouter 适配 Vite base：根部署不设 basename，子路径部署时去掉尾部斜杠
  const baseName =
    import.meta.env.BASE_URL === '/' ? undefined : import.meta.env.BASE_URL.replace(/\/$/, '');

  return (
    <BrowserRouter basename={baseName}>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
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
    </BrowserRouter>
  );
};
