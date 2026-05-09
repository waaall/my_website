import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useLangStore } from '@/stores/langStore';
import type { Lang } from '@/types/post';
import { routePaths } from '@/utils/routes';

// 切换语言时同步替换 URL 中的 :lang 段
export const LangSwitch: React.FC = () => {
  const { lang, setLang } = useLangStore();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const switchTo = (next: Lang) => {
    if (next === lang) return;
    setLang(next);
    // 替换 URL 第一段语言前缀
    const currentLangInPath = params.lang as Lang | undefined;
    if (currentLangInPath && (currentLangInPath === 'zh' || currentLangInPath === 'en')) {
      const newPath = location.pathname.replace(/^\/(zh|en)/, `/${next}`);
      navigate(newPath + location.search + location.hash, { replace: true });
    } else {
      navigate(routePaths.langHome(next));
    }
  };

  return (
    <span style={{ fontSize: 14, color: 'var(--fg-muted)', userSelect: 'none' }}>
      <button
        type="button"
        onClick={() => switchTo('zh')}
        style={{
          padding: '4px 6px',
          color: lang === 'zh' ? 'var(--fg)' : 'var(--fg-subtle)',
          fontWeight: lang === 'zh' ? 600 : 400,
        }}
      >
        中文
      </button>
      <span style={{ color: 'var(--fg-subtle)' }}>/</span>
      <button
        type="button"
        onClick={() => switchTo('en')}
        style={{
          padding: '4px 6px',
          color: lang === 'en' ? 'var(--fg)' : 'var(--fg-subtle)',
          fontWeight: lang === 'en' ? 600 : 400,
        }}
      >
        EN
      </button>
    </span>
  );
};
