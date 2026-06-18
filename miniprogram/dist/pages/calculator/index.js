// calculator/index.js
Page({
  data: {
    form: {
      principal: '10000',
      monthlyContribution: '1000',
      annualRate: '8',
      years: '20',
    },
    compoundOptions: [
      { value: 'annual', label: '年复利 (每年1次)' },
      { value: 'semi-annual', label: '半年复利 (每年2次)' },
      { value: 'quarterly', label: '季度复利 (每年4次)' },
      { value: 'monthly', label: '月复利 (每年12次) - 推荐' },
      { value: 'daily', label: '日复利 (每年365次)' },
    ],
    compoundIndex: 3, // 默认月复利
    currencyOptions: [
      { value: 'CNY', label: '人民币 (¥)' },
      { value: 'USD', label: '美元 ($)' },
      { value: 'EUR', label: '欧元 (€)' },
    ],
    currencyIndex: 0,
    loading: false,
    hasResult: false,
    chartReady: false,
    // 结果数据
    finalAmount: 0,
    totalGain: 0,
    totalInvested: 0,
    totalReturnRate: 0,
    compoundContribution: 0,
    fundMultiplier: 0,
    avgAnnualGain: 0,
    doublingTime: 0,
    yearlyData: [],
    currencySymbol: '¥',
  },

  onLoad() {
    this.setCurrencySymbol();
  },

  // 输入处理
  onPrincipalChange(e) {
    this.setData({ 'form.principal': e.detail.value });
  },
  onMonthlyChange(e) {
    this.setData({ 'form.monthlyContribution': e.detail.value });
  },
  onRateChange(e) {
    this.setData({ 'form.annualRate': e.detail.value });
  },
  onYearsChange(e) {
    this.setData({ 'form.years': e.detail.value });
  },
  onCompoundChange(e) {
    this.setData({ compoundIndex: parseInt(e.detail.value) });
  },
  onCurrencyChange(e) {
    this.setData({ currencyIndex: parseInt(e.detail.value) }, () => {
      this.setCurrencySymbol();
    });
  },

  setCurrencySymbol() {
    const symbols = { CNY: '¥', USD: '$', EUR: '€' };
    const currency = this.data.currencyOptions[this.data.currencyIndex].value;
    this.setData({ currencySymbol: symbols[currency] || '¥' });
  },

  // 获取复利频率数值
  getCompoundFrequency() {
    const map = {
      annual: 1,
      'semi-annual': 2,
      quarterly: 4,
      monthly: 12,
      daily: 365,
    };
    return map[this.data.compoundOptions[this.data.compoundIndex].value] || 12;
  },

  // 核心计算逻辑
  calculateCompoundInterest(inputs) {
    const {
      principal,
      monthlyContribution,
      annualRate,
      years,
      compoundFrequency,
    } = inputs;

    const P = parseFloat(principal) || 0;
    const PMT = parseFloat(monthlyContribution) || 0;
    const r = (parseFloat(annualRate) || 0) / 100;
    const n = compoundFrequency;
    const t = parseInt(years) || 1;

    // 期利率
    const i = r / n;
    // 总期数
    const totalPeriods = n * t;

    // 期初本金复利
    const principalFuture = P * Math.pow(1 + i, totalPeriods);

    // 定投复利 (期末投入)
    let contributionFuture = 0;
    const periodsPerYear = 12;
    const k = n / periodsPerYear; // 每月对应的复利周期数
    if (PMT > 0) {
      for (let year = 1; year <= t; year++) {
        for (let month = 1; month <= 12; month++) {
          const remainingPeriods = totalPeriods - (year - 1) * n - Math.ceil(month * k);
          if (remainingPeriods > 0) {
            contributionFuture += PMT * Math.pow(1 + i, remainingPeriods);
          }
        }
      }
    }

    const finalAmount = principalFuture + contributionFuture;
    const totalInvested = P + PMT * 12 * t;
    const totalGain = finalAmount - totalInvested;
    const totalReturnRate = totalInvested > 0 ? (totalGain / totalInvested) * 100 : 0;

    // 仅本金复利收益
    const principalOnlyGain = principalFuture - P;
    // 定投复利收益
    const contributionOnlyGain = totalGain - principalOnlyGain;
    const compoundContribution = totalGain > 0 ? (contributionOnlyGain / totalGain) * 100 : 0;

    const fundMultiplier = totalInvested > 0 ? finalAmount / totalInvested : 1;
    const avgAnnualGain = t > 0 ? totalGain / t : 0;
    const doublingTime = r > 0 ? Math.log(2) / Math.log(1 + r) : 0;

    // 年度明细
    const yearlyData = [];
    let balance = P;
    for (let year = 1; year <= t; year++) {
      const startBalance = balance;
      let yearContribution = 0;
      let yearGain = 0;

      for (let period = 0; period < n; period++) {
        // 定投 (每月)
        if ((period % k) === 0 && PMT > 0) {
          balance += PMT;
          yearContribution += PMT;
        }
        const periodGain = balance * i;
        balance += periodGain;
        yearGain += periodGain;
      }

      yearlyData.push({
        year: year,
        startBalance: startBalance,
        contribution: yearContribution,
        gain: yearGain,
        endBalance: balance,
      });
    }

    return {
      finalAmount,
      totalGain,
      totalInvested,
      totalReturnRate,
      compoundContribution,
      fundMultiplier,
      avgAnnualGain,
      doublingTime,
      yearlyData,
    };
  },

  // 格式化货币
  formatCurrency(value) {
    const symbol = this.data.currencySymbol;
    const absValue = Math.abs(value);
    if (absValue >= 100000000) {
      return `${symbol}${(value / 100000000).toFixed(2)}亿`;
    } else if (absValue >= 10000) {
      return `${symbol}${(value / 10000).toFixed(2)}万`;
    } else {
      return `${symbol}${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
  },

  // 主计算函数
  calculate() {
    // 验证
    const { principal, annualRate, years } = this.data.form;
    if (!principal || parseFloat(principal) <= 0) {
      wx.showToast({ title: '请输入有效的初始本金', icon: 'none' });
      return;
    }
    if (!annualRate || parseFloat(annualRate) < 0) {
      wx.showToast({ title: '请输入有效的年化收益率', icon: 'none' });
      return;
    }
    if (!years || parseInt(years) <= 0) {
      wx.showToast({ title: '请输入有效的投资年限', icon: 'none' });
      return;
    }

    this.setData({ loading: true });

    try {
      setTimeout(() => {
        const compoundFrequency = this.getCompoundFrequency();
        const result = this.calculateCompoundInterest({
          principal: this.data.form.principal,
          monthlyContribution: this.data.form.monthlyContribution,
          annualRate: this.data.form.annualRate,
          years: this.data.form.years,
          compoundFrequency,
        });

        this.setData({
          ...result,
          hasResult: true,
          loading: false,
          totalReturnRate: result.totalReturnRate.toFixed(2),
          compoundContribution: result.compoundContribution.toFixed(1),
          fundMultiplier: result.fundMultiplier.toFixed(2),
          doublingTime: result.doublingTime.toFixed(1),
        }, () => {
          this.drawChart();
        });
      }, 100);
    } catch (err) {
      console.error('计算报错:', err);
      this.setData({ loading: false });
      wx.showToast({ title: '计算出错，请重试', icon: 'none' });
    }
  },

  // 绘制图表
  drawChart() {
    const ctx = wx.createCanvasContext('growthChart', this);
    const data = this.data.yearlyData;
    if (!data.length) return;

    const width = 340;
    const height = 260;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // 找出最大值
    const maxValue = Math.max(...data.map(d => d.endBalance));
    const minValue = 0;

    // 清空画布
    ctx.clearRect(0, 0, width, height);

    // 绘制背景网格
    ctx.setStrokeStyle('#e2e8f0');
    ctx.setLineWidth(1);
    for (let i = 0; i <= 4; i++) {
      const y = padding + (chartHeight / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // 绘制投入线 (灰色虚线)
    ctx.setStrokeStyle('#94a3b8');
    ctx.setLineWidth(2);
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    data.forEach((d, i) => {
      const x = padding + (chartWidth / (data.length - 1)) * i;
      const y = padding + chartHeight - (d.startBalance + d.contribution - minValue) / (maxValue - minValue) * chartHeight;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.setLineDash([]);

    // 绘制余额线 (主色调)
    ctx.setStrokeStyle('#0ea5e9');
    ctx.setLineWidth(3);
    ctx.beginPath();
    data.forEach((d, i) => {
      const x = padding + (chartWidth / (data.length - 1)) * i;
      const y = padding + chartHeight - (d.endBalance - minValue) / (maxValue - minValue) * chartHeight;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // 绘制数据点
    data.forEach((d, i) => {
      const x = padding + (chartWidth / (data.length - 1)) * i;
      const y = padding + chartHeight - (d.endBalance - minValue) / (maxValue - minValue) * chartHeight;
      ctx.setFillStyle('#0ea5e9');
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Y轴标签
    ctx.setFillStyle('#64748b');
    ctx.setFontSize(10);
    ctx.setTextAlign('right');
    for (let i = 0; i <= 4; i++) {
      const y = padding + (chartHeight / 4) * i;
      const value = ((maxValue - minValue) * (1 - i / 4) + minValue);
      ctx.fillText(this.formatCurrencyShort(value), padding - 8, y + 4);
    }

    // X轴标签
    ctx.setTextAlign('center');
    data.forEach((d, i) => {
      if (i % Math.ceil(data.length / 6) === 0 || i === data.length - 1) {
        const x = padding + (chartWidth / (data.length - 1)) * i;
        ctx.fillText(`${d.year}年`, x, height - 10);
      }
    });

    // 图例
    ctx.setFontSize(11);
    ctx.setTextAlign('left');
    // 投入
    ctx.setFillStyle('#94a3b8');
    ctx.fillRect(padding, 10, 20, 3);
    ctx.fillText('累计投入', padding + 25, 13);
    // 余额
    ctx.setFillStyle('#0ea5e9');
    ctx.fillRect(padding + 100, 10, 20, 3);
    ctx.fillText('账户余额', padding + 125, 13);

    ctx.draw(false, () => {
      this.setData({ chartReady: true });
    });
  },

  formatCurrencyShort(value) {
    if (value >= 100000000) return `${(value / 100000000).toFixed(1)}亿`;
    if (value >= 10000) return `${(value / 10000).toFixed(1)}万`;
    return value.toLocaleString();
  },

  // 重置
  reset() {
    this.setData({
      form: {
        principal: '10000',
        monthlyContribution: '1000',
        annualRate: '8',
        years: '20',
      },
      compoundIndex: 3,
      currencyIndex: 0,
      hasResult: false,
      chartReady: false,
      currencySymbol: '¥',
    }, () => {
      this.setCurrencySymbol();
    });
  },

  // 分享结果
  shareResult() {
    const { finalAmount, totalGain, totalInvested } = this.data;
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
    // 微信会自动调用 onShareAppMessage
  },

  // 导出数据
  exportData() {
    const { yearlyData, finalAmount, totalGain, totalInvested, form } = this.data;
    let csv = '年份,期初余额,本年投入,本年收益,期末余额\n';
    yearlyData.forEach(d => {
      csv += `${d.year},${d.startBalance.toFixed(2)},${d.contribution.toFixed(2)},${d.gain.toFixed(2)},${d.endBalance.toFixed(2)}\n`;
    });
    csv += `\n汇总,总投入,${totalInvested.toFixed(2)},总收益,${totalGain.toFixed(2)},期末总额,${finalAmount.toFixed(2)}`;

    wx.setClipboardData({
      data: csv,
      success: () => {
        wx.showToast({ title: 'CSV数据已复制到剪贴板', icon: 'success' });
      }
    });
  },

  onShareAppMessage() {
    const { finalAmount, totalGain, totalInvested } = this.data;
    return {
      title: `我的复利计算结果：期末${this.formatCurrencyShort(finalAmount)}，收益${this.formatCurrencyShort(totalGain)}`,
      path: '/pages/calculator/index',
      imageUrl: ''
    };
  },

  onShareTimeline() {
    return {
      title: '复利智投 - 看看我的复利收益有多少？',
    };
  },

  onPullDownRefresh() {
    setTimeout(() => wx.stopPullDownRefresh(), 500);
  }
});