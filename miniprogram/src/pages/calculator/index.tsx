import Taro, { useState, useMemo, useEffect } from '@tarojs/taro';
import { View, Text, Input, Button, ScrollView, Radio, RadioGroup, Picker, Ad } from '@tarojs/components';
import { calculateCompoundInterest, formatCurrency, formatNumber, validateInputs, DEFAULT_INPUTS, siteConfig } from '@/lib/calculator';
import './calculator.scss';

export default function Calculator() {
  const [inputs, setInputs] = useState({
    ...DEFAULT_INPUTS,
  });
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState([]);
  const [activeTab, setActiveTab] = useState('calculator');
  const [currency, setCurrency] = useState('CNY');
  const [copied, setCopied] = useState(null);
  const [chartData, setChartData] = useState(null);

  const currencyOption = siteConfig.tool.currencies.find(c => c.code === currency);

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
      setChartData(computedResult.chartData);
    }
  }, [computedResult]);

  const handleInputChange = (field, value) => {
    const numValue = parseFloat(value) || 0;
    setInputs(prev => ({ ...prev, [field]: numValue }));
  };

  const handleRatePreset = (rate) => {
    setInputs(prev => ({ ...prev, annualRate: rate }));
  };

  const handleCompoundChange = (value) => {
    setInputs(prev => ({ ...prev, compoundFrequency: value }));
  };

  const copyResult = async (text, label) => {
    await Taro.setClipboardData({ data: text });
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
    Taro.showToast({ title: '已复制', icon: 'success' });
  };

  const formatResult = (value) => formatCurrency(value, currency);

  if (!result) {
    return (
      <View className="calculator-page">
        <ScrollView className="container" scrollY enhanced>
          <View className="error-state">
            <Text>⚠️</Text>
            <Text className="error-title">请检查输入</Text>
            <Text className="error-desc">{errors.join('、')}</Text>
          </View>
          <CalculatorForm
            inputs={inputs}
            onInputChange={handleInputChange}
            onRatePreset={handleRatePreset}
            onCompoundChange={handleCompoundChange}
            currency={currency}
            onCurrencyChange={setCurrency}
            errors={errors}
          />
        </ScrollView>
      </View>
    );
  }

  const { finalAmount, totalContributions, totalInterest, yearlyBreakdown } = result;

  return (
    <View className="calculator-page">
      {/* 顶部横幅广告 */}
      {siteConfig.ads.wechatAd.enabled && siteConfig.ads.wechatAd.unitIds?.banner && (
        <View className="ad-banner">
          <Ad unit-id={siteConfig.ads.wechatAd.unitIds.banner} ad-type="banner" className="wechat-ad" />
        </View>
      )}

      <ScrollView className="container" scrollY enhanced>
        {/* 页面头部 */}
        <View className="page-header">
          <Text className="page-title">复利计算器</Text>
          <Text className="page-desc">专业定投收益测算，支持多种复利频率</Text>
        </View>

        {/* 标签页 */}
        <View className="tabs">
          <View className={`tab ${activeTab === 'calculator' ? 'active' : ''}`} onClick={() => setActiveTab('calculator')}>
            <Text>计算器</Text>
          </View>
          <View className={`tab ${activeTab === 'chart' ? 'active' : ''}`} onClick={() => setActiveTab('chart')}>
            <Text>图表</Text>
          </View>
          <View className={`tab ${activeTab === 'table' ? 'active' : ''}`} onClick={() => setActiveTab('table')}>
            <Text>明细表</Text>
          </View>
          <View className={`tab ${activeTab === 'insight' ? 'active' : ''}`} onClick={() => setActiveTab('insight')}>
            <Text>洞察</Text>
          </View>
        </View>

        {/* 计算器表单 */}
        {activeTab === 'calculator' && (
          <CalculatorForm
            inputs={inputs}
            onInputChange={handleInputChange}
            onRatePreset={handleRatePreset}
            onCompoundChange={handleCompoundChange}
            currency={currency}
            onCurrencyChange={setCurrency}
            errors={errors}
            result={result}
            formatResult={formatResult}
            copied={copied}
            onCopy={copyResult}
          />
        )}

        {/* 图表 */}
        {activeTab === 'chart' && result && (
          <View className="chart-section">
            <View className="chart-card">
              <Text className="chart-title">复利增长可视化</Text>
              <Text className="chart-desc">蓝色：账户总价值  灰色：累计投入本金  差值：复利收益</Text>
              <View className="chart-container">
                <CanvasChart data={chartData} currency={currency} />
              </View>
            </View>
          </View>
        )}

        {/* 明细表 */}
        {activeTab === 'table' && result && (
          <View className="table-section">
            <View className="table-card">
              <Text className="table-title">年度明细表</Text>
              <Text className="table-desc">每年的本金、投入、收益、期末余额详细记录</Text>
              <View className="table-wrapper">
                <View className="table-header">
                  <Text>年份</Text>
                  <Text>期初余额</Text>
                  <Text>本年投入</Text>
                  <Text>本年收益</Text>
                  <Text>期末余额</Text>
                </View>
                {yearlyBreakdown.map((year, index) => (
                  <View key={year.year} className={`table-row ${index % 2 === 0 ? 'even' : 'odd'}`}>
                    <Text>第 {year.year} 年</Text>
                    <Text>{formatResult(year.startBalance)}</Text>
                    <Text>{formatResult(year.contributions)}</Text>
                    <Text className="interest">{formatResult(year.interest)}</Text>
                    <Text className="balance">{formatResult(year.endBalance)}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* 洞察 */}
        {activeTab === 'insight' && result && (
          <View className="insight-section">
            <View className="insight-card">
              <Text className="insight-title">关键洞察</Text>
              <View className="insights-grid">
                <View className="insight-item">
                  <View className="insight-icon">📊</View>
                  <View className="insight-content">
                    <Text className="insight-label">复利贡献率</Text>
                    <Text className="insight-value">{((totalInterest / finalAmount) * 100).toFixed(1)}%</Text>
                    <Text className="insight-desc">最终财富中来自复利收益的比例</Text>
                  </View>
                </View>
                <View className="insight-item">
                  <View className="insight-icon">💰</View>
                  <View className="insight-content">
                    <Text className="insight-label">资金倍数</Text>
                    <Text className="insight-value">{(finalAmount / totalContributions).toFixed(2)}x</Text>
                    <Text className="insight-desc">最终财富是累计投入的多少倍</Text>
                  </View>
                </View>
                <View className="insight-item">
                  <View className="insight-icon">📅</View>
                  <View className="insight-content">
                    <Text className="insight-label">年均收益</Text>
                    <Text className="insight-value">{formatResult(totalInterest / inputs.years)}</Text>
                    <Text className="insight-desc">每年平均获得的复利收益</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* 复利公式 */}
            <View className="formula-card">
              <Text className="formula-title">复利计算公式</Text>
              <View className="formula-content">
                <Text className="formula-text">
{`FV = P×(1+r/n)^(n×t) + PMT×[((1+r/n)^(n×t)-1)/(r/n)]`}
                </Text>
                <Text className="formula-vars">
P=初始本金  PMT=每期定投  r=年化收益率  n=年复利次数  t=投资年数
                </Text>
              </View>
            </View>

            {/* 风险提示 */}
            <View className="warning-card">
              <Text className="warning-title">⚠️ 重要提醒</Text>
              <View className="warning-list">
                <Text>• 计算结果仅供参考，不构成投资建议</Text>
                <Text>• 实际收益受市场波动、费率、税收等影响</Text>
                <Text>• 过往业绩不代表未来表现，投资有风险</Text>
                <Text>• 建议咨询专业理财顾问制定个性化方案</Text>
              </View>
            </View>
          </View>
        )}

        {/* 底部广告 */}
        {siteConfig.ads.wechatAd.enabled && siteConfig.ads.wechatAd.unitIds?.grid && activeTab !== 'calculator' && (
          <View className="ad-grid" style={{ marginTop: '24px' }}>
            <Ad unit-id={siteConfig.ads.wechatAd.unitIds.grid} ad-type="grid" className="wechat-ad" />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

// 计算器表单子组件
function CalculatorForm({
  inputs,
  onInputChange,
  onRatePreset,
  onCompoundChange,
  currency,
  onCurrencyChange,
  errors,
  result,
  formatResult,
  copied,
  onCopy,
}) {
  const ratePresets = siteConfig.tool.ratePresets;
  const compoundFrequencies = siteConfig.tool.compoundFrequencies;
  const currencies = siteConfig.tool.currencies;

  return (
    <View className="form-section">
      <View className="form-card">
        <Text className="form-section-title">基础参数</Text>
        
        <View className="form-row">
          <View className="form-field">
            <Text className="field-label">初始本金</Text>
            <View className="input-wrapper">
              <Text className="currency-symbol">{currencies.find(c => c.code === currency)?.symbol || '¥'}</Text>
              <Input
                type="number"
                min={0}
                step={100}
                value={inputs.principal}
                onChange={(e) => onInputChange('principal', e.detail.value)}
                placeholder="如 10000"
                className="form-input"
              />
            </View>
            <Text className="field-hint">一次性投入的初始金额</Text>
          </View>
          
          <View className="form-field">
            <Text className="field-label">每月定投</Text>
            <View className="input-wrapper">
              <Text className="currency-symbol">{currencies.find(c => c.code === currency)?.symbol || '¥'}</Text>
              <Input
                type="number"
                min={0}
                step={100}
                value={inputs.monthlyContribution}
                onChange={(e) => onInputChange('monthlyContribution', e.detail.value)}
                placeholder="如 1000"
                className="form-input"
              />
            </View>
            <Text className="field-hint">每月定期追加投资金额</Text>
          </View>
        </View>

        <View className="form-row">
          <View className="form-field">
            <Text className="field-label">年化收益率 (%)</Text>
            <Input
              type="number"
              min={0}
              max={100}
              step={0.1}
              value={inputs.annualRate}
              onChange={(e) => onInputChange('annualRate', e.detail.value)}
              placeholder="如 7"
              className="form-input"
            />
            <Text className="field-hint">预期年均收益率</Text>
            <View className="rate-presets">
              {ratePresets.map((rate) => (
                <View
                  key={rate}
                  className={`rate-preset ${inputs.annualRate === rate ? 'active' : ''}`}
                  onClick={() => onRatePreset(rate)}
                >
                  {rate}%
                </View>
              ))}
            </View>
          </View>
          
          <View className="form-field">
            <Text className="field-label">投资年限 (年)</Text>
            <Input
              type="number"
              min={1}
              max={50}
              step={1}
              value={inputs.years}
              onChange={(e) => onInputChange('years', e.detail.value)}
              placeholder="如 10"
              className="form-input"
            />
            <Text className="field-hint">计划投资的总年数</Text>
          </View>
        </View>

        <View className="form-field">
          <Text className="field-label">复利频率</Text>
          <RadioGroup value={inputs.compoundFrequency} onChange={(e) => onCompoundChange(e.detail.value)}>
            {compoundFrequencies.map((freq) => (
              <View key={freq.value} className="radio-option">
                <Radio value={freq.value} />
                <View className="radio-content">
                  <Text className="radio-label">{freq.label}</Text>
                  <Text className="radio-desc">{freq.description}</Text>
                </View>
              </View>
            ))}
          </RadioGroup>
        </View>

        <View className="form-field">
          <Text className="field-label">显示货币</Text>
          <View className="currency-options">
            {currencies.map((curr) => (
              <View
                key={curr.code}
                className={`currency-option ${currency === curr.code ? 'active' : ''}`}
                onClick={() => onCurrencyChange(curr.code)}
              >
                <Text>{curr.symbol} {curr.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {errors.length > 0 && (
          <View className="errors">
            {errors.map((err, i) => (
              <Text key={i} className="error-text">⚠️ {err}</Text>
            ))}
          </View>
        )}
      </View>

      {result && (
        <View className="result-summary">
          <Text className="result-summary-title">计算结果概览</Text>
          <View className="result-cards">
            <View className="result-card primary">
              <Text className="result-label">最终账户价值</Text>
              <Text className="result-value">{formatResult(finalAmount)}</Text>
              <Button
                className="copy-btn"
                size="mini"
                onClick={() => onCopy(formatNumber(finalAmount), '最终价值')}
              >
                {copied === '最终价值' ? '✓ 已复制' : '复制'}
              </Button>
            </View>
            <View className="result-card">
              <Text className="result-label">累计投入本金</Text>
              <Text className="result-value">{formatResult(totalContributions)}</Text>
              <Button
                className="copy-btn"
                size="mini"
                onClick={() => onCopy(formatNumber(totalContributions), '累计投入')}
              >
                {copied === '累计投入' ? '✓ 已复制' : '复制'}
              </Button>
            </View>
            <View className="result-card success">
              <Text className="result-label">复利收益总额</Text>
              <Text className="result-value">{formatResult(totalInterest)}</Text>
              <Button
                className="copy-btn"
                size="mini"
                onClick={() => onCopy(formatNumber(totalInterest), '复利收益')}
              >
                {copied === '复利收益' ? '✓ 已复制' : '复制'}
              </Button>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

// 简易 Canvas 图表组件
function CanvasChart({ data, currency }) {
  const canvasId = 'chart-canvas';
  const query = Taro.createSelectorQuery();
  
  useEffect(() => {
    if (!data) return;
    
    const ctx = Taro.createCanvasContext(canvasId);
    const width = 335;
    const height = 200;
    const padding = { top: 20, right: 10, bottom: 40, left: 60 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // 清空画布
    ctx.clearRect(0, 0, width, height);
    
    // 绘制背景网格
    ctx.setStrokeStyle('#e2e8f0');
    ctx.setLineWidth(1);
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (chartHeight / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + chartWidth, y);
      ctx.stroke();
    }

    // 绘制 Y 轴标签
    const maxValue = Math.max(...data.datasets[0].data);
    ctx.setFontSize(10);
    ctx.setFillStyle('#94a3b8');
    ctx.setTextAlign('right');
    ctx.setTextBaseline('middle');
    for (let i = 0; i <= 4; i++) {
      const value = maxValue * (1 - i / 4);
      const y = padding.top + (chartHeight / 4) * i;
      ctx.fillText(formatCurrency(value, currency).replace(/[¥$]/, ''), padding.left - 10, y);
    }

    // 绘制数据线
    data.datasets.forEach((dataset, datasetIndex) => {
      ctx.setStrokeStyle(dataset.borderColor);
      ctx.setLineWidth(2);
      ctx.beginPath();
      
      dataset.data.forEach((value, index) => {
        const x = padding.left + (chartWidth / (dataset.data.length - 1)) * index;
        const y = padding.top + chartHeight - (value / maxValue) * chartHeight;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();

      // 绘制数据点
      dataset.data.forEach((value, index) => {
        const x = padding.left + (chartWidth / (dataset.data.length - 1)) * index;
        const y = padding.top + chartHeight - (value / maxValue) * chartHeight;
        ctx.setFillStyle(dataset.borderColor);
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
      });
    });

    // 绘制 X 轴标签
    ctx.setFontSize(10);
    ctx.setFillStyle('#94a3b8');
    ctx.setTextAlign('center');
    ctx.setTextBaseline('top');
    data.labels.forEach((label, index) => {
      const x = padding.left + (chartWidth / (data.labels.length - 1)) * index;
      ctx.fillText(label.replace('第 ', '').replace(' 年', ''), x, padding.top + chartHeight + 5);
    });

    // 图例
    data.datasets.forEach((dataset, index) => {
      const x = padding.left + index * 120;
      const y = padding.top + chartHeight + 30;
      ctx.setFillStyle(dataset.borderColor);
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
      ctx.setFillStyle('#475569');
      ctx.setFontSize(11);
      ctx.setTextAlign('left');
      ctx.setTextBaseline('middle');
      ctx.fillText(dataset.label, x + 10, y);
    });

    ctx.draw();
  }, [data]);

  return <canvas type="2d" id={canvasId} className="chart-canvas" />;
}