// pages/address/index.js
let App = getApp();
let api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    default_id:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.options = options
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getAddressList();
  },

  /**
   * 获取收货地址列表
   */
  getAddressList:function(){
    let _this =this;
    api.getAddressList({}).then(res=>{
      _this.setData(res.data);
    })
  },
  /**
   * 添加新地址
   */
  createAddress:function(){
    wx.navigateTo({
      url: './create',
    })
  },
  /**
   * 编辑地址
   */
  editAddress:function(e){
    wx.navigateTo({
      url: './detail?address_id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 移除地址
   */
  removeAddress:function(e){
    let _this = this,
      address_id = e.currentTarget.dataset.id;
      wx.showModal({
        title:'提示',
        content:'您确定要移除当前收货地址吗？',
        success:function(o){
          o.confirm && api.deleteAddress({address_id}).then(res=>{
            _this.getAddressList();
          })
        }
      })
  },
  /**
   * 设置默认地址
   */
  setDefault:function(e){
    let _this= this;
    let address_id = e.detail.value;
    _this.setData({
      default_id:parseInt(address_id)
    });
    api.setDefaultAddress({address_id}).then(res=>{
      _this.data.options.from === 'cart' && wx.navigateBack();
    });
    return false;
  },
})