import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Text, Button, ScrollView, Swiper, SwiperItem, Image, Navigator, Ad } from '@tarojs/components';
import { useDispatch, useSelector } from 'react-redux';
import { calculateCompoundInterest, formatCurrency, formatNumber, DEFAULT_INPUTS } from '@/lib/calculator';
import { siteConfig } from '@/lib/site-config';
import './index.scss';

export default function Index() {
  const [adUnitId] = useState(siteConfig.ads.wechatAd.unitIds?.banner || '');
  const [showCalculators, setShowCalculators] = useState([
    { id: 'compound', title: '复利计算器', desc: '定投收益可视化', icon: '📈', path: '/pages/calculator/index' },
    { id: 'mortgage', title: '房贷计算器', desc: '等额本息/本金', icon: '🏠', path: '/pages/calculator/index?type=mortgage', comingSoon: true },
    { id: 'retirement', title: '养老金计算器', desc: '退休储备测算', icon: '👴', path: '/pages/calculator/index?type=retirement', comingSoon: true },
    { id: 'loan', title: '贷款计算器', desc: '各类贷款测算', icon: '💰', path: '/pages/calculator/index?type=loan', comingSoon: true },
  ]);
  const [quickResult, setQuickResult] = useState(null);

  useEffect(() => {
    // 预计算一个默认结果展示
    const result = calculateCompoundInterest(DEFAULT_INPUTS);
    setQuickResult(result);
  }, []);

  const navigateToCalculator = (path) => {
    Taro.navigateTo({ url: path });
  };

  const copyText = async (text) => {
    await Taro.setClipboardData({ data: text });
    Taro.showToast({ title: '已复制', icon: 'success' });
  };

  return (
    <View className="index-page">
      {/* 顶部横幅广告 */}
      {siteConfig.ads.wechatAd.enabled && adUnitId && (
        <View className="ad-banner">
          <Ad unit-id={adUnitId} ad-type="banner" className="wechat-ad" />
        </View>
      )}

      <ScrollView className="container" scrollY enhanced>
        {/* Hero Section */}
        <View className="hero-section">
          <View className="hero-content">
            <Text className="hero-badge">完全免费 · 无需注册 · 数据不上云</Text>
            <Text className="hero-title">专业 <Text className="highlight">复利计算器</Text></Text>
            <Text className="hero-desc">
              支持定投、复利频率、收益可视化，助您科学规划投资未来
            </Text>
            <View className="hero-actions">
              <Button
                className="btn-primary"
                onClick={() => navigateToCalculator('/pages/calculator/index')}
              >
                立即开始计算
              </Button>
              <Button
                className="btn-secondary"
                onClick={() => navigateToCalculator('/pages/about/index')}
              >
                了解详情
              </Button>
            </View>
            <View className="hero-features">
              <View className="feature-tag">
                <Text>🔒</Text>
                <Text>纯前端计算</Text>
              </View>
              <View className="feature-tag">
                <Text>📊</Text>
                <Text>可视化图表</Text>
              </View>
              <View className="feature-tag">
                <Text>📋</Text>
                <Text>详细明细表</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 快速预览结果 */}
        {quickResult && (
          <View className="quick-preview">
            <Text className="section-title">计算效果预览</Text>
            <Text className="section-desc">默认参数：初始1万，月定投1千，年化7%，10年</Text>
            <View className="result-cards">
              <View className="result-card primary">
                <Text className="result-label">最终账户价值</Text>
                <Text className="result-value">{formatCurrency(quickResult.finalAmount)}</Text>
                <Text className="result-desc">本金 + 定投 + 复利收益</Text>
              </View>
              <View className="result-card">
                <Text className="result-label">累计投入本金</Text>
                <Text className="result-value">{formatCurrency(quickResult.totalContributions)}</Text>
                <Text className="result-desc">初始本金 + 所有定投</Text>
              </View>
              <View className="result-card success">
                <Text className="result-label">复利收益总额</Text>
                <Text className="result-value">{formatCurrency(quickResult.totalInterest)}</Text>
                <Text className="result-desc">钱生钱的收益</Text>
              </View>
            </View>
            <View className="key-insights">
              <View className="insight-item">
                <Text className="insight-value">{((quickResult.totalInterest / quickResult.finalAmount) * 100).toFixed(1)}%</Text>
                <Text className="insight-label">复利贡献率</Text>
              </View>
              <View className="insight-item">
                <Text className="insight-value">{(quickResult.finalAmount / quickResult.totalContributions).toFixed(2)}x</Text>
                <Text className="insight-label">资金倍数</Text>
              </View>
              <View className="insight-item">
                <Text className="insight-value">{formatCurrency(quickResult.totalInterest / DEFAULT_INPUTS.years)}</Text>
                <Text className="insight-label">年均收益</Text>
              </View>
            </View>
            <Button
              className="preview-cta"
              onClick={() => navigateToCalculator('/pages/calculator/index')}
            >
              立即体验完整版计算器
            </Button>
          </View>
        )}

        {/* 核心功能 */}
        <View className="features-section">
          <Text className="section-title">核心功能特性</Text>
          <Text className="section-desc">专为长期投资者设计的专业工具箱</Text>
          <View className="features-grid">
            <View className="feature-card">
              <View className="feature-icon">🧮</View>
              <Text className="feature-title">专业计算引擎</Text>
              <Text className="feature-desc">支持月/季/年复利频率，精确计算每年本金、投入、收益、期末余额</Text>
            </View>
            <View className="feature-card">
              <View className="feature-icon">📈</View>
              <Text className="feature-title">可视化图表</Text>
              <Text className="feature-desc">直观展示账户总价值与累计投入对比，一眼看清复利效应</Text>
            </View>
            <View className="feature-card">
              <View className="feature-icon">🔒</View>
              <Text className="feature-title">隐私保护</Text>
              <Text className="feature-desc">纯前端计算，数据不上传服务器，您的财务信息完全私密</Text>
            </View>
            <View className="feature-card">
              <View className="feature-icon">⚡</View>
              <Text className="feature-title">即时结果</Text>
              <Text className="feature-desc">参数调整实时重算，无需等待，支持多币种显示</Text>
            </View>
            <View className="feature-card">
              <View className="feature-icon">📋</View>
              <Text className="feature-title">年度明细表</Text>
              <Text className="feature-desc">每年期初余额、本年投入、本年收益、期末余额一目了然</Text>
            </View>
            <View className="feature-card">
              <View className="feature-icon">💡</View>
              <Text className="feature-title">关键洞察</Text>
              <Text className="feature-desc">自动计算复利贡献率、资金倍数、年均收益等核心指标</Text>
            </View>
          </View>
        </View>

        {/* 计算器入口 */}
        <View className="calculators-section">
          <Text className="section-title">工具矩阵</Text>
          <Text className="section-desc">更多专业计算器持续上线中</Text>
          <View className="calculators-grid">
            {showCalculators.map((calc) => (
              <View key={calc.id} className="calculator-card" onClick={() => !calc.comingSoon && navigateToCalculator(calc.path)}>
                <View className="calc-icon">{calc.icon}</View>
                <Text className="calc-title">{calc.title}</Text>
                <Text className="calc-desc">{calc.desc}</Text>
                {calc.comingSoon && <Text className="calc-coming">敬请期待</Text>}
                {!calc.comingSoon && <Text className="calc-enter">进入计算</Text>}
              </View>
            ))}
          </View>
        </View>

        {/* 适用场景 */}
        <View className="scenarios-section">
          <Text className="section-title">适用场景</Text>
          <Text className="section-desc">只要涉及长期资金规划，都能用得上</Text>
          <View className="scenarios-list">
            <View className="scenario-item">
              <View className="scenario-icon">🏠</View>
              <View className="scenario-content">
                <Text className="scenario-title">家庭理财规划</Text>
                <Text className="scenario-tags">
                  <Text>养老金</Text>
                  <Text>教育金</Text>
                  <Text>首付积累</Text>
                  <Text>应急备用</Text>
                </Text>
              </View>
            </View>
            <View className="scenario-item">
              <View className="scenario-icon">💼</View>
              <View className="scenario-content">
                <Text className="scenario-title">职场人士投资</Text>
                <Text className="scenario-tags">
                  <Text>年终奖投资</Text>
                  <Text>薪资定投</Text>
                  <Text>FIRE进度</Text>
                  <Text>创业储备</Text>
                </Text>
              </View>
            </View>
            <View className="scenario-item">
              <View className="scenario-icon">📚</View>
              <View className="scenario-content">
                <Text className="scenario-title">投资学习教学</Text>
                <Text className="scenario-tags">
                  <Text>复利演示</Text>
                  <Text>策略对比</Text>
                  <Text>参数敏感性</Text>
                  <Text>教学素材</Text>
                </Text>
              </View>
            </View>
            <View className="scenario-item">
              <View className="scenario-icon">🏢</View>
              <View className="scenario-content">
                <Text className="scenario-title">专业从业辅助</Text>
                <Text className="scenario-tags">
                  <Text>理财顾问</Text>
                  <Text>保险代理</Text>
                  <Text>银行客户经理</Text>
                  <Text>内容创作者</Text>
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* CTA */}
        <View className="cta-section">
          <Text className="cta-title">开始您的复利之旅</Text>
          <Text className="cta-desc">复利需要时间，时间需要耐心。现在开始，永远不晚。</Text>
          <Button className="cta-button" onClick={() => navigateToCalculator('/pages/calculator/index')}>
            免费使用计算器
          </Button>
        </View>

        {/* 底部信息 */}
        <View className="footer-info">
          <Text className="footer-text">© {new Date().getFullYear()} {siteConfig.name}。保留所有权利。</Text>
          <Text className="footer-text">{siteConfig.icp.number}</Text>
          <View className="footer-links">
            <Navigator url="/pages/privacy/index" className="footer-link">隐私政策</Navigator>
            <Text className="divider">·</Text>
            <Navigator url="/pages/terms/index" className="footer-link">使用条款</Navigator>
            <Text className="divider">·</Text>
            <Navigator url="/pages/disclaimer/index" className="footer-link">免责声明</Navigator>
            <Text className="divider">·</Text>
            <Navigator url="/pages/about/index" className="footer-link">关于我们</Navigator>
          </View>
        </View>

        {/* 底部广告 */}
        {siteConfig.ads.wechatAd.enabled && siteConfig.ads.wechatAd.unitIds?.grid && (
          <View className="ad-grid" style={{ marginTop: '24px' }}>
            <Ad unit-id={siteConfig.ads.wechatAd.unitIds.grid} ad-type="grid" className="wechat-ad" />
          </View>
        )}
      </ScrollView>
    </View>
  );
}