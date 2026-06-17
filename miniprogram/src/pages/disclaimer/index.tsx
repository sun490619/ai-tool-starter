import Taro from '@tarojs/taro';
import { View, Text, ScrollView } from '@tarojs/components';
import { siteConfig } from '@/lib/site-config';
import './page.scss';

const lastUpdated = new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });

export default function Disclaimer() {
  return (
    <View className="page-container">
      <ScrollView className="content" scrollY enhanced>
        <View className="page-header">
          <Text className="page-title">免责声明</Text>
          <Text className="page-meta">最后更新：{lastUpdated}</Text>
        </View>

        <View className="critical-box">
          <Text className="critical-title">🔴 核心声明</Text>
          <View className="critical-list">
            <Text>• 本工具计算结果仅供参考，不构成任何投资建议、理财建议、税务建议或法律建议</Text>
            <Text>• 投资有风险，入市需谨慎，任何基于本工具结果的投资决策，风险自负</Text>
            <Text>• 我们不承诺、不保证任何收益，过往测算不代表未来表现</Text>
          </View>
        </View>

        <View className="section">
          <Text className="section-title">1. 计算结果的性质与局限</Text>
          <Text className="subsection-title">1.1 理论模型 vs 现实市场</Text>
          <Text>采用标准复利公式，属理想化数学模型。现实中存在：市场波动（收益率非恒定）、费率成本（管理费、佣金等）、税收影响、通胀因素、流动性风险、分红再投资差异等模型未涵盖因素。</Text>
          
          <Text className="subsection-title">1.2 参数敏感性</Text>
          <Text>结果对输入参数高度敏感：年化收益率偏差 1%，10 年后终值相差 10%+，20 年相差 20%+。历史平均收益率 ≠ 未来预期收益率。</Text>
        </View>

        <View className="section">
          <Text className="section-title">2. 非专业建议声明</Text>
          <Text>不构成：金融产品买卖推荐、资产配置/财务规划/退休规划/税务筹划建议、针对特定个人的个性化投资方案、任何收益承诺或本金保障。如需专业建议，请咨询持牌顾问（证监会备案投顾、基金业协会备案基金投顾、CFP、CFA、税务师、律师等）。</Text>
        </View>

        <View className="section">
          <Text className="section-title">3. 数据与信息来源</Text>
          <Text>计算公式为通用数学公式。收益率预设值仅为演示，不代表任何产品预期收益。不提供实时行情、净值、评级数据。不保证内容的及时性、准确性、完整性。</Text>
        </View>

        <View className="section">
          <Text className="section-title">4. 技术与服务免责</Text>
          <Text>服务中断（维护、故障、网络攻击、不可抗力）、计算错误（浏览器兼容性、浮点数精度）、数据丢失（纯前端运行，清理缓存即丢失）、第三方依赖故障（微信、广告联盟等），均不承担责任。</Text>
        </View>

        <View className="section">
          <Text className="section-title">5. 第三方广告</Text>
          <Text>微信流量主广告内容由广告主负责，我们不背书。广告收益用于维持运营，不影响计算器核心功能中立性。</Text>
        </View>

        <View className="section">
          <Text className="section-title">6. 法律合规</Text>
          <Text>不从事需牌照经营的金融业务。不提供非法集资、传销、洗钱、诈骗等违法犯罪便利。遵守《网络安全法》《数据安全法》《个人信息保护法》《广告法》等法律法规。</Text>
        </View>

        <View className="section">
          <Text className="section-title">7. 用户自担风险</Text>
          <Text>使用即表示：所有投资决策独立判断、自主决策、自负盈亏；不因计算结果向我们主张索赔；自行承担误解、误用、过度依赖导致的后果；定期核对实际账户，以金融机构官方记录为准。</Text>
        </View>

        <View className="footer-note">
          本免责声明版本：v1.0 · 适用于 {siteConfig.name} 及其关联小程序
        </View>
      </ScrollView>
    </View>
  );
}