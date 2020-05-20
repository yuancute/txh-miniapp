// pages/search/index.js
let App = getApp();
let api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recentSearch:[],
    searchValue:'',
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
    this.getRecentSearch();
  },

  /**
   * 获取历史搜索
   */
  getRecentSearch:function(){
    let recentSearch = wx.getStorageSync('recentSearch');
    this.setData({recentSearch});
  },

  /**
   * 绑定输入值
   */
  getSearchContent:function(e){
    this.data.searchValue = e.detail.value;
  },
  /**
   * 搜索提交
   */
  search:function(){
    let _this = this;
    if(_this.data.searchValue){
      let recentSearch = wx.getStorageSync('recentSearch')||[];
      console.log(recentSearch);
      recentSearch.unshift(_this.data.searchValue);
      wx.setStorageSync('recentSearch', recentSearch);
      wx.navigateTo({
        url: '../category/list?search=' + _this.data.searchValue,
      })
    }
  },

  /**
   * 清空最近搜索记录
   */
  clearSearch:function(){
    wx.removeStorageSync('recentSearch');
    this.getRecentSearch();
  },
  /**
   * 跳转到最近搜索
   */
  goSearch:function(e){
    wx.navigateTo({
      url: '../category/list?search=' + e.target.dataset.text,
    })
  },

})