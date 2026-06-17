import { Metadata } from 'next';
import {Header} from '@/components/layout';
import { CalculatorForm } from '@/components/calculator-form';
import { AdSenseAutoAds, AdHeader, AdFooter, AdInArticle } from '@/components/adsense';
import { siteConfig } from '@/lib/site-config';
import { Calculator, Info, Shield, BookOpen } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '复利计算器',
  description: '专业在线复利计算器，支持定投、复利频率、收益可视化图表、年度明细表、关键洞察分析。免费无需注册，数据不上云。',
  openGraph: {
    title: '复利计算器 - 专业定投收益测算工具',
    description: '支持初始本金、每月定投、复利频率、年化收益率自定义，提供详细年度明细表、可视化增长图表。',
    type: 'website',
  },
};

const faqs = [
  {
    q: '什么是复利？',
    a: '复利是指利息也能产生利息的计息方式。即将利息并入本金，下一期按新本金计算利息，形成"利滚利"的效果。爱因斯坦曾称复利为"世界第八大奇迹"。',
  },
  {
    q: '复利频率对收益影响大吗？',
    a: '影响明显。相同年化收益率下，复利频率越高（月>季>年），最终收益越高。因为资金更快进入下一轮增值周期。长期投资中，月复利比年复利收益可高出10%-20%以上。',
  },
  {
    q: '定投和一次性投入哪个收益高？',
    a: '取决于市场走势。单边上涨行情中一次性投入收益更高；震荡下跌行情中定投能平摊成本、降低风险。定投适合普通投资者长期持有，一次性投入适合有大额闲置资金且看好长期趋势的投资者。',
  },
  {
    q: '计算器的数据准确吗？',
    a: '本计算器采用标准复利公式计算，结果仅供参考。实际投资收益受市场波动、手续费、税收、分红再投资等因素影响，会有所差异。请以实际账户为准。',
  },
  {
    q: '我的财务数据会被保存吗？',
    a: '不会。本工具纯前端运行，所有计算在您的浏览器本地完成，数据不会上传至任何服务器，也不会被记录或分享。您可以放心使用。',
  },
  {
    q: '年化收益率该设置多少？',
    a: '参考历史长期收益：货币基金 2%-3%，债券基金 4%-6%，股票型基金 8%-12%，指数基金长期约 7%-10%。建议根据自身风险承受能力和资产配置设定保守预期。',
  },
];

const useCases = [
  {
    title: '养老金规划',
    desc: '计算每月定投多少，退休时能积累多少养老储备',
    icon: '🏠',
  },
  {
    title: '子女教育金',
    desc: '规划10-18年后的教育支出，反推当前需要定投金额',
    icon: '🎓',
  },
  {
    title: '首付积累',
    desc: '测算买房首付目标，制定每月储蓄投资计划',
    icon: '🏘️',
  },
  {
    title: '财务自由测算',
    desc: '计算达到"被动收入覆盖生活支出"所需本金与时间',
    icon: '💰',
  },
  {
    title: '投资组合评估',
    desc: '对比不同收益率、不同时间跨度下的财富增长差异',
    icon: '📊',
  },
  {
    title: '定投策略优化',
    desc: '测试不同定投金额、频率对最终收益的影响',
    icon: '⚙️',
  },
];

export default function CalculatorPage() {
  return (
    <>
      <AdSenseAutoAds />
      <div className="min-h-screen flex flex-col">
        <Header currentPath="/calculator" />
        
        <main className="flex-1">
          {/* Page Header */}
          <section className="py-12 md:py-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
            <div className="container-custom">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 text-sm font-medium mb-6">
                  <Calculator className="h-4 w-4" aria-hidden="true" />
                  专业复利计算器
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
                  在线复利收益测算
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                  支持初始本金、每月定投、复利频率、年化收益率自定义设置。
                  提供详细年度明细表、可视化增长图表、关键洞察分析。
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Shield className="h-4 w-4" aria-hidden="true" />
                    纯前端计算
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" aria-hidden="true" />
                    详细明细
                  </span>
                  <span className="flex items-center gap-1">
                    <Info className="h-4 w-4" aria-hidden="true" />
                    关键指标
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Calculator Main */}
          <section id="calculator" className="py-8 md:py-12 bg-white dark:bg-slate-900">
            <div className="container-custom">
              <AdHeader />
              <div className="max-w-4xl mx-auto">
                <CalculatorForm />
              </div>
              <AdFooter />
            </div>
          </section>

          {/* Use Cases */}
          <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950">
            <div className="container-custom">
              <div className="text-center mb-12">
                <h2 className="section-title">适用场景</h2>
                <p className="section-subtitle">复利计算器可应用于各类长期财务规划场景</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {useCases.map((useCase, index) => (
                  <article key={index} className="card p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="text-3xl mb-4">{useCase.icon}</div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      {useCase.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {useCase.desc}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
            <div className="container-custom">
              <div className="text-center mb-12">
                <h2 className="section-title">常见问题</h2>
                <p className="section-subtitle">关于复利计算与投资规划的常见疑问解答</p>
              </div>
              <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, index) => (
                  <details key={index} className="group card p-6">
                    <summary className="flex items-center justify-between cursor-pointer list-none font-medium text-slate-900 dark:text-white">
                      <span>{faq.q}</span>
                      <svg className="h-5 w-5 text-slate-400 transition-transform duration-200 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed prose prose-sm dark:prose-invert max-w-none">
                      <p>{faq.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* Formula Explanation */}
          <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950">
            <div className="container-custom">
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="section-title">复利计算公式</h2>
                  <p className="section-subtitle">了解计算原理，做更明智的投资决策</p>
                </div>
                <div className="card p-6 md:p-8 overflow-x-auto">
                  <pre className="text-sm text-slate-700 dark:text-slate-300 font-mono leading-relaxed"><code>{`// 复利终值公式（含定期定额投入）
FV = P × (1 + r/n)^(n×t) + PMT × [((1 + r/n)^(n×t) - 1) / (r/n)]

其中：
FV = 终值（最终账户价值）
P  = 初始本金
PMT = 每期定投金额
r  = 年化收益率（小数形式，如 7% = 0.07）
n  = 每年复利次数（月复利=12，季复利=4，年复利=1）
t  = 投资年数

// 示例：初始1万，月定投1千，年化7%，月复利，投10年
// FV = 10000 × (1 + 0.07/12)^(120) + 1000 × [((1 + 0.07/12)^120 - 1) / (0.07/12)]
// FV ≈ 181,669 元`}</code></pre>
                </div>
                <div className="mt-6 card p-6 bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800">
                  <h3 className="font-semibold text-primary-800 dark:text-primary-200 mb-3 flex items-center gap-2">
                    <Info className="h-5 w-5" aria-hidden="true" />
                    重要提示
                  </h3>
                  <ul className="text-sm text-primary-700 dark:text-primary-300 space-y-2 list-disc list-inside">
                    <li>本计算器结果仅供参考，不构成投资建议</li>
                    <li>实际投资收益受市场波动、费率、税收等因素影响</li>
                    <li>过往业绩不代表未来表现，投资有风险，入市需谨慎</li>
                    <li>建议咨询专业理财顾问制定个性化投资方案</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <AdInArticle />
        </main>
</div>
    </>
  );
}