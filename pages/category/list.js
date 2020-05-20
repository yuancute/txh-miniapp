// pages/category/list.js
let app = getApp();
var api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchColor: "rgba(0,0,0,0.4)",
    searchSize: "15",
    searchName: "搜索商品",

    scrollHeight: null,
    showView: false,
    arrange: "",

    sortType: 'all',    // 排序类型
    sortPrice: false,   // 价格从低到高

    option: {},
    list: {},

    noList: true,
    no_more: false,

    page: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log('op',options);
    let _this = this;
    _this.setListHeight();
    _this.setData({options},function (){
      _this.getGoodsList(true);
    })
  },

  /**
   * 获取商品列表
   */
  getGoodsList:function(is_super,page){
    let _this = this;
    let params = {
      page:page || 1,
      sortType:_this.data.sortType,
      sortPrice:_this.data.sortPrice ? 1:0,
      category_id:_this.data.options.category_id || 0,
      search:_this.data.options.search || '',
    }
    api.getGoodsList(params).then(res=>{
      let resultList = res.data.list;
      let dataList= _this.data.list;
      if(is_super === true || typeof dataList.data ==='undefined'){
        _this.setData({list:resultList,noList:false});
      }else{
        _this.setData({'list.data':dataList.data.concat(resultList.data)});
      }
    })
  },

  /**
   * 设置商品列表高度
   */
  setListHeight:function(){
    let _this=this;
    wx.getSystemInfo({
      success:function(res){
        _this.setData({
          scrollHeight:res.windowHeight - 90,
        });
      }
    })
  },

  /**
   * 切换排序方式
   */
  switchSortType:function(e){
    let _this = this;
    let newSortType = e.currentTarget.dataset.type;
    let newSortPrice = newSortType === 'price' ? !_this.data.sortPrice :true;
    _this.setData({
      list:{},
      page:1,
      sortType:newSortType,
      sortPrice:newSortPrice
    },function(){
      _this.getGoodsList(true);
    });
  },

  /**
   * 切换列表显示方式
   */
  onChangeShowState:function(){
    let _this = this;
    _this.setData({
      showView: !_this.data.showView,
      arrange: _this.data.arrange ? "" : "arrange"
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})