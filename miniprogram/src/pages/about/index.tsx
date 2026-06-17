import Taro from '@tarojs/taro';
import { View, Text, ScrollView, Navigator } from '@tarojs/components';
import { siteConfig } from '@/lib/site-config';
import './page.scss';

export default function About() {
  return (
    <View className="page-container">
      <ScrollView className="content" scrollY enhanced>
        <View className="page-header">
          <Text className="page-title">关于我们</Text>
          <Text className="page-subtitle">用心做工具，专注长期价值</Text>
        </View>

        <View className="highlight-box">
          <Text className="highlight-title">❤️ 我们的使命</Text>
          <Text>让每个人都能用得起、看得懂、信得过专业级的财务规划工具。复利是世界第八大奇迹，理解它的人收取它，不理解它的人支付它。</Text>
        </View>

        <View className="section">
          <Text className="section-title">核心价值观</Text>
          <View className="values-grid">
            <View className="value-card">
              <View className="value-icon">🔒</View>
              <Text className="value-title">隐私至上</Text>
              <Text>纯前端计算，数据不上传，不记录、不分析、不贩卖</Text>
            </View>
            <View className="value-card">
              <View className="value-icon">🧮</View>
              <Text className="value-title">专业可靠</Text>
              <Text>标准复利公式，多频率支持，年度明细逐行可验证</Text>
            </View>
            <View className="value-card">
              <View className="value-icon">💚</View>
              <Text className="value-title">长期主义</Text>
              <Text>不追求短期变现，专注工具长期价值，免费开放持续迭代</Text>
            </View>
          </View>
        </View>

        <View className="section">
          <Text className="section-title">功能特色</Text>
          <View className="features-list">
            <View className="feature-item"><Text>🧮 多维度参数：本金、定投、收益率、年限、复利频率、多币种</Text></View>
            <View className="feature-item"><Text>📈 可视化图表：双曲线对比、交互提示、响应式适配</Text></View>
            <View className="feature-item"><Text>📋 年度明细表：期初/投入/收益/期末，可复制导出</Text></View>
            <View className="feature-item"><Text>💡 关键洞察：复利贡献率、资金倍数、年均收益</Text></View>
            <View className="feature-item"><Text>🔒 隐私安全：纯前端、无注册、HTTPS、CSP、离线可用</Text></View>
            <View className="feature-item"><Text>⚡ 极速体验：秒开、实时重算、PWA、可安装桌面</Text></View>
          </View>
        </View>

        <View className="section">
          <Text className="section-title">适用场景</Text>
          <View className="scenarios">
            <View className="scenario"><Text>🏠 家庭：养老金、教育金、首付、应急备用</Text></View>
            <View className="scenario"><Text>💼 职场：年终奖投资、薪资定投、FIRE进度、创业储备</Text></View>
            <View className="scenario"><Text>📚 学习：复利教学、策略对比、参数敏感性、素材生成</Text></View>
            <View className="scenario"><Text>🏢 专业：理财顾问演示、保险方案、银行规划、内容创作</Text></View>
          </View>
        </View>

        <View className="section">
          <Text className="section-title">技术栈</Text>
          <View className="tech-stack">
            <View className="tech-item">
              <Text className="tech-label">Web端</Text>
              <Text>Next.js 14 + React 18 + TypeScript + Tailwind + Chart.js</Text>
            </View>
            <View className="tech-item">
              <Text className="tech-label">小程序端</Text>
              <Text>Taro 4.x + 微信小程序 + 流量主广告</Text>
            </View>
            <View className="tech-item">
              <Text className="tech-label">部署</Text>
              <Text>Vercel / Cloudflare Pages + 微信开发者工具</Text>
            </View>
          </View>
        </View>

        <View className="section">
          <Text className="section-title">联系我们</Text>
          <View className="contact-grid">
            <Navigator url={`mailto:${siteConfig.contact.email}`} className="contact-card">
              <View className="contact-icon">📧</View>
              <Text className="contact-title">邮箱</Text>
              <Text className="contact-value">{siteConfig.contact.email}</Text>
            </Navigator>
            <Navigator url="/pages/about/index" className="contact-card">
              <View className="contact-icon">💬</View>
              <Text className="contact-title">微信</Text>
              <Text className="contact-value">{siteConfig.contact.wechat}</Text>
            </Navigator>
            <Navigator url={siteConfig.social.github} className="contact-card">
              <View className="contact-icon">🐙</View>
              <Text className="contact-title">GitHub</Text>
              <Text className="contact-value">Issues / PR / 源码</Text>
            </Navigator>
          </View>
        </View>

        <View className="footer-note">
          © {new Date().getFullYear()} {siteConfig.name} · {siteConfig.icp.number}
        </View>
      </ScrollView>
    </View>
  );
}