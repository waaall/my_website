import React from 'react';
import { useI18n } from '@/hooks/useI18n';

interface Props {
  current: number;
  total: number;
  onChange: (page: number) => void;
}

// 极简分页
export const Pagination: React.FC<Props> = ({ current, total, onChange }) => {
  const { t } = useI18n();
  if (total <= 1) return null;

  const btnStyle = (disabled: boolean): React.CSSProperties => ({
    padding: '6px 14px',
    border: '1px solid var(--border)',
    borderRadius: 6,
    color: disabled ? 'var(--fg-subtle)' : 'var(--fg)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    background: 'var(--bg-elevated)',
    fontSize: 14,
  });

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 32,
        gap: 16,
      }}
    >
      <button
        type="button"
        disabled={current <= 1}
        onClick={() => onChange(current - 1)}
        style={btnStyle(current <= 1)}
      >
        ← {t.common.previous}
      </button>
      <span style={{ color: 'var(--fg-muted)', fontSize: 14 }}>
        {t.common.pageOf(current, total)}
      </span>
      <button
        type="button"
        disabled={current >= total}
        onClick={() => onChange(current + 1)}
        style={btnStyle(current >= total)}
      >
        {t.common.next} →
      </button>
    </div>
  );
};
