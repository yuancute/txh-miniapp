// pages/category/index.js
var api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      // 搜索框样式
    searchColor: "rgba(0,0,0,0.4)",
    searchSize: "15",
    searchName: "搜索商品",

    // 列表高度
    scrollHeight: 0,

    // 一级分类：指针
    curNav: true,
    curIndex: 0,

    // 分类列表
    list: [],

    // show
    notcont: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    //设置分类列表高度
    _this.setListHeight();
    //获取分类列表
    _this.getCategoryList();
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

  },

  /**
   * 设置分类列表高度
   */
  setListHeight:function(){
    let _this=this;
    wx.getSystemInfo({
      success: (res) => {
        _this.setData({
          scrollHeight:res.windowHeight-47,
        })
      },
    })
  },
  /**
   * 获取分类列表
   */
  getCategoryList:function(){
    let _this = this;
    api.getCategoryList({}).then(res=>{
      let data = res.data;
      //console.log(data);
      _this.setData({
        list:data.list,
        curNav:data.list.length > 0 ? data.list[0].category_id : true,
        notcont:!data.list.length
      });
    });
  },

  /**
   * 一级分类：选中分类
   */
  selectNav:function(e){
    console.log(e);
    let curNav = e.target.dataset.id;
    let curIndex = parseInt(e.target.dataset.index);
    this.setData({
      curNav,
      curIndex,
      scrollTop:0
    })
  }

})