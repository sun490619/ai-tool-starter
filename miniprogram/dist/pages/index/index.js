// index.js
Page({
  data: {},

  onLoad() {
    // 页面加载
  },

  onPullDownRefresh() {
    // 下拉刷新
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 500);
  },

  onShareAppMessage() {
    return {
      title: '复利智投 - 专业免费复利计算器',
      path: '/pages/index/index',
      imageUrl: ''
    };
  },

  onShareTimeline() {
    return {
      title: '复利智投 - 专业免费复利计算器',
    };
  }
});