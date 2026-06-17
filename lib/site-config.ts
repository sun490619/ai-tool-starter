/**
 * Site Configuration
 * Modify this file to customize your tool site
 */

export const siteConfig = {
  // 基础信息
  name: '复利计算器',
  shortName: '复利计算器',
  description: '专业的在线复利计算器，支持定投、复利频率设置、收益可视化图表。帮助您规划投资未来，实现财富增值。',
  url: 'https://your-domain.com',
  
  // 作者/所有者信息（用于隐私政策、版权等）
  author: {
    name: '您的名字/品牌名',
    email: 'your-email@example.com',
    website: 'https://your-domain.com',
  },
  
  // 联系信息
  contact: {
    email: 'your-email@example.com',
    wechat: 'your-wechat-id',
  },
  
  // 备案信息（中国大陆必需）
  icp: {
    number: '京ICP备xxxxxxxx号',
    url: 'https://beian.miit.gov.cn',
  },
  
  // 广告配置
  ads: {
    // Google AdSense (Web端)
    adsense: {
      enabled: false,
      clientId: 'ca-pub-xxxxxxxxxxxxxxxx',  // 替换为您的 AdSense 发布商 ID
      slots: {
        header: 'xxxxxxxxxx',
        sidebar: 'xxxxxxxxxx',
        footer: 'xxxxxxxxxx',
        inArticle: 'xxxxxxxxxx',
      },
    },
    // 微信小程序流量主
    wechatAd: {
      enabled: false,
      appId: 'wx_xxxxxxxxxxxxxxxx',  // 替换为您的小程序 AppID
      unitIds: {
        banner: 'xxxxxxxxxxxxxxxx',      // 横幅广告单元 ID
        video: 'xxxxxxxxxxxxxxxx',       // 视频广告单元 ID
        grid: 'xxxxxxxxxxxxxxxx',        // 格子广告单元 ID
        custom: 'xxxxxxxxxxxxxxxx',      // 自定义广告单元 ID
      },
    },
  },
  
  // 统计分析
  analytics: {
    googleAnalytics: {
      enabled: false,
      measurementId: 'G-XXXXXXXXXX',
    },
    umami: {
      enabled: false,
      websiteId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      scriptUrl: 'https://your-umami-domain.com/script.js',
    },
  },
  
  // SEO 配置
  seo: {
    keywords: [
      '复利计算器',
      '定投计算器',
      '投资收益计算',
      '理财规划工具',
      '财富增值计算',
      '复利效应',
      '在线计算器',
    ],
    openGraph: {
      type: 'website',
      locale: 'zh_CN',
      siteName: '复利计算器',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@your-twitter',
      creator: '@your-twitter',
    },
  },
  
  // 工具配置
  tool: {
    // 支持的货币
    currencies: [
      { code: 'CNY', symbol: '¥', name: '人民币' },
      { code: 'USD', symbol: '$', name: '美元' },
      { code: 'HKD', symbol: 'HK$', name: '港币' },
    ],
    // 默认货币
    defaultCurrency: 'CNY',
    // 复利频率选项
    compoundFrequencies: [
      { value: 'monthly', label: '按月复利', description: '每月结算一次利息' },
      { value: 'quarterly', label: '按季复利', description: '每季度结算一次利息' },
      { value: 'annually', label: '按年复利', description: '每年结算一次利息' },
    ],
    // 年化收益率预设
    ratePresets: [3, 5, 7, 10, 12, 15],
  },
  
  // 导航菜单
  navigation: [
    { href: '/', label: '首页' },
    { href: '/calculator', label: '复利计算器' },
    { href: '/about', label: '关于我们' },
    { href: '/privacy', label: '隐私政策' },
    { href: '/terms', label: '使用条款' },
    { href: '/disclaimer', label: '免责声明' },
  ],
  
  // 社交链接
  social: {
    wechat: 'https://your-wechat-qr-code.com',
    github: 'https://github.com/yourusername',
    twitter: 'https://twitter.com/yourusername',
  },
  
  // 版权年份
  copyrightYear: new Date().getFullYear(),
};

export type SiteConfig = typeof siteConfig;