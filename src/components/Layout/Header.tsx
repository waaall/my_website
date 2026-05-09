import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { siteConfig } from '@/config/site';
import { useI18n } from '@/hooks/useI18n';
import { routePaths } from '@/utils/routes';
import { Container } from './Container';
import { ThemeSwitch } from './ThemeSwitch';
import { LangSwitch } from './LangSwitch';

export const Header: React.FC = () => {
  const { t, lang } = useI18n();
  const location = useLocation();

  const navItems = [
    { to: routePaths.langHome(lang), label: t.nav.home, exact: true },
    { to: routePaths.posts(lang), label: t.nav.posts },
    { to: routePaths.tags(lang), label: t.nav.tags },
    { to: routePaths.archive(lang), label: t.nav.archive },
    { to: routePaths.about(lang), label: t.nav.about },
  ];

  const isActive = (to: string, exact?: boolean) => {
    if (exact) return location.pathname === to;
    return location.pathname === to || location.pathname.startsWith(to + '/');
  };

  return (
    <header
      style={{
        borderBottom: '1px solid var(--border-subtle)',
        background: 'var(--bg)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: 'blur(8px)',
      }}
    >
      <Container width="wide">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 64,
            gap: 16,
          }}
        >
          <Link
            to={routePaths.langHome(lang)}
            style={{
              fontFamily: 'Charter, Georgia, serif',
              fontSize: 20,
              fontWeight: 700,
              color: 'var(--fg)',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
            }}
          >
            {siteConfig.name[lang]}
          </Link>

          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              flexWrap: 'wrap',
            }}
          >
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                style={{
                  padding: '6px 10px',
                  fontSize: 14,
                  color: isActive(item.to, item.exact) ? 'var(--fg)' : 'var(--fg-muted)',
                  fontWeight: isActive(item.to, item.exact) ? 600 : 400,
                  textDecoration: 'none',
                }}
              >
                {item.label}
              </Link>
            ))}
            <span
              style={{
                width: 1,
                height: 18,
                background: 'var(--border)',
                margin: '0 6px',
              }}
            />
            <LangSwitch />
            <ThemeSwitch />
          </nav>
        </div>
      </Container>
    </header>
  );
};
