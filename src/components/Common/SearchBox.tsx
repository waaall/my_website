import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { useSearch } from '@/hooks/useSearch';
import { useI18n } from '@/hooks/useI18n';

// 站内搜索：输入框 + 即时结果列表
export const SearchBox: React.FC = () => {
  const { t, lang } = useI18n();
  const [query, setQuery] = useState('');
  const results = useSearch(lang, query);

  return (
    <div style={{ marginBottom: 24 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid var(--border)',
          borderRadius: 8,
          padding: '0 12px',
          background: 'var(--bg-elevated)',
        }}
      >
        <SearchOutlined style={{ color: 'var(--fg-subtle)' }} />
        <input
          type="search"
          value={query}
          placeholder={t.common.searchPlaceholder}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            flex: 1,
            border: 0,
            outline: 0,
            padding: '10px 12px',
            fontSize: 15,
            background: 'transparent',
            color: 'var(--fg)',
          }}
        />
      </div>

      {query.trim() && (
        <ul
          style={{
            marginTop: 12,
            padding: 0,
            listStyle: 'none',
            border: '1px solid var(--border-subtle)',
            borderRadius: 8,
            background: 'var(--bg-elevated)',
            overflow: 'hidden',
          }}
        >
          {results.length === 0 ? (
            <li style={{ padding: 16, color: 'var(--fg-muted)' }}>{t.common.noResults}</li>
          ) : (
            results.slice(0, 8).map((post) => (
              <li key={post.slug} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <Link
                  to={`/${lang}/posts/${post.slug}`}
                  onClick={() => setQuery('')}
                  style={{
                    display: 'block',
                    padding: '10px 14px',
                    color: 'var(--fg)',
                    textDecoration: 'none',
                  }}
                >
                  <div style={{ fontWeight: 600 }}>{post.title}</div>
                  {post.summary && (
                    <div style={{ fontSize: 13, color: 'var(--fg-muted)', marginTop: 2 }}>
                      {post.summary}
                    </div>
                  )}
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};
