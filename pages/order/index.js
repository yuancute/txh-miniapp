// pages/order/index.js
let App = getApp();
let api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataType:'all',
    list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.dataType = options.type|| 'all';
    this.setData({dataType:this.data.dataType});
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getOrderList(this.data.dataType);
  },
  /**
   * 获取订单列表
   */
  getOrderList:function(dataType){
    let _this = this;
    api.getOrderList({dataType}).then(res=>{
      _this.setData(res.data);
      res.data.list.length && wx.pageScrollTo({
        scrollTop:0
      })
    })
  },
  
  /**
   * 求换标签
   */
  bindHeaderTap:function(e){
    this.setData({dataType:e.target.dataset.type});
    this.getOrderList(e.target.dataset.type);
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
            _this.getOrderList(_this.data.dataType);
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
            _this.getOrderList(_this.data.dataType);
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
          // 跳转到已付款订单
          wx.navigateTo({
            url: '../order/detail?order_id=' + order_id
          });
        },
        fail: function () {
          App.showError('订单未支付');
        },
      });
    })
  },

  /**
   * 跳转订单详情页
   */
  detail:function(e){
    let order_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../order/detail?order_id=' + order_id,
    })
  },
  onPuallDownRefresh:function(){
    wx.stopPullDownRefresh();
  }
})