import React from 'react';
import { Seo } from '@/components/Common/Seo';
import { Container } from '@/components/Layout';
import { MarkdownRenderer } from '@/components/Post';
import { useI18n } from '@/hooks/useI18n';
import { siteConfig } from '@/config/site';
import { parseFrontmatter } from '@/utils/frontmatter';
import type { Lang } from '@/types/post';

// About 页：内容来自 content/pages/about.<lang>.md
const rawPages = import.meta.glob('/content/pages/about.*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const pageByLang = (lang: Lang): string | null => {
  const path = Object.keys(rawPages).find((p) => p.endsWith(`/about.${lang}.md`));
  return path ? rawPages[path] : null;
};

export const About: React.FC = () => {
  const { t, lang } = useI18n();
  const raw = pageByLang(lang) ?? pageByLang(lang === 'zh' ? 'en' : 'zh');
  const parsed = raw ? parseFrontmatter(raw) : null;
  const title = (parsed?.data.title as string) ?? t.nav.about;

  return (
    <Container width="narrow">
      <Seo title={`${title} · ${siteConfig.name[lang]}`} lang={lang} />
      <h1
        style={{
          fontFamily: 'Charter, Georgia, serif',
          fontSize: '2rem',
          fontWeight: 700,
          margin: '8px 0 24px',
          letterSpacing: '-0.02em',
        }}
      >
        {title}
      </h1>
      {parsed ? (
        <MarkdownRenderer content={parsed.content} />
      ) : (
        <p style={{ color: 'var(--fg-muted)' }}>{t.common.empty}</p>
      )}
    </Container>
  );
};
