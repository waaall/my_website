// 极简 frontmatter 解析器
// 仅支持本项目使用的字段类型：string / number / boolean / string[]
// 文章 frontmatter 严格写在文件头部，由两行 --- 包裹

const FM_REGEX = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

// 去引号
const stripQuotes = (s: string): string => {
  const t = s.trim();
  if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) {
    return t.slice(1, -1);
  }
  return t;
};

// 解析单个标量值
const parseScalar = (raw: string): string | number | boolean => {
  const v = stripQuotes(raw);
  if (v === 'true') return true;
  if (v === 'false') return false;
  if (v !== '' && !Number.isNaN(Number(v)) && /^-?\d+(\.\d+)?$/.test(v)) return Number(v);
  return v;
};

// 解析行内数组：[a, b, "c d"]
const parseInlineArray = (raw: string): string[] => {
  const inner = raw.trim().replace(/^\[/, '').replace(/\]$/, '');
  if (!inner.trim()) return [];
  return inner.split(',').map((item) => stripQuotes(item.trim()));
};

export interface ParsedDoc {
  data: Record<string, unknown>;
  content: string;
}

// 主入口
export const parseFrontmatter = (raw: string): ParsedDoc => {
  const match = FM_REGEX.exec(raw);
  if (!match) return { data: {}, content: raw };

  const [, head, body] = match;
  const data: Record<string, unknown> = {};
  const lines = head.split(/\r?\n/);

  // 当前块状数组的接收键
  let currentArrayKey: string | null = null;

  for (const line of lines) {
    if (!line.trim()) {
      currentArrayKey = null;
      continue;
    }
    // 块状数组项：以 "  - value" 形式延续
    if (currentArrayKey && /^\s*-\s+/.test(line)) {
      const item = stripQuotes(line.replace(/^\s*-\s+/, ''));
      (data[currentArrayKey] as string[]).push(item);
      continue;
    }

    const idx = line.indexOf(':');
    if (idx === -1) {
      currentArrayKey = null;
      continue;
    }
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();

    if (value === '') {
      // 准备接收块状数组
      data[key] = [];
      currentArrayKey = key;
      continue;
    }

    if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = parseInlineArray(value);
      currentArrayKey = null;
      continue;
    }

    data[key] = parseScalar(value);
    currentArrayKey = null;
  }

  return { data, content: body };
};
