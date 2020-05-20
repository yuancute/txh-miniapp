// pages/order/detail.js
let App = getApp();
let api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_id:null,
    order:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.order_id = options.order_id;
    this.getOrderDetail(options.order_id);
  },

  /**
   * 获取订单详情
   */
  getOrderDetail:function(order_id){
    let _this = this;
    api.getOrderDetail({order_id}).then(res=>{
      _this.setData(res.data);
    })
  },
  /**
   * 跳转到商品详情
   */
  goodsDetail:function(e){
    let goods_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../goods/index?goods_id=' + goods_id,
    })
  },

  /**
   * 取消订单
   */
  cancelOrder:function(e){
    let _this = this;
    let order_id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content:"确认取消订单？",
      success:function(o){
        if(o.confirm){
          api.cancelOrder({order_id}).then(res=>{
            wx.navigateBack();
          })
        }
      }
    })
  },
  
  /**
   * 确定收货
   */
  receipt:function(e){
    let _this = this;
    let order_id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content:'确认收到商品？',
      success:function(o){
        if(o.confirm){
          api.receipt({order_id}).then(res=>{
            _this.getOrderDetail(order_id);
          })
        }
      }
    })
  },
  /**
   * 发起付款
   */
  payOrder:function(e){
    let _this = this;
    let order_id = e.currentTarget.dataset.id;
    wx.showLoading({
      title: '正在处理...',
    });
    api.payOrder({order_id}).then(res=>{
      if (res.code === -10) {
        App.showError(res.msg);
        return false;
      }
      // 发起微信支付
      wx.requestPayment({
        timeStamp: res.data.timeStamp,
        nonceStr: res.data.nonceStr,
        package: 'prepay_id=' + res.data.prepay_id,
        signType: 'MD5',
        paySign: res.data.paySign,
        success: function (res) {
          _this.getOrderDetail(order_id);
        },
        fail: function () {
          App.showError('订单未支付');
        },
      });
    })
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})