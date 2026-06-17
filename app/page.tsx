import { Metadata } from 'next';
import {Header} from '@/components/layout';
import { CalculatorForm } from '@/components/calculator-form';
import { AdSenseAutoAds, AdInArticle } from '@/components/adsense';
import { siteConfig } from '@/lib/site-config';
import Link from 'next/link';
import { Calculator, TrendingUp, Shield, Zap, BookOpen, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: '专业在线复利计算器 - 定投收益可视化 | 财富规划工具',
  description: '免费在线复利计算器，支持初始本金、每月定投、复利频率设置、年化收益率自定义。提供详细年度明细表、可视化增长图表、关键洞察分析，助您科学规划投资未来。',
  keywords: siteConfig.seo.keywords,
  openGraph: {
    title: '专业在线复利计算器 - 定投收益可视化',
    description: '免费复利计算器，支持定投、复利频率、收益可视化，助您财富增值规划。',
    type: 'website',
  },
};

const features = [
  {
    icon: Calculator,
    title: '专业计算引擎',
    description: '支持月/季/年复利频率，精确计算每年本金、投入、收益、期末余额',
  },
  {
    icon: TrendingUp,
    title: '可视化图表',
    description: '直观展示账户总价值与累计投入对比，一眼看清复利效应',
  },
  {
    icon: Shield,
    title: '隐私保护',
    description: '纯前端计算，数据不上传服务器，您的财务信息完全私密',
  },
  {
    icon: Zap,
    title: '即时结果',
    description: '参数调整实时重算，无需等待，支持多币种显示',
  },
  {
    icon: BookOpen,
    title: '年度明细表',
    description: '每年期初余额、本年投入、本年收益、期末余额一目了然',
  },
  {
    icon: Users,
    title: '关键洞察',
    description: '自动计算复利贡献率、资金倍数、年均收益等核心指标',
  },
];

export default function HomePage() {
  return (
    <>
      <AdSenseAutoAds />
      <div className="min-h-screen flex flex-col">
        <Header currentPath="/" />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
            <div className="container-custom">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 text-sm font-medium mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                  </span>
                  完全免费 · 无需注册 · 数据不上云
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
                  专业{' '}
                  <span className="text-primary-600 dark:text-primary-400">复利计算器</span>
                  {' '}在线工具
                </h1>
                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto">
                  支持初始本金、每月定投、复利频率、年化收益率自定义设置。
                  提供详细年度明细表、可视化增长图表、关键洞察分析，助您科学规划投资未来。
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                  <Link
                    href="/calculator"
                    className="btn-primary text-lg px-8 py-4"
                  >
                    <Calculator className="h-5 w-5 mr-2" aria-hidden="true" />
                    立即开始计算
                  </Link>
                  <Link
                    href="/about"
                    className="btn-secondary text-lg px-8 py-4"
                  >
                    了解详情
                  </Link>
                </div>
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
                </div>
              </div>
            </div>
          </section>

          {/* Calculator Preview Section */}
          <section id="calculator" className="py-16 md:py-24 bg-white dark:bg-slate-900">
            <div className="container-custom">
              <div className="text-center mb-12">
                <h2 className="section-title">在线复利计算器</h2>
                <p className="section-subtitle">调整参数，实时查看复利增长效果</p>
              </div>
              <div className="max-w-4xl mx-auto">
                <CalculatorForm />
              </div>
              <div className="text-center mt-8">
                <Link href="/calculator" className="btn-primary inline-flex items-center gap-2">
                  查看完整版计算器
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950">
            <div className="container-custom">
              <div className="text-center mb-16">
                <h2 className="section-title">核心功能特性</h2>
                <p className="section-subtitle">专为长期投资者设计的专业工具箱</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {features.map((feature, index) => (
                  <article
                    key={index}
                    className="card p-6 md:p-8 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 w-fit mb-4">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* How it works */}
          <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
            <div className="container-custom">
              <div className="text-center mb-16">
                <h2 className="section-title">如何使用</h2>
                <p className="section-subtitle">三步完成专业复利收益测算</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <StepCard
                  step="01"
                  title="填写参数"
                  description="输入初始本金、每月定投金额、预期年化收益率、投资年限，选择复利频率和显示货币"
                  icon={<Calculator className="h-6 w-6" aria-hidden="true" />}
                />
                <StepCard
                  step="02"
                  title="查看结果"
                  description="实时生成最终账户价值、累计投入本金、复利收益总额，附带可视化增长图表"
                  icon={<TrendingUp className="h-6 w-6" aria-hidden="true" />}
                />
                <StepCard
                  step="03"
                  title="深度分析"
                  description="查看年度明细表、复利贡献率、资金倍数等关键指标，为投资决策提供数据支持"
                  icon={<BookOpen className="h-6 w-6" aria-hidden="true" />}
                />
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 md:py-24 bg-slate-900 dark:bg-slate-900">
            <div className="container-custom">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  开始您的复利之旅
                </h2>
                <p className="text-slate-300 mb-8 text-lg">
                  复利是世界第八大奇迹。了解它的人收取它，不了解它的人支付它。
                  立即使用我们的专业计算器，为您的财富增值制定科学计划。
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

          {/* Ad In Article */}
          <AdInArticle />
        </main>
</div>
    </>
  );
}

interface StepCardProps {
  step: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

function StepCard({ step, title, description, icon }: StepCardProps) {
  return (
    <div className="relative card p-6 md:p-8">
      <div className="absolute -top-3 left-6 bg-white dark:bg-slate-900 px-2 text-xs font-bold text-primary-600 dark:text-primary-400">
        {step}
      </div>
      <div className="pt-4">
        <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 w-fit mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}