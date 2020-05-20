// pages/personal-info/index.js
const App = getApp();
var api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin:false,
    userInfo:{},
    orderCount:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let _this= this
    _this.setData({
      isLogin:App.checkIsLogin()
    });
    if(_this.data.isLogin){
      _this.getUserDetail();
    }
  },
  /**
   * 获取用户信息
   */
  getUserDetail(){
    let _this = this;
    api.getUserInfo({}).then(res=>{
      _this.setData(res.data);
    })
  },

  /**
   * 订单导航跳转
   */
  onTargetOrder(e) {
    let _this = this;
    if (!_this.onCheckLogin()) {
      return false;
    }
    let urls = {
      all: '/pages/order/index?type=all',
      payment: '/pages/order/index?type=payment',
      delivery: '/pages/order/index?type=delivery',
      received: '/pages/order/index?type=received'
    };
    // 转跳指定的页面
    wx.navigateTo({
      url: urls[e.currentTarget.dataset.type]
    })
  },
    /**
   * 菜单列表导航跳转
   */
  onTargetMenus(e) {
    let _this = this;
    if (!_this.onCheckLogin()) {
      return false;
    }
    wx.navigateTo({
      url: '/' + e.currentTarget.dataset.url
    })
  },
  /**
   * 跳转到登录页
   */
  onLogin(){
    console.log(wx.getStorageSync('haha'));
    wx.navigateTo({
      url: '../login/index',
    })
  },
    /**
   * 验证是否已登录
   */
  onCheckLogin() {
    let _this = this;
    if (!_this.data.isLogin) {
      App.showError('很抱歉，您还没有登录');
      return false;
    }
    return true;
  },
})