import Taro, { useEffect } from '@tarojs/taro';
import { View, Text, ScrollView, Navigator } from '@tarojs/components';
import { siteConfig } from '@/lib/site-config';
import './page.scss';

const lastUpdated = new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });

export default function Privacy() {
  return (
    <View className="page-container">
      <ScrollView className="content" scrollY enhanced>
        <View className="page-header">
          <Text className="page-title">隐私政策</Text>
          <Text className="page-meta">最后更新：{lastUpdated}</Text>
        </View>

        <View className="highlight-box">
          <Text className="highlight-title">🛡️ 核心承诺</Text>
          <View className="commitment-list">
            <Text>• 纯前端计算：所有计算在本地完成，财务数据不上传服务器</Text>
            <Text>• 不收集个人身份信息：无需注册、登录，不收集姓名、身份证、手机号</Text>
            <Text>• 不与第三方共享：除法律强制要求外，不向任何第三方出售、出租或共享数据</Text>
            <Text>• 您拥有完全控制权：可随时清除本地数据，我们无法访问您的计算记录</Text>
          </View>
        </View>

        <View className="section">
          <Text className="section-title">1. 我们收集的信息</Text>
          <Text className="subsection-title">1.1 您主动提供的信息</Text>
          <Text>本工具不要求您提供任何个人身份信息。您输入的参数（本金、定投金额、收益率、年限等）仅在本地临时存储，用于实时计算。</Text>
          
          <Text className="subsection-title">1.2 自动收集的技术信息</Text>
          <Text>为保障服务稳定性和安全性，服务器可能记录匿名技术日志：访问时间、设备信息、访问页面、错误日志等。这些信息不包含您输入的财务数据。</Text>
          
          <Text className="subsection-title">1.3 第三方服务</Text>
          <Text>微信流量主广告可能使用微信提供的广告标识符进行个性化投放，详见微信隐私政策。</Text>
        </View>

        <View className="section">
          <Text className="section-title">2. 信息的使用目的</Text>
          <Text>提供、维护、改进工具功能；监控性能、排查故障、防范安全威胁；统计匿名访问数据优化体验；展示广告支持运营；遵守法律法规。</Text>
        </View>

        <View className="section">
          <Text className="section-title">3. 信息存储与安全</Text>
          <Text>技术日志存储于服务器，自动轮转保留 30-90 天。您本地的计算参数除非清除缓存否则长期保留。全程 HTTPS 加密传输，严格 CSP 策略，最小权限原则。</Text>
        </View>

        <View className="section">
          <Text className="section-title">4. 您的权利</Text>
          <Text>根据《个人信息保护法》，您享有知情权、访问权、更正权、删除权、撤回同意权。行使请求请发邮件至：{siteConfig.contact.email}</Text>
        </View>

        <View className="section">
          <Text className="section-title">5. 儿童隐私</Text>
          <Text>本工具不面向 14 周岁以下儿童，不会故意收集儿童个人信息。</Text>
        </View>

        <View className="section">
          <Text className="section-title">6. 联系我们</Text>
          <Text>邮箱：{siteConfig.contact.email}</Text>
          <Text>微信：{siteConfig.contact.wechat}</Text>
          <Text>我们将在 15 个工作日内回复。</Text>
        </View>

        <View className="footer-note">
          本隐私政策版本：v1.0 · 适用于 {siteConfig.name} 及其关联小程序
        </View>
      </ScrollView>
    </View>
  );
}