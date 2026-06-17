# 🧮 AI 工具站启动模板 - 复利计算器 (Web + 微信小程序双端)

> **一句话介绍**：开箱即用的复利计算器双端模板，Web 端部署 Vercel/Cloudflare，小程序端接入微信流量主广告变现。**代码复用率 90%+**，核心计算逻辑完全共享。

---

## ✨ 核心特性

| 特性 | Web 端 | 小程序端 |
|------|--------|----------|
| **框架** | Next.js 14 (App Router) + React 18 | Taro 4.x + React |
| **语言** | TypeScript 严格模式 | TypeScript |
| **样式** | Tailwind CSS | SCSS (Taro 内置) |
| **图表** | Chart.js + react-chartjs-2 | Canvas 2D 原生绘制 |
| **部署** | Vercel / Cloudflare Pages (静态导出) | 微信开发者工具上传 |
| **广告** | Google AdSense (自动广告/固定位) | 微信流量主 (Banner/视频/格子/自定义) |
| **SEO** | 完整 Meta/Schema/Sitemap/Robots | 小程序搜索/分享卡片 |
| **合规页** | 隐私/条款/免责/关于 (4页) | 同 4 页合规内容 |
| **多语言/币种** | 中英/人民币/美元/港币 | 同配置 |

---

## 🚀 30 分钟从 0 到上线

### 前置准备（一次性）

| 账号/工具 | 用途 | 免费吗 |
|-----------|------|--------|
| GitHub | 托管代码、触发部署 | ✅ |
| Vercel / Cloudflare | Web 端免费托管 + HTTPS + CDN | ✅ |
| 微信开发者工具 | 小程序开发/预览/上传 | ✅ |
| 微信公众平台 | 注册小程序、开通流量主 | ✅ (个人主体免费) |
| Node.js 18+ | 本地开发环境 | ✅ |

---

### 步骤 1：克隆与安装

```bash
# 1. 克隆仓库 (替换为你的 GitHub 仓库地址)
git clone https://github.com/yourname/ai-tool-starter.git
cd ai-tool-starter

# 2. 安装 Web 端依赖
npm install

# 3. 安装小程序端依赖
cd miniprogram && npm install && cd ..

# 4. 同步共享代码到小程序端
npm run prepare:miniprogram
# 或手动: node scripts/sync-to-miniprogram.js
```

---

### 步骤 2：本地开发预览

```bash
# 终端 1：Web 端开发 (http://localhost:3000)
npm run dev

# 终端 2：小程序端开发 (持续监听编译)
cd miniprogram && npm run dev

# 打开微信开发者工具 → 导入 miniprogram/dist 目录 → 点击"编译"预览
```

---

### 步骤 3：配置你的站点信息

**只需改一个文件**：`lib/site-config.ts`

```typescript
export const siteConfig = {
  name: '你的品牌名',
  shortName: '复利计算器',
  description: '你的SEO描述...',
  url: 'https://your-domain.com',  // 部署后填真实域名

  author: {
    name: '你的名字/品牌',
    email: 'your@email.com',
    website: 'https://your-domain.com',
  },

  contact: {
    email: 'your@email.com',
    wechat: 'your-wechat-id',
  },

  icp: {
    number: '京ICP备xxxxxxxx号',  // 有备案才填，没备案留空或删掉
    url: 'https://beian.miit.gov.cn',
  },

  // 💰 广告配置 - 审核通过后填真实 ID
  ads: {
    adsense: {
      enabled: false,  // 先 false，AdSense 通过后改 true
      clientId: 'ca-pub-xxxxxxxxxxxxxxxx',
      slots: { header: '', sidebar: '', footer: '', inArticle: '' },
    },
    wechatAd: {
      enabled: false,  // 先 false，流量主开通后改 true
      appId: 'wx_xxxxxxxxxxxxxxxx',
      unitIds: {
        banner: '', video: '', grid: '', custom: '',
      },
    },
  },

  analytics: {
    googleAnalytics: { enabled: false, measurementId: 'G-XXXXXXXXXX' },
  },
};
```

---

### 步骤 4：部署 Web 端 (Vercel 推荐)

```bash
# 方式 1：GitHub 连接 Vercel (推荐，自动部署)
# 1. 推代码到 GitHub
git add . && git commit -m "feat: initial commit" && git push origin main

# 2. 登录 vercel.com → Import Git Repository → 选你的 repo
# 3. Framework Preset: Next.js → Deploy
# 4. 绑定自定义域名 (Settings → Domains)

# 方式 2：CLI 部署
npx vercel --prod
```

