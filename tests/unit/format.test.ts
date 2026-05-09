import { describe, expect, it } from 'vitest';
import { formatDate, formatYear } from '@/lib/format';

describe('formatDate', () => {
  it('中文格式', () => {
    expect(formatDate(new Date('2026-05-09'), 'zh')).toBe('2026 年 5 月 9 日');
  });

  it('英文格式', () => {
    expect(formatDate(new Date('2026-05-09'), 'en')).toBe('May 9, 2026');
  });

  it('字符串日期也能解析', () => {
    expect(formatDate('2026-01-01', 'zh')).toBe('2026 年 1 月 1 日');
  });

  it('非法日期原样返回', () => {
    expect(formatDate('not-a-date', 'zh')).toBe('not-a-date');
  });
});

describe('formatYear', () => {
  it('返回 4 位年份字符串', () => {
    expect(formatYear(new Date('2026-05-09'))).toBe('2026');
  });
});
