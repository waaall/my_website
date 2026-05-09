import React from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '@/components/Common/Seo';
import { Container } from '@/components/Layout';
import { useI18n } from '@/hooks/useI18n';
import { routePaths } from '@/utils/routes';

export const NotFound: React.FC = () => {
  const { t, lang } = useI18n();
  return (
    <Container width="narrow">
      <Seo title={t.notFound.title} lang={lang} />
      <div style={{ padding: '80px 0', textAlign: 'center' }}>
        <h1
          style={{
            fontFamily: 'Charter, Georgia, serif',
            fontSize: '4rem',
            fontWeight: 700,
            margin: 0,
            color: 'var(--fg)',
          }}
        >
          {t.notFound.title}
        </h1>
        <p style={{ color: 'var(--fg-muted)', marginTop: 12 }}>{t.notFound.desc}</p>
        <Link
          to={routePaths.langHome(lang)}
          style={{
            display: 'inline-block',
            marginTop: 24,
            padding: '8px 18px',
            border: '1px solid var(--border)',
            borderRadius: 6,
            color: 'var(--fg)',
            textDecoration: 'none',
          }}
        >
          {t.common.goHome}
        </Link>
      </div>
    </Container>
  );
};