**Cloudflare Pages 部署**：
1. 登录 dash.cloudflare.com → Pages → Connect to Git
2. Build command: `npm run build` / Output: `out`
3. 绑定域名、开启 HTTPS、Cache 规则

---

### 步骤 5：注册并配置微信小程序

| 步骤 | 操作 | 耗时 |
|------|------|------|
| 1 | 打开 mp.weixin.qq.com → 注册小程序 → 选择"个人"主体 | 10 分钟 |
| 2 | 完成实名认证 (身份证+人脸) | 1-3 天审核 |
| 3 | 设置小程序名称、头像、简介 | 5 分钟 |
| 4 | 开发设置 → 获取 AppID → 填入 `site-config.ts` | 1 分钟 |
| 5 | 微信开发者工具 → 导入 `miniprogram/dist` → 上传代码 | 5 分钟 |
| 6 | 提交审核 (体验版 → 审核版) | 1-7 天 |

**关键审核点**：
- 必须有隐私政策、用户协议、免责声明页面 (模板已含)
- 功能页不能只有广告，核心计算器要完整可用
- 类目建议选：**工具 - 计算器** 或 **金融 - 投资理财工具**

---

### 步骤 6：开通微信流量主广告 (变现核心)

| 条件 | 要求 |
|------|------|
| 小程序发布上线 | ✅ 已通过审核 |
| 累计访问用户 (UV) | ≥ **1000** (近 30 天) |
| 主体类型 | 个人/个体户/企业均可 |

**开通流程**：
1. 小程序后台 → 流量主 → 开通
2. 创建广告位：Banner(首页/计算器顶部)、视频/格子(计算器底部/明细表间隙)
3. 复制广告单元 ID → 填入 `lib/site-config.ts` 的 `wechatAd.unitIds`
4. 设置 `enabled: true` → 重新编译上传小程序

**预估收益**：
- 千次展示 (RPM) ¥0.3 - ¥3 (视行业/用户质量)
- 1000 UV/天 ≈ 3000 PV/天 ≈ ¥1-9/天 ≈ **¥30-270/月/个小程序**
- 矩阵做 5-10 个工具类小程序 → **月入 ¥500-3000+ 被动收入**

---

### 步骤 7：申请 Google AdSense (Web 端补充变现)

| 条件 | 要求 |
|------|------|
| 域名 | 已备案/海外域名均可，需解析到 Vercel/CF |
| 网站内容 | 原创、完整、合规页齐全、无违规内容 |
| 流量 | 无硬性门槛，但有真实用户更易通过 |
| 年龄 | ≥ 18 岁，需真实身份 + 地址 (收 PIN 码) |

**申请流程**：
1. 登录 adsense.google.com → 关联网站
2. 复制 `<head>` 标签代码 → 填入 `site-config.ts` 的 `adsense.clientId`
3. 设置 `enabled: true` → 重新部署 Web 端
4. 等待审核 (几天到几周)
5. 通过后 → 创建广告单元 → 填入 `slots` 配置

---

## 📁 项目结构速览

```
ai-tool-starter/
├── app/                          # Next.js App Router 页面
│   ├── page.tsx                  # 首页 (含计算器预览)
│   ├── calculator/page.tsx       # 计算器完整页
│   ├── privacy/page.tsx          # 隐私政策
│   ├── terms/page.tsx            # 使用条款
│   ├── disclaimer/page.tsx       # 免责声明
│   ├── about/page.tsx            # 关于我们
│   ├── layout.tsx                # 根布局 + SEO/Schema
│   └── globals.css               # Tailwind 全局样式
├── components/                   # 共享 React 组件
│   ├── calculator-form.tsx       # 计算器表单 (核心 UI)
│   ├── layout.tsx                # Header/Footer
│   ├── adsense.tsx               # AdSense 广告组件
│   └── ...
├── lib/                          # 核心逻辑 (Web+小程序共享)
│   ├── calculator.ts             # 🧮 复利计算引擎 (纯 TS)
│   ├── site-config.ts            # ⚙️ 站点配置 (单一事实来源)
│   └── utils.ts                  # 工具函数
├── miniprogram/                  # 微信小程序端 (Taro)
│   ├── src/
│   │   ├── app.tsx               # 小程序入口 + tabBar 配置
│   │   ├── pages/
│   │   │   ├── index/            # 首页
│   │   │   ├── calculator/       # 计算器 (含 Canvas 图表)
│   │   │   ├── privacy/terms/disclaimer/about/  # 合规页
│   │   └── lib/                  # 同步自 web/lib (勿手改)
│   ├── config/index.js           # Taro 配置
│   └── package.json
├── scripts/
│   └── sync-to-miniprogram.js    # 单向同步脚本 (Web → 小程序)
├── package.json
├── next.config.js                # 静态导出配置
├── tailwind.config.js
├── tsconfig.json
└── .gitignore
```

