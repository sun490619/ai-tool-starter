/**
 * Compound Interest Calculator Core Logic
 * Shared between Web (Next.js) and WeChat Mini Program
 */

export interface CalculatorInputs {
  principal: number;        // 初始本金
  monthlyContribution: number;  // 每月定投金额
  annualRate: number;       // 年化收益率 (%)
  years: number;            // 投资年限
  compoundFrequency: 'monthly' | 'quarterly' | 'annually';  // 复利频率
}

export interface YearlyData {
  year: number;
  startBalance: number;
  contributions: number;
  interest: number;
  endBalance: number;
}

export interface CalculatorResult {
  finalAmount: number;
  totalContributions: number;
  totalInterest: number;
  yearlyBreakdown: YearlyData[];
  chartData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
      fill: boolean;
    }[];
  };
}

/**
 * 计算复利收益
 */
export function calculateCompoundInterest(inputs: CalculatorInputs): CalculatorResult {
  const {
    principal,
    monthlyContribution,
    annualRate,
    years,
    compoundFrequency = 'monthly',
  } = inputs;

  const rate = annualRate / 100;
  let periodsPerYear = 12;
  
  switch (compoundFrequency) {
    case 'quarterly':
      periodsPerYear = 4;
      break;
    case 'annually':
      periodsPerYear = 1;
      break;
    default:
      periodsPerYear = 12;
  }

  const periodicRate = rate / periodsPerYear;
  const totalPeriods = years * periodsPerYear;
  const contributionPerPeriod = monthlyContribution * (12 / periodsPerYear);

  let balance = principal;
  let totalContributions = principal;
  const yearlyBreakdown: YearlyData[] = [];

  for (let year = 1; year <= years; year++) {
    const startBalance = balance;
    let yearlyContributions = 0;
    let yearlyInterest = 0;

    for (let period = 0; period < periodsPerYear; period++) {
      const interest = balance * periodicRate;
      balance += interest + contributionPerPeriod;
      yearlyInterest += interest;
      yearlyContributions += contributionPerPeriod;
    }

    totalContributions += yearlyContributions;
    yearlyBreakdown.push({
      year,
      startBalance,
      contributions: yearlyContributions,
      interest: yearlyInterest,
      endBalance: balance,
    });
  }

  const finalAmount = balance;
  const totalInterest = finalAmount - totalContributions;

  // 生成图表数据
  const labels = yearlyBreakdown.map((d) => `第 ${d.year} 年`);
  const balanceData = yearlyBreakdown.map((d) => Math.round(d.endBalance));
  const contributionData = yearlyBreakdown.map((d) => 
    Math.round(yearlyBreakdown.slice(0, d.year).reduce((sum, y) => sum + y.contributions, 0) + principal)
  );

  return {
    finalAmount,
    totalContributions,
    totalInterest,
    yearlyBreakdown,
    chartData: {
      labels,
      datasets: [
        {
          label: '账户总价值',
          data: balanceData,
          borderColor: '#0ea5e9',
          backgroundColor: 'rgba(14, 165, 233, 0.1)',
          fill: true,
        },
        {
          label: '累计投入',
          data: contributionData,
          borderColor: '#64748b',
          backgroundColor: 'rgba(100, 116, 139, 0.1)',
          fill: true,
        },
      ],
    },
  };
}

/**
 * 格式化数字为货币字符串
 */
export function formatCurrency(value: number, currency: 'CNY' | 'USD' = 'CNY'): string {
  return new Intl.NumberFormat(currency === 'CNY' ? 'zh-CN' : 'en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * 格式化数字为标准数字格式（带千分位）
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('zh-CN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * 默认输入值
 */
export const DEFAULT_INPUTS: CalculatorInputs = {
  principal: 10000,
  monthlyContribution: 1000,
  annualRate: 7,
  years: 10,
  compoundFrequency: 'monthly',
};

/**
 * 输入验证
 */
export function validateInputs(inputs: Partial<CalculatorInputs>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (inputs.principal !== undefined && inputs.principal < 0) {
    errors.push('初始本金不能为负数');
  }
  if (inputs.monthlyContribution !== undefined && inputs.monthlyContribution < 0) {
    errors.push('每月定投金额不能为负数');
  }
  if (inputs.annualRate !== undefined && (inputs.annualRate < 0 || inputs.annualRate > 100)) {
    errors.push('年化收益率应在 0-100% 之间');
  }
  if (inputs.years !== undefined && (inputs.years < 1 || inputs.years > 50)) {
    errors.push('投资年限应在 1-50 年之间');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}