import dayjs from 'dayjs';
import type { Lang } from '@/types/post';

// 按语言展示日期：中文 YYYY年M月D日，英文 MMM D, YYYY
export const formatDate = (date: string, lang: Lang): string => {
  const d = dayjs(date);
  if (!d.isValid()) return date;
  return lang === 'zh' ? d.format('YYYY 年 M 月 D 日') : d.format('MMM D, YYYY');
};
