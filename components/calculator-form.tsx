'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  calculateCompoundInterest,
  formatCurrency,
  formatNumber,
  validateInputs,
  DEFAULT_INPUTS,
  type CalculatorInputs,
  type CalculatorResult,
} from '@/lib/calculator';
import { siteConfig } from '@/lib/site-config';
import {
  Calculator,
  TrendingUp,
  DollarSign,
  Calendar,
  Settings,
  Copy,
  Check,
  AlertCircle,
  Info,
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// 注册 Chart.js 组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

interface CalculatorFormProps {
  initialInputs?: Partial<CalculatorInputs>;
}

export function CalculatorForm({ initialInputs = {} }: CalculatorFormProps) {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    ...DEFAULT_INPUTS,
    ...initialInputs,
  });
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [currency, setCurrency] = useState<'CNY' | 'USD'>(siteConfig.tool.defaultCurrency as 'CNY' | 'USD');

  // 计算结果
  const computedResult = useMemo(() => {
    const validation = validateInputs(inputs);
    setErrors(validation.errors);
    if (!validation.valid) return null;
    return calculateCompoundInterest(inputs);
  }, [inputs]);

  useEffect(() => {
    if (computedResult) {
      setResult(computedResult);
    }
  }, [computedResult]);

  const handleInputChange = (field: keyof CalculatorInputs, value: number | string) => {
    const numValue = typeof value === 'string' ? parseFloat(value) || 0 : value;
    setInputs((prev) => ({ ...prev, [field]: numValue }));
  };

  const handleCurrencyChange = (newCurrency: 'CNY' | 'USD') => {
    setCurrency(newCurrency);
  };

  const copyResult = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  const formatResult = (value: number) => formatCurrency(value, currency);

  if (!result) {
    return (
      <div className="card p-6 md:p-8">
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-slate-400 mx-auto mb-4" aria-hidden="true" />
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">请检查输入</h3>
          <p className="text-slate-600 dark:text-slate-400">{errors.join('、')}</p>
        </div>
      </div>
    );
  }

  const { finalAmount, totalContributions, totalInterest, yearlyBreakdown, chartData } = result;

  return (
    <div className="space-y-6 md:space-y-8">
      {/* 输入表单 */}
      <div className="card p-6 md:p-8">
        <h2 className="section-title flex items-center gap-2">
          <Calculator className="h-6 w-6 text-primary-600" aria-hidden="true" />
          计算参数
        </h2>
        <p className="section-subtitle">填写以下参数，点击计算查看复利收益详情</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-6">
          {/* 初始本金 */}
          <div>
            <label htmlFor="principal" className="label">初始本金</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">{siteConfig.tool.currencies.find(c => c.code === currency)?.symbol || '¥'}</span>
              <input
                id="principal"
                type="number"
                min="0"
                step="100"
                value={inputs.principal}
                onChange={(e) => handleInputChange('principal', e.target.value)}
                className="input-field pl-8"
                aria-describedby="principal-help"
              />
            </div>
            <p id="principal-help" className="mt-1 text-xs text-slate-500 dark:text-slate-400">一次性投入的初始金额</p>
          </div>

          {/* 每月定投 */}
          <div>
            <label htmlFor="monthlyContribution" className="label">每月定投</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">{siteConfig.tool.currencies.find(c => c.code === currency)?.symbol || '¥'}</span>
              <input
                id="monthlyContribution"
                type="number"
                min="0"
                step="100"
                value={inputs.monthlyContribution}
                onChange={(e) => handleInputChange('monthlyContribution', e.target.value)}
                className="input-field pl-8"
                aria-describedby="monthly-help"
              />
            </div>
            <p id="monthly-help" className="mt-1 text-xs text-slate-500 dark:text-slate-400">每月定期追加投资金额</p>
          </div>

          {/* 年化收益率 */}
          <div>
            <label htmlFor="annualRate" className="label">年化收益率 (%)</label>
            <input
              id="annualRate"
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={inputs.annualRate}
              onChange={(e) => handleInputChange('annualRate', e.target.value)}
              className="input-field"
              aria-describedby="rate-help"
            />
            <p id="rate-help" className="mt-1 text-xs text-slate-500 dark:text-slate-400">预期年均收益率</p>
            {/* 预设按钮 */}
            <div className="flex flex-wrap gap-1 mt-2" role="group" aria-label="收益率预设">
              {siteConfig.tool.ratePresets.map((rate) => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => handleInputChange('annualRate', rate)}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    inputs.annualRate === rate
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
                  }`}
                >
                  {rate}%
                </button>
              ))}
            </div>
          </div>

          {/* 投资年限 */}
          <div>
            <label htmlFor="years" className="label">投资年限 (年)</label>
            <input
              id="years"
              type="number"
              min="1"
              max="50"
              step="1"
              value={inputs.years}
              onChange={(e) => handleInputChange('years', e.target.value)}
              className="input-field"
              aria-describedby="years-help"
            />
            <p id="years-help" className="mt-1 text-xs text-slate-500 dark:text-slate-400">计划投资的总年数</p>
          </div>
        </div>

        {/* 复利频率 */}
        <div className="mt-6">
          <label className="label">复利频率</label>
          <div className="flex flex-wrap gap-3" role="radiogroup" aria-label="复利频率选择">
            {siteConfig.tool.compoundFrequencies.map((freq) => (
              <label
                key={freq.value}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 cursor-pointer transition-all ${
                  inputs.compoundFrequency === freq.value
                    ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300 dark:border-primary-500'
                    : 'border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600'
                }`}
              >
                <input
                  type="radio"
                  name="compoundFrequency"
                  value={freq.value}
                  checked={inputs.compoundFrequency === freq.value}
                  onChange={() => handleInputChange('compoundFrequency', freq.value as CalculatorInputs['compoundFrequency'])}
                  className="sr-only"
                  aria-label={freq.label}
                />
                <span className="font-medium">{freq.label}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">{freq.description}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 货币选择 */}
        <div className="mt-6">
          <label className="label">显示货币</label>
          <div className="flex gap-3" role="radiogroup" aria-label="货币选择">
            {siteConfig.tool.currencies.map((curr) => (
              <label
                key={curr.code}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 cursor-pointer transition-all ${
                  currency === curr.code
                    ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300 dark:border-primary-500'
                    : 'border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600'
                }`}
              >
                <input
                  type="radio"
                  name="currency"
                  value={curr.code}
                  checked={currency === curr.code}
                  onChange={() => handleCurrencyChange(curr.code as 'CNY' | 'USD')}
                  className="sr-only"
                  aria-label={curr.name}
                />
                <span className="font-medium">{curr.symbol} {curr.name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* 结果摘要卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        <ResultCard
          icon={<TrendingUp className="h-6 w-6" aria-hidden="true" />}
          label="最终账户价值"
          value={formatResult(finalAmount)}
          description="本金 + 定投 + 复利收益"
          color="text-primary-600 dark:text-primary-400"
          copyText={formatNumber(finalAmount)}
          copyLabel="最终价值"
          copied={copied === '最终价值'}
        />
        <ResultCard
          icon={<DollarSign className="h-6 w-6" aria-hidden="true" />}
          label="累计投入本金"
          value={formatResult(totalContributions)}
          description="初始本金 + 所有定投金额"
          color="text-slate-600 dark:text-slate-400"
          copyText={formatNumber(totalContributions)}
          copyLabel="累计投入"
          copied={copied === '累计投入'}
        />
        <ResultCard
          icon={<Calendar className="h-6 w-6" aria-hidden="true" />}
          label="复利收益总额"
          value={formatResult(totalInterest)}
          description="钱生钱的收益"
          color="text-emerald-600 dark:text-emerald-400"
          copyText={formatNumber(totalInterest)}
          copyLabel="复利收益"
          copied={copied === '复利收益'}
        />
      </div>

      {/* 收益图表 */}
      <div className="card p-6 md:p-8">
        <h2 className="section-title flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-primary-600" aria-hidden="true" />
          复利增长可视化
        </h2>
        <p className="section-subtitle">蓝色曲线为账户总价值，灰色曲线为累计投入本金，差值即为复利收益</p>
        <div className="chart-container mt-4" role="img" aria-label="复利增长图表，展示账户总价值与累计投入的对比">
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              interaction: {
                mode: 'index' as const,
                intersect: false,
              },
              plugins: {
                legend: {
                  position: 'top' as const,
                  labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                      size: 13,
                    },
                  },
                },
                tooltip: {
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  padding: 12,
                  titleFont: { size: 14 },
                  bodyFont: { size: 13 },
                  callbacks: {
                    label: (context: any) => {
                      const label = context.dataset.label || '';
                      const value = context.raw || 0;
                      return `${label}: ${formatCurrency(value, currency)}`;
                    },
                  },
                },
              },
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                },
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: (value: any) => formatCurrency(value, currency),
                  },
                  grid: {
                    color: 'rgba(148, 163, 184, 0.1)',
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.3,
                  borderWidth: 3,
                },
                point: {
                  radius: 4,
                  hoverRadius: 6,
                },
              },
            }}
          />
        </div>
      </div>

      {/* 年度明细表格 */}
      <div className="card overflow-hidden">
        <div className="p-6 md:p-8 border-b border-slate-200 dark:border-slate-700">
          <h2 className="section-title flex items-center gap-2">
            <Settings className="h-6 w-6 text-primary-600" aria-hidden="true" />
            年度明细表
          </h2>
          <p className="section-subtitle">每年的本金、投入、收益、期末余额详细记录</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full" role="table">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">年份</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">期初余额</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">本年投入</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">本年收益</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">期末余额</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {yearlyBreakdown.map((year, index) => (
                <tr key={year.year} className={index % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-800/50'}>
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">第 {year.year} 年</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{formatResult(year.startBalance)}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{formatResult(year.contributions)}</td>
                  <td className="px-4 py-3 font-medium text-emerald-600 dark:text-emerald-400">{formatResult(year.interest)}</td>
                  <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">{formatResult(year.endBalance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 关键洞察 */}
      <div className="card p-6 md:p-8 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-900/10 border-primary-200 dark:border-primary-800">
        <h2 className="section-title flex items-center gap-2">
          <Info className="h-6 w-6 text-primary-600" aria-hidden="true" />
          关键洞察
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <InsightCard
            title="复利贡献率"
            value={`${((totalInterest / finalAmount) * 100).toFixed(1)}%`}
            description="最终财富中来自复利收益的比例"
            icon={<TrendingUp className="h-5 w-5" aria-hidden="true" />}
          />
          <InsightCard
            title="资金倍数"
            value={`${(finalAmount / totalContributions).toFixed(2)}x`}
            description="最终财富是累计投入的多少倍"
            icon={<DollarSign className="h-5 w-5" aria-hidden="true" />}
          />
          <InsightCard
            title="年均收益"
            value={formatResult(totalInterest / inputs.years)}
            description="每年平均获得的复利收益"
            icon={<Calendar className="h-5 w-5" aria-hidden="true" />}
          />
        </div>
      </div>
    </div>
  );
}

interface ResultCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
  color: string;
  copyText: string;
  copyLabel: string;
  copied: boolean;
}

function ResultCard({ icon, label, value, description, color, copyText, copyLabel, copied }: ResultCardProps) {
  return (
    <div className="result-card">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-lg bg-white/50 dark:bg-slate-800/50 ${color}`}>
          {icon}
        </div>
        {copied && (
          <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 animate-pulse">
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
            已复制
          </span>
        )}
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{label}</p>
      <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{value}</p>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{description}</p>
      <button
        onClick={() => navigator.clipboard.writeText(copyText)}
        className="text-xs font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 flex items-center gap-1"
        aria-label={`复制${copyLabel}`}
      >
        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
        复制数值
      </button>
    </div>
  );
}

interface InsightCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

function InsightCard({ title, value, description, icon }: InsightCardProps) {
  return (
    <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl p-5 border border-primary-100 dark:border-primary-900/30">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
          {icon}
        </div>
        <h3 className="font-medium text-slate-900 dark:text-white">{title}</h3>
      </div>
      <p className="text-2xl font-bold text-primary-700 dark:text-primary-300 mb-1">{value}</p>
      <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
    </div>
  );
}