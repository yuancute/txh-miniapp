//app.js
var api = require('utils/api.js');
const tabBarLinks = [
  'pages/home/index',
  'pages/category/index',
  'pages/cart/index',
  'pages/user/index'
];
App({
  onLaunch: function () {
    // 展示本地存储能力
    /*var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })*/
  },
  globalData: {
    user_id: null
  },

  /**
   * 获取小程序基础信息
   */
  getWxappBase(callback) {
    api.getWxappBase({}).then(res => {
      //记录小程序基础信息
      wx.setStorageSync('wxapp', res.data.wxapp);
      callback && callback(res.data.wxapp);
    })
  },
  /**
   * 设置当前页面标题
   */
  setTitle() {
    let App = this,
      wxapp;
    if (wxapp = wx.getStorageSync('wxapp')) {
      wx.setNavigationBarTitle({
        title: wxapp.navbar.wxapp_title
      });
    } else {
      App.getWxappBase(() => {
        App.setTitle();
      });
    }
  },

  /**
   * 设置navbar标题、颜色
   */
  setNavigationBar() {
    let App = this;
    // 获取小程序基础信息
    App.getWxappBase(wxapp => {
      // 设置navbar标题、颜色
      wx.setNavigationBarColor({
        frontColor: wxapp.navbar.top_text_color.text,
        backgroundColor: wxapp.navbar.top_background_color
      })
    });
  },

  /**
   * 获取tabBar页面路径列表
   */
  getTabBarLinks() {
    return tabBarLinks;
  },

  //显示成功提示框
  showSuccess(msg, callback) {
    wx.showToast({
      title: msg,
      icon: 'success',
      success() {
        callback && (setTimeout(() => {
          callback();
        }, 1500));
      }
    })
  },
  //显示失败提示框
  showError(msg, callback) {
    wx.showModal({
      title: '友情提示',
      content: msg,
      showCancel: false,
      success() {
        callback && callback();
      }
    })
  },
  /**
   * 当前用户id
   */
  getUserId() {
    return wx.getStorageSync('user_id') || 0;
  },
  /**
   * 验证是否存在user_info
   */
  validateUserInfo() {
    return !!wx.getStorageSync('user_info');
  },

  /**
   * 对象转url
   */
  urlEncode(data) {
    var _result = [];
    for (var key in data) {
      var value = data[key];
      if (value.constructor == Array) {
        value.forEach(_value => {
          _result.push(key + "=" + _value);
        });
      } else {
        _result.push(key + "=" + value);
      }
    };
    return _result.join('&');
  },

  /**
   * 验证登录
   */
  checkIsLogin() {
    return wx.getStorageSync('token') != '' && wx.getStorageSync('user_id') != '';
  },

  /**
   * 授权登录
   */
  getUserInfo(e, callback) {
    //console.log(e);
    let App = this;
    if (e.detail.errMsg !== 'getUserInfo:ok') {
      return false;
    }
    /*wx.showLoading({
      title: '正在登录',
      mask:true
    })*/
    //执行微信登录
    wx.login({
      success: (res) => {
        //console.log(res);
        let params = {
          code: res.code,
          user_info: e.detail.rawData,
          encrypted_data: e.detail.encrytedData,
          iv: e.detail.iv,
          signature: e.detail.signature
        }
        api.login(params).then(res => {
          //console.log(res);
          wx.setStorageSync('token', res.data.token);
          wx.setStorageSync('user_id', res.data.user_id);
          callback && callback();
        }).catch(error => {
          console.log('login-error', error);
        })
      },
    });
  },
})