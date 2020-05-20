var request = require('/request.js')

function login(data){
  return new Promise((resolve,reject)=>{
    request.post('api/user/login',data,resolve,reject)
  })
}
function getUserInfo(data){
  return new Promise((resolve,reject)=>{
    request.get('api/user/detail',data,resolve,reject)
  })
}
function getCategoryList(data){
  return new Promise((resolve,reject)=>{
    request.get('api/category/lists',data,resolve,reject)
  })
}
function getGoodsList(data){
  return new Promise((resolve,reject)=>{
    request.get('api/goods/lists',data,resolve,reject)
  })
}
function getGoodsDetail(data){
  return new Promise((resolve,reject)=>{
    request.get('api/goods/detail',data,resolve,reject)
  })
}
function addCart(data){
  return new Promise((resolve,reject)=>{
    request.post('api/cart/add',data,resolve,reject)
  })
}
function subCart(data){
  return new Promise((resolve,reject)=>{
    request.post('api/cart/sub',data,resolve,reject)
  })
}
function deleteCart(data){
  return new Promise((resolve,reject)=>{
    request.post('api/cart/delete',data,resolve,reject)
  })
}
function getCartList(data){
  return new Promise((resolve,reject)=>{
    request.post('api/cart/lists',data,resolve,reject)
  })
}
function cartOrder(data,type){
  if(type === 'get'){
    return new Promise((resolve,reject)=>{
      request.get('api/order/cart',data,resolve,reject)
    })
  }else if(type==='post'){
    return new Promise((resolve,reject)=>{
      request.post('api/order/cart',data,resolve,reject)
    })
  }
  
}
function buyNow(data,type){
  if(type === 'get'){
    return new Promise((resolve,reject)=>{
      request.get('api/order/buyNow',data,resolve,reject)
    })
  }else if(type==='post'){
    return new Promise((resolve,reject)=>{
      request.post('api/order/buyNow',data,resolve,reject)
    })
  }
}
function getAddressList(data){
  return new Promise((resolve,reject)=>{
    request.get('api/address/lists',data,resolve,reject)
  })
}
function getAddressDetail(data){
  return new Promise((resolve,reject)=>{
    request.post('api/address/detail',data,resolve,reject)
  })
}
function addAddress(data){
  return new Promise((resolve,reject)=>{
    request.post('api/address/add',data,resolve,reject)
  })
}
function editAddress(data){
  return new Promise((resolve,reject)=>{
    request.post('api/address/edit',data,resolve,reject)
  })
}

function deleteAddress(data){
  return new Promise((resolve,reject)=>{
    request.post('api/address/delete',data,resolve,reject)
  })
}
function setDefaultAddress(data){
  return new Promise((resolve,reject)=>{
    request.post('api/address/setDefault',data,resolve,reject)
  })
}
function getOrderList(data){
  return new Promise((resolve,reject)=>{
    request.get('api/user.order/lists',data,resolve,reject)
  })
}
function getOrderDetail(data){
  return new Promise((resolve,reject)=>{
    request.get('api/user.order/detail',data,resolve,reject)
  })
}
function cancelOrder(data){
  return new Promise((resolve,reject)=>{
    request.get('api/user.order/cancel',data,resolve,reject)
  })
}
function receipt(data){
  return new Promise((resolve,reject)=>{
    request.post('api/user.order/receipt',data,resolve,reject)
  })
}
function payOrder(data){
  return new Promise((resolve,reject)=>{
    request.post('api/user.order/pay',data,resolve,reject)
  })
}
function getWxappHelp(data){
  return new Promise((resolve,reject)=>{
    request.get('api/wxapp/help',data,resolve,reject)
  })
}
function getWxappBase(data){
  return new Promise((resolve,reject)=>{
    request.get('api/wxapp/base',data,resolve,reject)
  })
}function getIndexPage(data){
  return new Promise((resolve,reject)=>{
    request.get('api/index/page',data,resolve,reject)
  })
}

module.exports = {
  login:login,
  getUserInfo:getUserInfo,
  getCategoryList:getCategoryList,
  getGoodsList:getGoodsList,
  getGoodsDetail:getGoodsDetail,
  addCart:addCart,
  subCart:subCart,
  deleteCart:deleteCart,
  getCartList:getCartList,
  cartOrder:cartOrder,
  buyNow:buyNow,
  getAddressList:getAddressList,
  getAddressDetail:getAddressDetail,
  addAddress:addAddress,
  editAddress:editAddress,
  deleteAddress:deleteAddress,
  setDefaultAddress:setDefaultAddress,
  getOrderList:getOrderList,
  getOrderDetail:getOrderDetail,
  cancelOrder:cancelOrder,
  receipt:receipt,
  payOrder:payOrder,
  getWxappHelp:getWxappHelp,
  getWxappBase:getWxappBase,
  getIndexPage:getIndexPage
}