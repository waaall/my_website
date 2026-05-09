import dayjs from 'dayjs';
import type { Lang } from '@/types/post';

// 按语言展示日期：中文 YYYY 年 M 月 D 日，英文 MMM D, YYYY
export const formatDate = (date: Date | string, lang: Lang): string => {
  const d = dayjs(date);
  if (!d.isValid()) return String(date);
  return lang === 'zh' ? d.format('YYYY 年 M 月 D 日') : d.format('MMM D, YYYY');
};

// 仅取 YYYY 年份，归档分组用
export const formatYear = (date: Date | string): string => dayjs(date).format('YYYY');
