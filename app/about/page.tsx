import { Metadata } from 'next';
import {Header} from '@/components/layout';
import { AdSenseAutoAds, AdInArticle } from '@/components/adsense';
import { siteConfig } from '@/lib/site-config';
import Link from 'next/link';
import { Shield, Calculator, TrendingUp, BookOpen, Heart, Coffee, Mail, MessageSquare, Github, Twitter, Globe, Award, Users, Lightbulb, Rocket, Code } from 'lucide-react';

export const metadata: Metadata = {
  title: '关于我们',
  description: `${siteConfig.name} - 专业的在线复利计算器。了解我们的使命、团队与愿景。`,
};

export default function AboutPage() {
  return (
    <>
      <AdSenseAutoAds />
      <div className="min-h-screen flex flex-col">
        <Header currentPath="/about" />
        
        <main className="flex-1">
          <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
            <div className="container-custom">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 text-sm font-medium mb-6">
                  <Heart className="h-4 w-4" aria-hidden="true" />
                  用心做工具，专注长期价值
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
                  关于 <span className="text-primary-600 dark:text-primary-400">{siteConfig.name}</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto">
                  一个专注于复利计算的专业在线工具。我们相信：复利是世界第八大奇迹，
                  理解它的人收取它，不理解它的人支付它。我们的使命是让每个人都能
                  用得起、看得懂、信得过专业级的财务规划工具。
                </p>
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Shield className="h-4 w-4" aria-hidden="true" />
                    纯前端计算
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" aria-hidden="true" />
                    详细明细表
                  </span>
                  <span className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" aria-hidden="true" />
                    可视化图表
                  </span>
                  <span className="flex items-center gap-1">
                    <Globe className="h-4 w-4" aria-hidden="true" />
                    多语言支持
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <AdInArticle />
                
                <div className="text-center mb-16">
                  <h2 className="section-title">我们的故事</h2>
                  <p className="section-subtitle">为什么要做这个工具？</p>
                </div>

                <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
                  <p className="text-lg leading-relaxed">
                    创始人在个人投资实践中发现：市面上的复利计算器要么功能简陋、要么界面复杂、
                    要么数据上传服务器存在隐私担忧。大多数普通投资者在做长期规划（养老、教育金、
                    首付、财务自由）时，缺乏一个<strong>专业、免费、隐私安全、中文友好</strong>的计算工具。
                  </p>
                  
                  <p className="leading-relaxed">
                    于是我们决定自己造一个：<strong>纯前端运行、零数据上传、专业级计算引擎、
                    可视化图表、年度明细表、关键指标分析</strong>，所有功能免费开放，无需注册登录。
                  </p>

                  <blockquote className="border-l-4 border-primary-500 pl-6 my-8 italic text-slate-700 dark:text-slate-300">
                    "复利是世界第八大奇迹。理解它的人收取它，不理解它的人支付它。"
                    <footer className="not-italic mt-2 text-sm text-slate-500 dark:text-slate-400">
                      — 爱因斯坦（据传）
                    </footer>
                  </blockquote>

                  <p className="leading-relaxed">
                    我们希望这个工具能帮助更多人：<strong>看清复利的力量，制定科学的投资计划，
                    坚持长期主义，实现财富稳健增值</strong>。
                  </p>
                </div>

                <h2 className="section-title text-center mb-12">核心价值观</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <ValueCard
                    icon={<Shield className="h-6 w-6" aria-hidden="true" />}
                    title="隐私至上"
                    description="纯前端计算，财务数据不上传服务器，不记录、不分析、不贩卖。您的财富规划，只属于您。"
                  />
                  <ValueCard
                    icon={<Calculator className="h-6 w-6" aria-hidden="true" />}
                    title="专业可靠"
                    description="标准复利公式，支持月/季/年复利频率，年度明细表逐行可验证，经得起专业人士审视。"
                  />
                  <ValueCard
                    icon={<Heart className="h-6 w-6" aria-hidden="true" />}
                    title="长期主义"
                    description="不追求短期流量变现，专注工具本身的长期价值。免费开放，持续迭代，陪伴您的复利之旅。"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950">
            <div className="container-custom">
              <div className="text-center mb-16">
                <h2 className="section-title">功能特色</h2>
                <p className="section-subtitle">为长期投资者精心打磨的专业工具箱</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FeatureCard
                  icon={<Calculator className="h-6 w-6" aria-hidden="true" />}
                  title="多维度参数设置"
                  features={[
                    '初始本金、每月定投灵活设定',
                    '年化收益率 0-100% 自由输入',
                    '投资年限 1-50 年任选',
                    '月/季/年三种复利频率',
                    '人民币/美元/港币多币种显示',
                  ]}
                />
                <FeatureCard
                  icon={<TrendingUp className="h-6 w-6" aria-hidden="true" />}
                  title="可视化图表分析"
                  features={[
                    '账户总价值 vs 累计投入双曲线对比',
                    '交互式工具提示，逐年数据清晰可见',
                    '响应式设计，手机电脑完美适配',
                    '复利效应一眼看穿，直观震撼',
                  ]}
                />
                <FeatureCard
                  icon={<BookOpen className="h-6 w-6" aria-hidden="true" />}
                  title="年度明细表"
                  features={[
                    '每年期初余额、本年投入、本年收益、期末余额',
                    '表格支持横向滚动，手机端友好',
                    '数据可一键复制，导入 Excel 进一步分析',
                  ]}
                />
                <FeatureCard
                  icon={<Lightbulb className="h-6 w-6" aria-hidden="true" />}
                  title="关键洞察指标"
                  features={[
                    '复利贡献率：财富中来自复利的比例',
                    '资金倍数：最终财富是投入的多少倍',
                    '年均收益：每年平均获得的复利收益',
                    '助您量化复利效应，科学决策',
                  ]}
                />
                <FeatureCard
                  icon={<Shield className="h-6 w-6" aria-hidden="true" />}
                  title="隐私与安全"
                  features={[
                    '纯前端运行，零数据上传',
                    '无需注册登录，无账号体系',
                    'HTTPS 全站加密，CSP 安全策略',
                    '不植入追踪代码，尊重用户隐私',
                  ]}
                />
                <FeatureCard
                  icon={<Rocket className="h-6 w-6" aria-hidden="true" />}
                  title="开箱即用体验"
                  features={[
                    '秒开页面，无加载等待',
                    '参数调整实时重算，毫秒级响应',
                    'PWA 支持，可安装为桌面应用',
                    '离线可用，断网也能算',
                  ]}
                />
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
            <div className="container-custom">
              <div className="text-center mb-16">
                <h2 className="section-title">适用人群与场景</h2>
                <p className="section-subtitle">只要涉及长期资金规划，都能用得上</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <ScenarioCard
                  icon="👨‍👩‍👧‍👦"
                  title="普通家庭"
                  scenarios={[
                    '养老金储备规划',
                    '子女教育金准备',
                    '首付/改善型置业积累',
                    '家庭应急备用金增值',
                  ]}
                />
                <ScenarioCard
                  icon="🧑‍💼"
                  title="职场人士"
                  scenarios={[
                    '年终奖/公积金投资规划',
                    '薪资结余定投策略测算',
                    '跳槽/创业过渡资金准备',
                    '财务自由（FIRE）进度追踪',
                  ]}
                />
                <ScenarioCard
                  icon="📚"
                  title="投资学习者"
                  scenarios={[
                    '复利原理直观教学演示',
                    '不同收益率/时间对比实验',
                    '定投 vs 一次性投入策略对比',
                    '投资组合长期预期收益估算',
                  ]}
                />
                <ScenarioCard
                  icon="🏢"
                  title="专业从业者"
                  scenarios={[
                    '理财顾问客户方案快速演示',
                    '保险代理人养老金方案测算',
                    '银行客户经理理财规划辅助',
                    '财经内容创作者数据素材生成',
                  ]}
                />
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950">
            <div className="container-custom">
              <div className="text-center mb-16">
                <h2 className="section-title">技术栈与开源</h2>
                <p className="section-subtitle">现代化技术栈，代码开源透明</p>
              </div>
              <div className="max-w-3xl mx-auto">
                <div className="card p-6 md:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <Code className="h-5 w-5 text-primary-600" aria-hidden="true" />
                        Web 端技术栈
                      </h3>
                      <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                        <li><strong>框架</strong>：Next.js 14 (App Router) + React 18</li>
                        <li><strong>语言</strong>：TypeScript 严格模式</li>
                        <li><strong>样式</strong>：Tailwind CSS + CSS Variables</li>
                        <li><strong>图表</strong>：Chart.js + react-chartjs-2</li>
                        <li><strong>图标</strong>：Lucide React</li>
                        <li><strong>部署</strong>：Vercel / Cloudflare Pages</li>
                        <li><strong>静态导出</strong>：支持纯静态托管</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <Rocket className="h-5 w-5 text-primary-600" aria-hidden="true" />
                        小程序端技术栈
                      </h3>
                      <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                        <li><strong>框架</strong>：Taro 4.x (React 语法)</li>
                        <li><strong>目标</strong>：微信小程序</li>
                        <li><strong>复用</strong>：核心计算逻辑 100% 共享</li>
                        <li><strong>广告</strong>：微信流量主原生组件</li>
                        <li><strong>云开发</strong>：可选云函数/数据库</li>
                        <li><strong>发布</strong>：微信开发者工具一键上传</li>
                      </ul>
                    </div>
                  </div>
                  <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
                    <h3 className="font-semibold text-primary-800 dark:text-primary-200 mb-3 flex items-center gap-2">
                      <Github className="h-5 w-5" aria-hidden="true" />
                      开源地址
                    </h3>
                    <p className="text-sm text-primary-700 dark:text-primary-300 mb-2">
                      核心计算逻辑、UI 组件、配置文件已开源，欢迎 Star、Fork、PR、Issue。
                    </p>
                    <Link
                      href={siteConfig.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                    >
                      查看 GitHub 仓库
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
            <div className="container-custom">
              <div className="text-center mb-16">
                <h2 className="section-title">联系我们</h2>
                <p className="section-subtitle">有建议、发现 Bug、想合作、想聊天，都欢迎</p>
              </div>
              <div className="max-w-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                <ContactCard
                  icon={<Mail className="h-6 w-6" aria-hidden="true" />}
                  title="邮箱"
                  content={siteConfig.contact.email}
                  action="发送邮件"
                  href={`mailto:${siteConfig.contact.email}`}
                />
                <ContactCard
                  icon={<MessageSquare className="h-6 w-6" aria-hidden="true" />}
                  title="微信"
                  content={siteConfig.contact.wechat}
                  action="添加好友"
                  href="#"
                  note="备注：来自复利计算器"
                />
                <ContactCard
                  icon={<Github className="h-6 w-6" aria-hidden="true" />}
                  title="GitHub"
                  content="Issues / PR / Discussions"
                  action="去反馈"
                  href={siteConfig.social.github}
                />
              </div>
              <div className="mt-12 text-center">
                <p className="text-slate-600 dark:text-slate-400">
                  我们会在 1-3 个工作日内回复。如果您觉得工具有用，
                  欢迎分享给身边需要的人 —— 这也是对我们最大的支持。
                </p>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24 bg-slate-900 dark:bg-slate-900">
            <div className="container-custom">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  开始您的复利之旅
                </h2>
                <p className="text-slate-300 mb-8 text-lg">
                  复利需要时间，时间需要耐心。现在开始，永远不晚。
                </p>
                <Link
                  href="/calculator"
                  className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-100"
                >
                  <Calculator className="h-5 w-5" aria-hidden="true" />
                  免费使用计算器
                </Link>
              </div>
            </div>
          </section>

          <AdInArticle />
        </main>
</div>
    </>
  );
}

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ValueCard({ icon, title, description }: ValueCardProps) {
  return (
    <div className="card p-6 md:p-8 text-center">
      <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 w-fit mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  features: string[];
}

function FeatureCard({ icon, title, features }: FeatureCardProps) {
  return (
    <article className="card p-6 md:p-8 hover:shadow-lg transition-shadow duration-300">
      <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 w-fit mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">{title}</h3>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3 text-slate-600 dark:text-slate-400 text-sm">
            <svg className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
    </article>
  );
}

interface ScenarioCardProps {
  icon: string;
  title: string;
  scenarios: string[];
}

function ScenarioCard({ icon, title, scenarios }: ScenarioCardProps) {
  return (
    <article className="card p-6 md:p-8">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{icon}</span>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
      </div>
      <ul className="space-y-2">
        {scenarios.map((scenario, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <svg className="h-4 w-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            {scenario}
          </li>
        ))}
      </ul>
    </article>
  );
}

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  action: string;
  href: string;
  note?: string;
}

function ContactCard({ icon, title, content, action, href, note }: ContactCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="card p-6 text-center hover:shadow-lg transition-shadow duration-300 group"
    >
      <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 font-mono mb-3 break-all">{content}</p>
      {note && <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{note}</p>}
      <span className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
        {action}
        <svg className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </a>
  );
}