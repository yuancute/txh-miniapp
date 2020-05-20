/**
 * 配置全局环境变量的切换
 */
let wxappId = 1;//小程序数据库id

let env = 'dev'
let devDomain = 'http://localhost:80/tp5/public/'//开发环境
let testDomain = '' //测试环境
let serverDomain = ''//线上环境
let apiBaseUrl = ''
switch(env){
  case 'dev':
    apiBaseUrl = devDomain
    break
  case 'test':
    apiBaseUrl = testDomain
    break
  case 'ser':
    apiBaseUrl = serverDomain
    break
}

let header = {
  "Content-Type":"application/x-www-form-urlencoded",
}
//post API请求
function post(url,params,success,fail,complete){
  let token = wx.getStorageSync('token')
  //构造请求参数
  params = Object.assign({
    wxapp_id : wxappId,
    token:token
  },params)
  //发起网络请求
  wx.request({
    url:apiBaseUrl+url,
    header:header,
    method:"post",
    data:params,
    success:(res)=>{
      console.log("request-suess-data",res.data)
      //网络层、代码层错误
      if(res.statusCode === 500){
        wx.showModal({
          title: '友情提示',
          content:'服务器异常，请重试',
          showCancel:false,
        })
      }
      //登录状态失效
      if(res.data.code === -1){
        //保存当前页面
        wx.hideNavigationBarLoading();
        let pages = getCurrentPages();
        if(pages.length){
          let currentPage = pages[pages.length -1];
          "pages/login/index" != currentPage.route &&
          wx.setStorageSync('currentPage', currentPage);
        }
        //跳转授权页面
        wx.navigateTo({
          url: '/pages/login/index',
        })
      }else if(res.data.code ===0){
        wx.showModal({
          title: '友情提示',
          content:res.data.msg,
          showCancel:false,
        })
      }else{
        success && success(res.data)
      }
    },
    fail:(res)=>{
      console.log('resquest-err',res);
      wx.showModal({
        title: '友情提示',
          content:res.errMsg,
          showCancel:false,
      })
      fail && fail(res.data)
    },
    complete:(res)=>{
      wx.hideLoading();
      wx.hideNavigationBarLoading();
      complete && complete(res.data);
    }
  })
}
//get API请求
function get(url,params, success,fail,complete){
  let token = wx.getStorageSync('token')
  //构造请求参数
  params = Object.assign({
    wxapp_id : wxappId,
    token:token
  },params)
  //发起网络请求
  wx.request({
    url:apiBaseUrl+url,
    header:header,
    method:"get",
    data:params,
    success:(res)=>{
      console.log("request-suess-data",res.data)
      //网络层、代码层错误
      if(res.statusCode === 500){
        wx.showModal({
          title: '友情提示',
          content:'服务器异常，请重试',
          showCancel:false,
        })
      }
      //登录状态失效
      if(res.data.code == -1){
        //保存当前页面
        wx.hideNavigationBarLoading();
        let pages = getCurrentPages();
        if(pages.length){
          let currentPage = pages[pages.length -1];
          "pages/login/index" != currentPage.route &&
          wx.setStorageSync('currentPage', currentPage);
        }
        //跳转授权页面
        wx.navigateTo({
          url: '/pages/login/index',
        })
      }else if(res.data.code ===0){
        wx.showModal({
          title: '友情提示',
          content:res.data.msg,
          showCancel:false,
        })
      }else{
        success && success(res.data)
      }
    },
    fail:(res)=>{
      console.log('resquest-err',res);
      wx.showModal({
        title: '友情提示',
          content:res.errMsg,
          showCancel:false,
      })
      fail && fail(res.data)
    },
    complete:(res)=>{
      wx.hideLoading();
      wx.hideNavigationBarLoading();
      complete && complete(res.data);
    }
  })
}

module.exports = {
  post:post,
  get:get,
}