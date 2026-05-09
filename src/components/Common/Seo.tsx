// 轻量级 SEO 组件：避免引入与 React 19 peer 依赖冲突的第三方 Helmet 包
import { useEffect } from 'react';
import type { FC } from 'react';
import type { Lang } from '@/types/post';

interface SeoMetaItem {
  name?: string;
  property?: string;
  content: string;
}

interface SeoProps {
  title: string;
  description?: string;
  lang?: Lang;
  meta?: SeoMetaItem[];
}

const MANAGED_ATTR = 'data-managed-by';
const MANAGED_VALUE = 'site-seo';
const EMPTY_META: SeoMetaItem[] = [];

const toHtmlLang = (lang: Lang): string => (lang === 'zh' ? 'zh-CN' : 'en');

const createMetaElement = (item: SeoMetaItem): HTMLMetaElement => {
  const element = document.createElement('meta');
  element.setAttribute(MANAGED_ATTR, MANAGED_VALUE);

  // 按调用方传入的类型写入 name/property，便于同时支持普通 SEO 与 OpenGraph/Article 元信息
  if (item.name) {
    element.setAttribute('name', item.name);
  }
  if (item.property) {
    element.setAttribute('property', item.property);
  }
  element.setAttribute('content', item.content);

  return element;
};

export const Seo: FC<SeoProps> = ({ title, description, lang, meta = EMPTY_META }) => {
  useEffect(() => {
    document.title = title;
    if (lang) {
      document.documentElement.lang = toHtmlLang(lang);
    }

    // 每个页面重新声明自己管理的 meta，避免文章页切到普通页时遗留 article 元信息
    document
      .querySelectorAll<HTMLMetaElement>(`meta[${MANAGED_ATTR}="${MANAGED_VALUE}"]`)
      .forEach((element) => element.remove());

    const metaItems: SeoMetaItem[] = [
      ...(description ? [{ name: 'description', content: description }] : []),
      ...meta,
    ];
    metaItems
      .filter((item) => item.content)
      .map(createMetaElement)
      .forEach((element) => document.head.appendChild(element));

    return () => {
      document
        .querySelectorAll<HTMLMetaElement>(`meta[${MANAGED_ATTR}="${MANAGED_VALUE}"]`)
        .forEach((element) => element.remove());
    };
  }, [description, lang, meta, title]);

  return null;
};
