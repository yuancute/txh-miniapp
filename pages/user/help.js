// pages/user/help.js
let App = getApp();
let api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getHelpList();
  },

  /**
   * 获取帮助列表
   */
  getHelpList:function(){
    let _this  = this;
    api.getWxappHelp({}).then(res=>{
      _this.setData(res.data);
    })
  }
})