// pages/cart/checkout.js
let App = getApp();
let api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav_select: false, // 快捷导航
    options: {}, // 当前页面参数

    address: null, // 默认收货地址
    exist_address: false, // 是否存在收货地址
    goods: {}, // 商品信息

    disabled: false,

    hasError: false,
    error: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 当前页面参数
    this.data.options = options;
    console.log(options);
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
    this.getOrderData();
  },
  /**
   * 获取当前订单信息
   */
  getOrderData: function () {
    let _this = this;
    let options = _this.data.options;

    //获取订单信息回调方法
    let callback = function (res) {
      if (res.code !== 1) {
        App.showError(res.msg);
      }
      //显示错误信息
      if (res.data.has_error) {
        _this.data.hasError = true;
        _this.data.error = res.data.error_msg;
        App.showError(_this.data.error);
      } else {
        _this.data.hasError = false;
        _this.data.error = '';
      };
      _this.setData(res.data);
    };
    if (options.order_type === 'buyNow') {
      api.buyNow({
        goods_id: options.goods_id,
        goods_num: options.goods_num,
        goods_sku_id: options.goods_sku_id,
      }, 'get').then(res => {
        callback(res);
      })
    } else if (options.order_type === 'cart') {
      api.cartOrder({},'get').then(res => {
        callback(res);
      })
    };

  },

  /**
   * 选择收货地址
   */
  selectAddress: function () {
    wx.navigateTo({
      url: '../address/' + (this.data.exist_address ? 'index?from=cart' : 'create'),
    })
  },

  /**
   * 订单提交
   */
  submitOrder: function () {
    let _this = this;
    let options = _this.data.options;
    if (_this.data.disabled) {
      return false;
    }
    if (_this.data.hasError) {
      App.showError(_this.error);
    }
    /**
     * 订单创建成功后回调--微信支付
     */
    let callback = function (res) {
      if (res.code === -20) {
        App.showError(res.msg, function () {
          wx.redirectTo({
            url: '../order/index?type=payment',
          });
        });
        return false;
      }
      //发起微信支付
      wx.requestPayment({
        timeStamp: res.data.payment.timeStamp,
        nonceStr: res.data.payment.nonceStr,
        package: 'prepay_id=' + res.data.payment.prepay_id,
        signType: 'MD5',
        paySign: res.data.payment.paySign,
        success: function (result) {
          //跳转到订单详情
          wx.redirectTo({
            url: '../order/detail?order_id=' + result.data.order_id,
          });
        },
        fail: function () {
          App.showError('订单未支付', function () {
            wx.redirectTo({
              url: '../order/index?type=payment',
            });
          });
        },
      });
    };
    //按钮禁用，防止二次提交
    _this.data.disabled = true;

    //显示loading
    wx.showLoading({
      title: '正在处理',
    });
    //创建订单立即购买
    if(options.order_type ==='buyNow'){
      api.buyNow({
        goods_id: options.goods_id,
        goods_num: options.goods_num,
        goods_sku_id: options.goods_sku_id,
      },'post').then(res=>{
        //callback(res);
        App.showSuccess('订单创建成功',function(){
          wx.redirectTo({
            url: '../order/index?type=payment',
          });
        })
        _this.data.disabled = false;
      })
    }else if(options.order_type === 'cart'){//创建订单-购物车结算
      api.cartOrder({},'post').then(res=>{
        //callback(res);
        App.showSuccess('订单创建成功',function(){
          wx.redirectTo({
            url: '../order/index?type=payment',
          });
        })
        _this.data.disabled = false;
      });
    }

  },
})