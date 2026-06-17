import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { AdSenseAutoAds, AdInArticle } from '@/components/adsense';
import { siteConfig } from '@/lib/site-config';
import Link from 'next/link';
import { FileText, Shield, AlertTriangle, CheckCircle, XCircle, Scale, Gavel } from 'lucide-react';

export const metadata: Metadata = {
  title: '使用条款',
  description: `${siteConfig.name}使用条款 - 请仔细阅读本条款，使用本工具即视为同意。`,
};

const lastUpdated = new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });

export default function TermsPage() {
  return (
    <>
      <AdSenseAutoAds />
      <div className="min-h-screen flex flex-col">
        <Header currentPath="/terms" />
        
        <main className="flex-1">
          <section className="py-12 md:py-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
            <div className="container-custom">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">使用条款</h1>
                <p className="text-slate-600 dark:text-slate-400 mb-6">最后更新：{lastUpdated}</p>
                <p className="text-slate-600 dark:text-slate-400">
                  请仔细阅读本条款。访问或使用 {siteConfig.name}（以下简称"本工具"、"我们"）即表示您接受本条款。
                </p>
              </div>
            </div>
          </section>

          <section className="py-12 md:py-16 bg-white dark:bg-slate-900">
            <div className="container-custom">
              <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert max-w-none">
                <AdInArticle />
                
                <div className="card p-6 mb-8 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
                  <h2 className="text-lg font-semibold text-amber-800 dark:text-amber-200 mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" aria-hidden="true" />
                    重要提示
                  </h2>
                  <ul className="list-disc list-inside text-amber-700 dark:text-amber-300 space-y-2">
                    <li>本工具提供的计算结果<strong>仅供参考</strong>，不构成任何投资建议、财务建议或法律建议</li>
                    <li>投资有风险，决策需谨慎。请结合自身情况咨询专业理财顾问</li>
                    <li>继续使用即视为您已阅读、理解并同意本条款全部内容</li>
                  </ul>
                </div>

                <h2 id="acceptance">1. 条款接受</h2>
                <p>访问、浏览或使用本工具，即表示您：</p>
                <ul>
                  <li>已年满 18 周岁，具备完全民事行为能力</li>
                  <li>已阅读、理解并同意遵守本条款及隐私政策</li>
                  <li>承诺不将本工具用于任何违法、违规或有害目的</li>
                </ul>
                <p>如您不同意任一条款，请立即停止使用本工具。</p>

                <h2 id="service">2. 服务内容</h2>
                <h3>2.1 核心功能</h3>
                <p>本工具提供在线复利计算服务，包括但不限于：</p>
                <ul>
                  <li>复利终值计算（支持月/季/年复利频率）</li>
                  <li>定投计划收益测算</li>
                  <li>可视化增长图表展示</li>
                  <li>年度明细表生成</li>
                  <li>关键财务指标分析（复利贡献率、资金倍数等）</li>
                </ul>
                
                <h3>2.2 服务性质</h3>
                <ul>
                  <li><strong>免费使用</strong>：核心功能永久免费，无需注册登录</li>
                  <li><strong>纯前端运行</strong>：计算在浏览器本地完成，不上传财务数据</li>
                  <li><strong>按现状提供</strong>：不保证服务不间断、及时、安全、无错误</li>
                </ul>

                <h2 id="license">3. 知识产权</h2>
                <h3>3.1 权利归属</h3>
                <p>本工具的所有内容（包括但不限于代码、界面设计、文案、图表、算法逻辑、商标、Logo）均受著作权法、商标法及相关法律保护，权利归 {siteConfig.author.name} 所有。</p>
                
                <h3>3.2 使用许可</h3>
                <p>我们授予您有限的、非排他的、不可转让的许可，仅供您个人非商业目的使用本工具。您不得：</p>
                <ul>
                  <li>复制、修改、分发、出售、出租、再许可本工具任何部分</li>
                  <li>反向工程、反编译、尝试获取源代码（开源部分除外）</li>
                  <li>移除任何版权声明、商标标识或权利声明</li>
                  <li>将本工具用于构建竞争产品或服务</li>
                </ul>

                <h2 id="user-conduct">4. 用户行为规范</h2>
                <p>您承诺不得：</p>
                <ul>
                  <li>利用本工具从事任何违反中国法律法规的活动</li>
                  <li>干扰、破坏本工具的正常运行（包括但不限于攻击服务器、爬虫滥用、自动化脚本压力测试）</li>
                  <li>传播病毒、木马、勒索软件等恶意代码</li>
                  <li>冒充他人、伪造身份或误导性使用本工具</li>
                  <li>侵犯第三方知识产权、隐私权或其他合法权益</li>
                </ul>
                <p>违反上述承诺，我们有权采取限制访问、追究法律责任等措施。</p>

                <h2 id="disclaimer">5. 免责声明</h2>
                <h3>5.1 计算结果仅供参考</h3>
                <p>本工具基于标准复利公式计算，结果受输入参数准确性影响。实际投资收益受市场波动、手续费、税费、分红再投资、汇率变动等多种因素影响，<strong>必然与计算结果存在差异</strong>。我们不对计算结果的准确性、完整性、适用性作任何明示或暗示的保证。</p>
                
                <h3>5.2 非专业建议</h3>
                <p>本工具提供的信息、计算结果、图表分析<strong>不构成</strong>投资建议、税务建议、法律建议或其他专业建议。任何基于本工具结果做出的投资决策，风险自负。</p>
                
                <h3>5.3 服务中断与数据丢失</h3>
                <p>我们不保证服务 7×24 小时不间断可用。因维护、升级、故障、不可抗力（自然灾害、网络故障、政策变更等）导致的服务中断、数据丢失，我们不承担责任。</p>
                
                <h3>5.4 第三方链接与广告</h3>
                <p>本工具可能包含第三方网站链接或展示第三方广告。我们不对第三方内容、产品、服务、隐私实践负责，也不背书其真实性、合法性。</p>

                <h2 id="limitation">6. 责任限制</h2>
                <p>在法律允许的最大范围内，{siteConfig.author.name} 对因使用或无法使用本工具导致的任何间接、偶然、特殊、惩罚性或后果性损害（包括但不限于利润损失、数据损失、业务中替、商誉损失）<strong>不承担任何责任</strong>。我们的总体责任上限不超过您为使用本工具实际支付的费用（即 0 元）。</p>

                <h2 id="indemnification">7. 赔偿</h2>
                <p>您同意就因您违反本条款、侵犯第三方权益或滥用本工具而产生的一切索赔、损失、费用（含合理律师费），向 {siteConfig.author.name} 进行赔偿并使其免责。</p>

                <h2 id="termination">8. 终止</h2>
                <p>我们可随时以任何理由（包括但不限于您违反本条款）终止或暂停您对本工具的访问，无需事先通知。本条款第 3、4、5、6、7、9、10 条在终止后继续有效。</p>

                <h2 id="governing-law">9. 适用法律与争议解决</h2>
                <ul>
                  <li><strong>适用法律</strong>：中华人民共和国大陆地区法律（不含冲突法规则）</li>
                  <li><strong>管辖法院</strong>：{siteConfig.author.name} 住所地有管辖权的人民法院</li>
                  <li><strong>优先协商</strong>：争议双方应友好协商解决；协商不成再提起诉讼</li>
                </ul>

                <h2 id="changes">10. 条款变更</h2>
                <p>我们有权随时修改本条款。修改后的条款发布于本页面即时生效。继续使用即视为接受修改。建议定期查看。重大变更我们会通过网站公告或邮件提醒。</p>

                <h2 id="contact">11. 联系我们</h2>
                <p>如对本条款有任何疑问，请联系：</p>
                <ul>
                  <li>邮箱：<a href={`mailto:${siteConfig.contact.email}`} className="text-primary-600 hover:underline">{siteConfig.contact.email}</a></li>
                  <li>微信：{siteConfig.contact.wechat}</li>
                </ul>

                <hr className="my-12 border-slate-200 dark:border-slate-700" />
                <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
                  本使用条款版本：v1.0 · 发布日期：{lastUpdated} · 适用于 {siteConfig.name} 及其关联小程序
                </p>
              </div>
            </div>
          </section>

          <AdInArticle />
        </main>

        <Footer currentPath="/terms" />
      </div>
    </>
  );
}