---

## 🔧 核心文件修改指南

| 需求 | 修改文件 |
|------|----------|
| 改品牌名/SEO/联系方式/备案号 | `lib/site-config.ts` |
| 改计算公式/默认参数/货币 | `lib/calculator.ts` |
| 改计算器 UI/交互 | `components/calculator-form.tsx` |
| 改首页文案/展示 | `app/page.tsx` |
| 改合规页内容 | `app/privacy|terms|disclaimer|about/page.tsx` |
| 改小程序 tabBar/页面路由 | `miniprogram/src/app.tsx` |
| 改小程序样式 | `miniprogram/src/pages/**/*.scss` |
| 新增工具页面 | 1. `lib/calculator.ts` 加逻辑 2. `components/` 加 UI 3. `app/new-tool/page.tsx` + `miniprogram/src/pages/new-tool/` |

---

## 💡 进阶玩法：工具站矩阵化

**同一套代码，配置不同 `site-config.ts`，批量产出：**

| 工具类型 | 关键词示例 | RPM 参考 | 适合人群 |
|----------|------------|----------|----------|
| 复利/定投计算器 | compound interest calculator | ¥1-3 / $3-8 | 理财入门/长期投资 |
| 房贷计算器 | mortgage calculator | ¥2-5 / $5-15 | 购房者/房产中介 |
| 个税/工资计算器 | salary tax calculator | ¥1-4 / $4-12 | 职场人士/HR |
| 退休/养老金测算 | retirement calculator | ¥2-6 / $5-20 | 35+中产/财务自由追求者 |
| 单位换算/汇率 | unit converter | ¥0.5-2 / $2-5 | 学生/跨境电商/留学 |
| 日期/倒计时 | days counter | ¥0.3-1 / $1-3 | 备考/备孕/纪念日 |

**矩阵操作 SOP**：
1. 复制项目 → 改 `site-config.ts` (名称/关键词/配色/广告位)
2. `lib/calculator.ts` 增加对应计算逻辑
3. 部署新域名/子域名 → 提交 Search Console
4. 小程序改名/改类目 → 重新审核
5. 重复 5-10 次 → 形成工具矩阵 → 互相导流 + 矩阵变现

---

## 🛡️ 合规与避坑清单

### 必做 (否则审核不过/封号)
- [ ] 隐私政策、用户协议、免责声明、关于我们 **4页齐全**
- [ ] 小程序类目选对 (工具-计算器 / 金融-投资理财)
- [ ] 无诱导分享、无虚假收益承诺、无违规金融建议
- [ ] Web 端 HTTPS + CSP + 无混合内容
- [ ] 真实联系方式、真实 ICP 备案 (如在大陆)

### 广告合规
- [ ] AdSense: 广告不遮挡内容、不诱导点击、ads.txt 配置
- [ ] 流量主: 广告位不干扰核心功能、视频广告可关闭
- [ ] 免责声明明确：计算结果仅供参考、不构成投资建议

### 数据安全
- [ ] 纯前端计算，财务数据不上传 (代码已保证)
- [ ] 无 Cookie/无追踪/无用户画像 (如未启用 Analytics)
- [ ] 隐私政策声明符合《个保法》

---

## 📊 变现路径总结

| 路径 | 门槛 | 周期 | 上限 | 适合阶段 |
|------|------|------|------|----------|
| **微信流量主** | 1000 UV/天 | 1-3 月 | ¥500-5000/月/个 | 🎯 **新手首选** |
| **Google AdSense** | 域名+内容合规 | 1-2 月 | $100-5000+/月 | Web 端补充 |
| **联盟营销 (CPS)** | 有精准流量 | 即时 | 看转化 | 进阶 |
| **卖模板/源码/SOP** | 整理文档 | 即时 | ¥29.9-999/份 | 个人品牌 |
| **导流私域/知识付费** | 建立信任 | 3-6 月 | 无上限 | 长期复利 |

---

## 🤝 贡献与支持

- **Star** ⭐ 让更多人发现
- **Issue** 🐛 报 Bug / 提需求
- **PR** 🔧 改进代码 / 新增工具
- **分享** 📢 转发给需要的人

---

## 📄 许可证

MIT License - 免费商用、修改、分发均可。保留版权声明即可。

> **免责声明**：本模板提供的计算器仅供学习参考，不构成投资建议。实际投资请咨询持牌专业人士。使用本模板搭建的站点/小程序合规责任由使用者自行承担。

---

**开始你的工具站之旅** 👉 `git clone https://github.com/yourname/ai-tool-starter.git`