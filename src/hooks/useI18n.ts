import { useLangStore } from '@/stores/langStore';
import { messages, type Messages } from '@/i18n/locales';

// 取当前语言文案
export const useI18n = (): { t: Messages; lang: 'zh' | 'en' } => {
  const lang = useLangStore((s) => s.lang);
  return { t: messages[lang], lang };
};
