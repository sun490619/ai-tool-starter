'use client';

import { useEffect, useRef } from 'react';
import { siteConfig } from '@/lib/site-config';

interface AdSenseProps {
  slot?: string;
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle' | 'fluid';
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Google AdSense 自动广告组件
 * 仅在启用并配置了 clientId 时渲染
 */
export function AdSenseAutoAds() {
  const { adsense } = siteConfig.ads;

  useEffect(() => {
    if (!adsense.enabled || !adsense.clientId) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsense.clientId}`;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);

    // 启用自动广告
    (window as any).adsbygoogle = (window as any).adsbygoogle || [];
    (window as any).adsbygoogle.push({
      overlay: true,
      params: {
        'data-ad-client': adsense.clientId,
      },
    });

    return () => {
      document.head.removeChild(script);
    };
  }, [adsense.enabled, adsense.clientId]);

  return null;
}

/**
 * 固定广告位组件
 */
export function AdSlot({ slot, format = 'auto', className = '', style }: AdSenseProps) {
  const { adsense } = siteConfig.ads;
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adsense.enabled || !adsense.clientId || !slot) return;

    const element = adRef.current;
    if (!element) return;

    // 清空现有内容
    element.innerHTML = '';

    const ins = document.createElement('ins');
    ins.className = 'adsbygoogle';
    ins.style.display = 'block';
    ins.style.minHeight = '50px';
    ins.setAttribute('data-ad-client', adsense.clientId);
    ins.setAttribute('data-ad-slot', slot);
    ins.setAttribute('data-ad-format', format);
    ins.setAttribute('data-full-width-responsive', 'true');
    element.appendChild(ins);

    try {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
    } catch (e) {
      console.warn('AdSense 加载失败:', e);
    }
  }, [slot, format, adsense.enabled, adsense.clientId]);

  if (!adsense.enabled || !adsense.clientId || !slot) {
    return (
      <div
        ref={adRef}
        className={`adsense-placeholder ${className}`}
        style={style}
        role="region"
        aria-label="广告位（未配置）"
      >
        <svg className="h-8 w-8 mx-auto mb-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        <p className="text-sm">广告位预留</p>
        <p className="text-xs mt-1">配置 AdSense 后自动显示</p>
      </div>
    );
  }

  return (
    <div
      ref={adRef}
      className={className}
      style={style}
      role="region"
      aria-label="广告"
    />
  );
}

/**
 * 页面级广告占位（用于文章内、侧边栏等）
 */
export function AdPlaceholder({ label = '广告位', className = '' }: { label?: string; className?: string }) {
  const { adsense } = siteConfig.ads;

  if (!adsense.enabled) {
    return (
      <div className={`adsense-placeholder ${className}`} role="region" aria-label={label}>
        <svg className="h-8 w-8 mx-auto mb-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        <p className="text-sm">{label}</p>
        <p className="text-xs mt-1">启用 AdSense 后显示广告</p>
      </div>
    );
  }

  return <AdSlot className={className} slot={adsense.slots.inArticle} format="fluid" />;
}

// 导出预设广告位
export const AdHeader = () => <AdSlot slot={siteConfig.ads.adsense.slots.header} format="horizontal" className="my-8" />;
export const AdSidebar = () => <AdSlot slot={siteConfig.ads.adsense.slots.sidebar} format="vertical" className="my-6" />;
export const AdFooter = () => <AdSlot slot={siteConfig.ads.adsense.slots.footer} format="horizontal" className="my-8" />;
export const AdInArticle = () => <AdSlot slot={siteConfig.ads.adsense.slots.inArticle} format="fluid" className="my-8" />;