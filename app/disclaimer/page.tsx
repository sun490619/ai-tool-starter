import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { AdSenseAutoAds, AdInArticle } from '@/components/adsense';
import { siteConfig } from '@/lib/site-config';
import Link from 'next/link';
import { AlertTriangle, Shield, Info, BookOpen, Calculator, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: '免责声明',
  description: `${siteConfig.name}免责声明 - 请知悉本工具计算结果仅供参考，不构成投资建议。`,
};

const lastUpdated = new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });

export default function DisclaimerPage() {
  return (
    <>
      <AdSenseAutoAds />
      <div className="min-h-screen flex flex-col">
        <Header currentPath="/disclaimer" />
        
        <main className="flex-1">
          <section className="py-12 md:py-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
            <div className="container-custom">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">免责声明</h1>
                <p className="text-slate-600 dark:text-slate-400 mb-6">最后更新：{lastUpdated}</p>
                <p className="text-slate-600 dark:text-slate-400">
                  请在使用 {siteConfig.name} 服务前仔细阅读本声明。使用即视为知悉并接受。
                </p>
              </div>
            </div>
          </section>

          <section className="py-12 md:py-16 bg-white dark:bg-slate-900">
            <div className="container-custom">
              <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert max-w-none">
                <AdInArticle />
                
                <div className="card p-6 mb-8 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                  <h2 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" aria-hidden="true" />
                    核心声明
                  </h2>
                  <ul className="list-disc list-inside text-red-700 dark:text-red-300 space-y-2">
                    <li><strong>本工具计算结果仅供参考</strong>，不构成任何投资建议、理财建议、税务建议或法律建议</li>
                    <li><strong>投资有风险，入市需谨慎</strong>，任何基于本工具结果的投资决策，风险自负</li>
                    <li><strong>我们不承诺、不保证任何收益</strong>，过往测算不代表未来表现</li>
                  </ul>
                </div>

                <h2 id="calculation">1. 计算结果的性质与局限</h2>
                <h3>1.1 理论模型 vs 现实市场</h3>
                <p>本工具采用标准复利公式（Future Value Formula）进行计算，属于理想化数学模型。现实投资环境中存在模型未涵盖的因素：</p>
                <ul>
                  <li><strong>市场波动</strong>：收益率非恒定，随市场周期大幅震荡，可能出现负收益</li>
                  <li><strong>费率成本</strong>：管理费、托管费、交易佣金、申购赎回费等会侵蚀实际收益</li>
                  <li><strong>税收影响</strong>：分红税、资本利得税等因地区、产品、持有期不同而异</li>
                  <li><strong>通胀因素</strong>：名义收益扣除通胀后的实际购买力可能大幅缩水</li>
                  <li><strong>流动性风险</strong>：部分产品有锁定期、赎回限制，资金可能无法随时取出</li>
                  <li><strong>分红再投资</strong>：模型假设全额再投资，实际可能分配现金分红</li>
                </ul>

                <h3>1.2 参数敏感性</h3>
                <p>计算结果对输入参数高度敏感，微小偏差经复利放大后差距巨大：</p>
                <ul>
                  <li>年化收益率偏差 1%，10 年后终值相差 10%+，20 年相差 20%+</li>
                  <li>定投金额、频率、时点选择不同，结果显著不同</li>
                  <li>历史平均收益率 ≠ 未来预期收益率</li>
                </ul>

                <h2 id="no-advice">2. 非专业建议声明</h2>
                <p><strong>本工具及其内容不构成：</strong></p>
                <ul>
                  <li>证券、基金、保险、银行理财等金融产品的买卖推荐</li>
                  <li>资产配置、财务规划、退休规划、税务筹划等专业建议</li>
                  <li>针对特定个人、家庭、机构的个性化投资方案</li>
                  <li>任何明示或暗示的收益承诺、本金保障、风险免除</li>
                </ul>
                <p>如需专业建议，请咨询持有相关执照的：</p>
                <ul>
                  <li>证券投资顾问（证监会备案）</li>
                  <li>基金投资顾问（基金业协会备案）</li>
                  <li>注册财务策划师（CFP/CFP中国）</li>
                  <li>特许金融分析师（CFA）</li>
                  <li>税务师、注册会计师、律师</li>
                </ul>

                <h2 id="data">3. 数据与信息来源</h2>
                <ul>
                  <li>计算公式为通用数学公式，非专有算法</li>
                  <li>收益率预设值（3%、5%、7% 等）仅为演示，不代表任何产品预期收益</li>
                  <li>不提供任何金融产品的实时行情、净值、评级数据</li>
                  <li>不保证网站内容的及时性、准确性、完整性</li>
                </ul>

                <h2 id="technical">4. 技术与服务免责</h2>
                <ul>
                  <li><strong>服务中断</strong>：因维护、升级、故障、网络攻击、不可抗力导致的不可用，不承担责任</li>
                  <li><strong>计算错误</strong>：因浏览器兼容性、JS 引擎差异、浮点数精度等技术原因导致的偏差，不承担责任</li>
                  <li><strong>数据丢失</strong>：本工具纯前端运行，不存储用户数据；浏览器清理缓存将导致参数丢失，不承担责任</li>
                  <li><strong>第三方依赖</strong>：依赖 Vercel/Cloudflare、CDN、广告联盟、统计服务等第三方，其故障不在我们控制范围</li>
                </ul>

                <h2 id="third-party">5. 第三方链接与广告</h2>
                <ul>
                  <li>网站可能展示 Google AdSense 等第三方广告，广告内容由广告主负责，我们不背书</li>
                  <li>包含指向 GitHub、社交媒体、合作伙伴等第三方链接，跳转后隐私与安全由第三方负责</li>
                  <li>广告收益用于维持服务器运营，不影响计算器核心功能的中立性</li>
                </ul>

                <h2 id="legal">6. 法律合规</h2>
                <ul>
                  <li>本工具不从事证券、基金、期货、外汇、保险、P2P、虚拟货币等需牌照经营的金融业务</li>
                  <li>不提供非法集资、传销、洗钱、诈骗等违法犯罪便利</li>
                  <li>遵守《网络安全法》《数据安全法》《个人信息保护法》《广告法》等中国法律法规</li>
                  <li>不面向中国大陆法律禁止的地区、人群提供服务</li>
                </ul>

                <h2 id="user-responsibility">7. 用户自担风险</h2>
                <p>使用本工具即表示您理解并接受：</p>
                <ul>
                  <li>所有投资决策由您独立判断、自主决策、自负盈亏</li>
                  <li>不因本工具计算结果而向我们、开发者、托管方主张任何索赔</li>
                  <li>自行承担因误解、误用、过度依赖计算结果导致的一切后果</li>
                  <li>定期核对实际账户，以金融机构官方记录为准</li>
                </ul>

                <h2 id="changes">8. 声明变更</h2>
                <p>我们可能随时更新本声明。更新版本发布即时生效。建议每次使用前查看最新版。</p>

                <h2 id="contact">9. 联系我们</h2>
                <p>如对本声明有疑问，请联系：</p>
                <ul>
                  <li>邮箱：<a href={`mailto:${siteConfig.contact.email}`} className="text-primary-600 hover:underline">{siteConfig.contact.email}</a></li>
                  <li>微信：{siteConfig.contact.wechat}</li>
                </ul>

                <hr className="my-12 border-slate-200 dark:border-slate-700" />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="card p-6 text-center">
                    <Calculator className="h-10 w-10 mx-auto text-primary-600 mb-3" aria-hidden="true" />
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">专业计算</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">标准复利公式，多频率支持</p>
                  </div>
                  <div className="card p-6 text-center">
                    <Shield className="h-10 w-10 mx-auto text-emerald-600 mb-3" aria-hidden="true" />
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">隐私保护</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">纯前端运行，数据不上云</p>
                  </div>
                  <div className="card p-6 text-center">
                    <Info className="h-10 w-10 mx-auto text-amber-600 mb-3" aria-hidden="true" />
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">仅供参考</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">不构成投资建议，风险自负</p>
                  </div>
                </div>

                <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
                  本免责声明版本：v1.0 · 发布日期：{lastUpdated} · 适用于 {siteConfig.name} 及其关联小程序
                </p>
              </div>
            </div>
          </section>

          <AdInArticle />
        </main>

        <Footer currentPath="/disclaimer" />
      </div>
    </>
  );
}