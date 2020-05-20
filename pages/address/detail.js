// pages/address/detail.js
let App = getApp();
let api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled:false,
    nav_select:false,
    region:'',
    detail:{},

    error:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAddressDetail(options.address_id);
  },

  /**
   * 获取当前地址信息
   */
  getAddressDetail:function(address_id){
    let _this = this;
    api.getAddressDetail({address_id}).then(res=>{
      _this.setData(res.data);
    })
  },
  /**
   * 表单提交
   */
  saveData:function(e){
    let _this= this;
    let values = e.detail.value
      values.region = _this.data.region;
    //表单验证
    if(!_this.validation(values)){
      App.showError(_this.data.error);
      return false;
    }
    //按钮禁用
    _this.setData({
      disabled:true
    });
    //提交到后端
    values.address_id = _this.data.detail.address_id;
    api.editAddress(values).then(res=>{
      App.showSuccess(res.msg,function(){
        wx.navigateBack();
      })
    }).catch(err=>{
      _this.setData({disabled:false})
    })
  },

  /**
   * 表单验证
   */
  validation:function(values){
    if (values.name === '') {
      this.data.error = '收件人不能为空';
      return false;
    }
    if (values.phone.length < 1) {
      this.data.error = '手机号不能为空';
      return false;
    }
    if (values.phone.length !== 11) {
      this.data.error = '手机号长度有误';
      return false;
    }
    let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!reg.test(values.phone)) {
      this.data.error = '手机号不符合要求';
      return false;
    }
    if (!this.data.region) {
      this.data.error = '省市区不能空';
      return false;
    }
    if (values.detail === '') {
      this.data.error = '详细地址不能为空';
      return false;
    }
    return true;
  },
   /**
   * 修改地区
   */
  bindRegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },

})