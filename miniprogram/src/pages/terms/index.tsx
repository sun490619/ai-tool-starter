import Taro from '@tarojs/taro';
import { View, Text, ScrollView, Navigator } from '@tarojs/components';
import { siteConfig } from '@/lib/site-config';
import './page.scss';

const lastUpdated = new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });

export default function Terms() {
  return (
    <View className="page-container">
      <ScrollView className="content" scrollY enhanced>
        <View className="page-header">
          <Text className="page-title">使用条款</Text>
          <Text className="page-meta">最后更新：{lastUpdated}</Text>
        </View>

        <View className="warning-box">
          <Text className="warning-title">⚠️ 重要提示</Text>
          <View className="warning-list">
            <Text>• 计算结果仅供参考，不构成任何投资建议、财务建议或法律建议</Text>
            <Text>• 投资有风险，决策需谨慎，请咨询专业理财顾问</Text>
            <Text>• 继续使用即视为您已阅读、理解并同意本条款全部内容</Text>
          </View>
        </View>

        <View className="section">
          <Text className="section-title">1. 条款接受</Text>
          <Text>访问或使用本工具即表示您：年满 18 周岁、具备完全民事行为能力；已阅读理解并同意本条款及隐私政策；承诺不将本工具用于违法违规目的。不同意请立即停止使用。</Text>
        </View>

        <View className="section">
          <Text className="section-title">2. 服务内容</Text>
          <Text>核心功能：复利终值计算（月/季/年复利）、定投收益测算、可视化图表、年度明细表、关键指标分析。免费使用、纯前端运行、按现状提供。</Text>
        </View>

        <View className="section">
          <Text className="section-title">3. 知识产权</Text>
          <Text>所有内容（代码、界面、文案、图表、算法、商标）受法律保护，权利归 {siteConfig.author.name} 所有。授予您有限、非排他、不可转让的个人非商业使用许可。不得复制、修改、分发、出售、反向工程、移除版权声明、用于构建竞品。</Text>
        </View>

        <View className="section">
          <Text className="section-title">4. 用户行为规范</Text>
          <Text>不得：从事违法活动；干扰破坏服务运行；传播恶意代码；冒充他人；侵犯第三方权益。违反者我们有权限制访问、追究法律责任。</Text>
        </View>

        <View className="section">
          <Text className="section-title">5. 免责声明</Text>
          <Text className="subsection-title">5.1 计算结果仅供参考</Text>
          <Text>基于标准复利公式，结果受输入参数影响。实际收益受市场波动、费率、税费、分红再投资等影响，必然存在差异。不对准确性、完整性、适用性作任何保证。</Text>
          <Text className="subsection-title">5.2 非专业建议</Text>
          <Text>提供的信息不构成投资、税务、法律等专业建议。基于本工具结果的投资决策，风险自负。</Text>
          <Text className="subsection-title">5.3 服务中断与数据丢失</Text>
          <Text>不保证 7×24 小时不间断。因维护、故障、不可抗力导致的中断、数据丢失，不承担责任。</Text>
        </View>

        <View className="section">
          <Text className="section-title">6. 责任限制</Text>
          <Text>在法律允许最大范围内，不对间接、偶然、特殊、惩罚性或后果性损害承担责任。总体责任上限不超过您实际支付费用（即 0 元）。</Text>
        </View>

        <View className="section">
          <Text className="section-title">7. 适用法律与争议解决</Text>
          <Text>适用中华人民共和国大陆地区法律。管辖法院：{siteConfig.author.name} 住所地有管辖权的人民法院。优先协商解决。</Text>
        </View>

        <View className="section">
          <Text className="section-title">8. 联系我们</Text>
          <Text>邮箱：{siteConfig.contact.email}</Text>
          <Text>微信：{siteConfig.contact.wechat}</Text>
        </View>

        <View className="footer-note">
          本使用条款版本：v1.0 · 适用于 {siteConfig.name} 及其关联小程序
        </View>
      </ScrollView>
    </View>
  );
}