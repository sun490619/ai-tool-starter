import Taro, { Component } from '@tarojs/taro';
import { Provider as StoreProvider } from 'react-redux';
import store from './store';

import './app.scss';

// 需要在 app.js 中注册运行时框架
// import 'taro-ui/dist/style/index.scss'

class App extends Component {
  config = {
    pages: [
      'pages/index/index',
      'pages/calculator/index',
      'pages/privacy/index',
      'pages/terms/index',
      'pages/disclaimer/index',
      'pages/about/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#0ea5e9',
      navigationBarTitleText: '复利计算器',
      navigationBarTextStyle: 'white',
      backgroundColor: '#f8fafc',
      enablePullDownRefresh: true,
    },
    tabBar: {
      color: '#94a3b8',
      selectedColor: '#0ea5e9',
      backgroundColor: '#ffffff',
      borderStyle: 'white',
      list: [
        {
          pagePath: 'pages/index/index',
          text: '首页',
          iconPath: 'assets/icons/home.png',
          selectedIconPath: 'assets/icons/home-active.png',
        },
        {
          pagePath: 'pages/calculator/index',
          text: '计算器',
          iconPath: 'assets/icons/calculator.png',
          selectedIconPath: 'assets/icons/calculator-active.png',
        },
        {
          pagePath: 'pages/about/index',
          text: '关于',
          iconPath: 'assets/icons/about.png',
          selectedIconPath: 'assets/icons/about-active.png',
        },
      ],
    },
    networkTimeout: {
      request: 10000,
      connectSocket: 10000,
      uploadFile: 10000,
      downloadFile: 10000,
    },
    debug: false,
    functionalPages: true,
    subPackages: [],
    workers: 'workers',
    requiredBackgroundModes: [],
    plugins: {},
    preloadRule: {},
    resizable: true,
    navigateToMiniProgramAppIdList: [],
    permission: {},
    lazyCodeLoading: 'requiredComponents',
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // 检查更新
    this.checkUpdate();
    // 获取系统信息
    this.getSystemInfo();
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError(err) {
    console.error('App Error:', err);
    // 上报错误
    this.reportError(err);
  }

  // 检查小程序更新
  checkUpdate() {
    const updateManager = Taro.getUpdateManager();
    updateManager.onCheckForUpdate((res) => {
      console.log('检查更新:', res.hasUpdate);
    });
    updateManager.onUpdateReady(() => {
      Taro.showModal({
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
  }

  // 获取系统信息
  async getSystemInfo() {
    try {
      const res = await Taro.getSystemInfo();
      Taro.setStorageSync('systemInfo', res);
    } catch (e) {
      console.error('获取系统信息失败:', e);
    }
  }

  // 上报错误
  reportError(err) {
    try {
      Taro.request({
        url: 'https://your-api.com/error-report',
        method: 'POST',
        data: {
          message: err.message,
          stack: err.stack,
          timestamp: Date.now(),
          systemInfo: Taro.getStorageSync('systemInfo'),
        },
      });
    } catch (e) {
      console.error('错误上报失败:', e);
    }
  }

  render() {
    return (
      <StoreProvider store={store}>
        {this.props.children}
      </StoreProvider>
    );
  }
}

export default App;