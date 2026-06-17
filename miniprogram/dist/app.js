// app.js
App({
  globalData: {
    userInfo: null,
    siteName: '复利智投',
    siteUrl: 'https://ai-tool-starter-nu.vercel.app'
  },

  onLaunch() {
    // 检查更新
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate((res) => {
      console.log('检查更新:', res.hasUpdate);
    });
    updateManager.onUpdateReady(() => {
      wx.showModal({
        title: '更新提示',
        content: '新版本已准备好，是否重启应用？',
        success: (res) => {
          if (res.confirm) {
            updateManager.applyUpdate();
          }
        },
      });
    });
    updateManager.onUpdateFailed(() => {
      console.log('更新失败');
    });

    // 获取系统信息
    wx.getSystemInfo({
      success: (res) => {
        wx.setStorageSync('systemInfo', res);
      },
      fail: (e) => {
        console.error('获取系统信息失败:', e);
      }
    });
  },

  onShow() {},

  onHide() {},

  onError(err) {
    console.error('App Error:', err);
  }
});