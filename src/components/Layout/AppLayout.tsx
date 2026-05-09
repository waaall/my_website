import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export const AppLayout: React.FC = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg)',
      }}
    >
      <Header />
      <main style={{ flex: 1, paddingTop: 32, paddingBottom: 32 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
