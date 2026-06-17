import { Metadata } from 'next';
import {Header} from '@/components/layout';
import { AdSenseAutoAds, AdInArticle } from '@/components/adsense';
import { siteConfig } from '@/lib/site-config';
import Link from 'next/link';
import { Shield, FileText, Mail, Calendar, Lock, Eye, Trash2, Database, Globe, User } from 'lucide-react';

export const metadata: Metadata = {
  title: '隐私政策',
  description: `${siteConfig.name}隐私政策 - 我们如何收集、使用和保护您的个人信息。`,
};

const lastUpdated = new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });

export default function PrivacyPage() {
  return (
    <>
      <AdSenseAutoAds />
      <div className="min-h-screen flex flex-col">
        <Header currentPath="/privacy" />
        
        <main className="flex-1">
          <section className="py-12 md:py-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
            <div className="container-custom">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">隐私政策</h1>
                <p className="text-slate-600 dark:text-slate-400 mb-6">最后更新：{lastUpdated}</p>
                <p className="text-slate-600 dark:text-slate-400">
                  {siteConfig.name}（以下简称"我们"）尊重并保护您的隐私。本政策说明我们如何收集、使用、存储和保护您的信息。
                </p>
              </div>
            </div>
          </section>

          <section className="py-12 md:py-16 bg-white dark:bg-slate-900">
            <div className="container-custom">
              <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert max-w-none">
                <AdInArticle />
                
                <div className="card p-6 mb-8 bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800">
                  <h2 className="text-lg font-semibold text-primary-800 dark:text-primary-200 mb-3 flex items-center gap-2">
                    <Shield className="h-5 w-5" aria-hidden="true" />
                    核心承诺
                  </h2>
                  <ul className="list-disc list-inside text-primary-700 dark:text-primary-300 space-y-2">
                    <li><strong>纯前端计算</strong>：所有计算在您的浏览器本地完成，财务数据不上传服务器</li>
                    <li><strong>不收集个人身份信息</strong>：无需注册、登录，不收集姓名、身份证、手机号等敏感信息</li>
                    <li><strong>不与第三方共享</strong>：除法律强制要求外，不向任何第三方出售、出租或共享您的数据</li>
                    <li><strong>您拥有完全控制权</strong>：可随时清除浏览器数据，我们无法访问您的计算记录</li>
                  </ul>
                </div>

                <h2 id="collection">1. 我们收集的信息</h2>
                <h3>1.1 您主动提供的信息</h3>
                <p>本工具<strong>不要求</strong>您提供任何个人身份信息。您在使用计算器时输入的参数（本金、定投金额、收益率、年限等）仅在浏览器内存中临时存储，用于实时计算。</p>
                
                <h3>1.2 自动收集的技术信息</h3>
                <p>为保障服务稳定性和安全性，我们的服务器可能记录以下匿名技术日志：</p>
                <ul>
                  <li>访问时间、IP 地址（仅用于地理位置统计，不关联身份）</li>
                  <li>浏览器类型、操作系统、屏幕分辨率</li>
                  <li>访问页面、停留时间、跳转来源</li>
                  <li>错误日志、性能指标</li>
                </ul>
                <p>这些信息<strong>不包含</strong>您输入的财务数据。</p>

                <h3>1.3 第三方服务收集的信息</h3>
                <p>我们可能集成以下第三方服务，它们会根据各自隐私政策收集数据：</p>
                <ul>
                  <li><strong>Google AdSense</strong>：展示广告时可能使用 Cookie 个性化广告投放</li>
                  <li><strong>Google Analytics / Umami</strong>：匿名统计网站流量与用户行为</li>
                  <li><strong>CDN 服务商</strong>：加速内容分发，记录必要的网络日志</li>
                </ul>

                <h2 id="usage">2. 信息的使用目的</h2>
                <ul>
                  <li>提供、维护、改进本工具的核心计算功能</li>
                  <li>监控服务器性能、排查技术故障、防范安全威胁</li>
                  <li>统计匿名访问数据，优化用户体验</li>
                  <li>展示广告以支持服务持续运营（如已启用）</li>
                  <li>遵守适用法律法规、回应政府机关合法请求</li>
                </ul>

                <h2 id="storage">3. 信息存储与安全</h2>
                <h3>3.1 存储位置</h3>
                <p>网站托管于 Vercel/Cloudflare 等云平台，服务器位于中国香港、新加坡或美国等地。技术日志存储于服务器日志系统中。</p>
                
                <h3>3.2 存储期限</h3>
                <ul>
                  <li>服务器访问日志：自动轮转保留 30-90 天</li>
                  <li>错误监控日志：保留 90 天</li>
                  <li>您浏览器本地的计算参数：除非您清除浏览器缓存，否则长期保留</li>
                </ul>

                <h3>3.3 安全措施</h3>
                <ul>
                  <li>全站 HTTPS 加密传输</li>
                  <li>严格的内容安全策略 (CSP)</li>
                  <li>最小权限原则，服务端不存储用户财务数据</li>
                  <li>定期安全扫描与依赖漏洞检测</li>
                </ul>

                <h2 id="rights">4. 您的权利</h2>
                <p>根据《个人信息保护法》等法规，您享有以下权利：</p>
                <ul>
                  <li><strong>知情权</strong>：了解我们处理您信息的规则</li>
                  <li><strong>访问权</strong>：请求查看我们持有的关于您的技术日志</li>
                  <li><strong>更正权</strong>：要求更正不准确的技术信息</li>
                  <li><strong>删除权</strong>：要求删除您的技术日志（法律要求保留的除外）</li>
                  <li><strong>撤回同意权</strong>：随时禁用浏览器 Cookie 拒绝广告个性化</li>
                  <li><strong>注销账号权</strong>：本工具无账号体系，无需注销</li>
                </ul>
                <p>行使权请求请发邮件至：<a href={`mailto:${siteConfig.contact.email}`} className="text-primary-600 hover:underline">{siteConfig.contact.email}</a></p>

                <h2 id="cookies">5. Cookie 与同类技术</h2>
                <h3>5.1 必要 Cookie</h3>
                <p>维持会话、保障安全、记住语言偏好等，无法禁用。</p>
                <h3>5.2 分析 Cookie</h3>
                <p>Google Analytics / Umami 用于匿名统计，可在浏览器设置中禁用。</p>
                <h3>5.3 广告 Cookie</h3>
                <p>Google AdSense 用于个性化广告，您可访问 <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Google 广告设置</a> 关闭个性化广告。</p>

                <h2 id="third-party">6. 第三方链接</h2>
                <p>本站可能包含指向第三方网站的链接（如 GitHub、社交媒体、广告落地页）。我们不对第三方隐私实践负责，建议您访问其隐私政策。</p>

                <h2 id="children">7. 儿童隐私</h2>
                <p>本工具不面向 14 周岁以下儿童。我们不会故意收集儿童个人信息。如发现误收集，将立即删除。</p>

                <h2 id="transfer">8. 跨境传输</h2>
                <p>服务器可能位于中国大陆境外，技术日志会跨境传输。我们会采取标准合同条款等合规措施保障数据安全。</p>

                <h2 id="changes">9. 政策变更</h2>
                <p>我们可能不时更新本政策。重大变更将在网站显著位置通知或发送邮件提醒。建议定期查看本页面。</p>

                <h2 id="contact">10. 联系我们</h2>
                <p>如有任何隐私相关疑问、投诉或建议，请联系：</p>
                <ul>
                  <li>邮箱：<a href={`mailto:${siteConfig.contact.email}`} className="text-primary-600 hover:underline">{siteConfig.contact.email}</a></li>
                  <li>微信：{siteConfig.contact.wechat}</li>
                </ul>
                <p>我们将在 15 个工作日内回复。</p>

                <hr className="my-12 border-slate-200 dark:border-slate-700" />
                <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
                  本隐私政策版本：v1.0 · 发布日期：{lastUpdated} · 适用于 {siteConfig.name} 及其关联小程序
                </p>
              </div>
            </div>
          </section>

          <AdInArticle />
        </main>
</div>
    </>
  );
}