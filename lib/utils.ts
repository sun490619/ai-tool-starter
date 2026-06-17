import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('zh-CN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatCurrency(value: number, currency: 'CNY' | 'USD' = 'CNY'): string {
  return new Intl.NumberFormat(currency === 'CNY' ? 'zh-CN' : 'en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function generateSchemaOrgJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: '复利计算器',
    description: '专业的在线复利计算器，支持定投、复利频率设置、收益可视化图表。',
    url: 'https://your-domain.com/calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CNY',
      availability: 'https://schema.org/InStock',
    },
    author: {
      '@type': 'Person',
      name: '您的名字/品牌名',
    },
  };
}