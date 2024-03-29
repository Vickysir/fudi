/*
 * @Author: your name
 * @Date: 2021-03-10 13:59:47
 * @LastEditTime: 2021-05-06 11:23:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/api/index.ts
 */
export const apiPath = {
  regist: "/auth/register/v2", //regist     一期✔️
  login: "/auth/login", //login     一期✔️
  registPhoneVerificationCode: "/auth/register/phone/verification", //注册获取验手机证码     一期✔️
  updatePhoneVerificationCode: "/user/phone/verification/code", //注册获取验手机证码     一期✔️
  emailVerificationCode: "/user/forget/password/email/verification", // Send email forgot password     一期✔️
  resetPwd: "/user/forget/password", // Reset password     一期✔️
  saveAddress: "/user/shipping_address/save", //save address     一期
  removeAddress: "/user/shipping_address/remove", //save address     一期
  addressList: "/user/shipping_address/list", //address list     一期
  mapRange: "/shop/range/label/list/v2", //map range
  shopList: "/shop/list/v2/collection", //shop(restaurant) list
  foodPage: "/goods/classify/list/first/v2", // discounted / hot sale / new food page
  categoriesInFoodList: "/goods/list/v2", // Food list for other categories
  foodDetail: "/goods/detail/v2", // food details

  sendSuggestions: "/user/feedback/save", // Send Suggestions     一期✔️
  personalCenterInfo: "/user/my", // Info on Setting page     一期
  gets3UploadKey: "/auth/aws/sts/s3/put", // Get keys for S3(only used when uploading user icon)     一期
  personalCenterUpdatePhone: "/user/update/phone/v2", // Update phone number     一期
  personalCenterUpdateIcon: "/user/update/head", //Update user icon     一期
  personalCenterUpdatePassword: "/user/update/password", //Update Password     一期

  // "personalCenterCouponList": "/coupon/list/v2",//Get coupon list     一期
  personalCenterCouponList: "/coupon/list/received", // 使用下单时那套接口
  personalCenterObtainCoupon: "/user/coupon/obtain/v2", // 使用下单时那套接口
  personalCenterUsableCoupon: "/user/coupon/usable", // 使用下单时那套接口
  personalCenterInvalidCoupon: "/user/coupon/invalid", // 使用下单时那套接口
  personalCenterUserCouponList: "/user/coupon/list", // 使用下单时那套接口


  personalCenterInvitation: "/user/invitation", // Return if this user's invitation status     一期
  personalCenterUpdateNickname: "/user/update/nickname", // Update user name     一期
  personalCenterOrderList: "/user/order/list/v3", // return the order list     一期
  shopServicePhone: "/shop/custom_service_phone", // Get customer service phone number     一期
  thirdPartyLogin: "/auth/login/third_party", // Third party login     一期
  FAQList: "/faq/list", // FAQ     一期✔️
  personalCenterUpdateEmail: "/user/update/email", // Update email     一期

  // 二期
  shopInRange: "/shop/in_range/v2", //判断搜索地址是否在配送范围的店铺
  shopDetail: "/shop/detail/v2", //shop(restaurant) detail
  categoriesInHomePages: "/goods/classify/list/first/v2", //商品分类：categories in home page ,只返回一级分类
  shopGoodsListAll: "/goods/list/all", //返回二级分类，及所有商品
  goodsSearch: "/goods/search", // shop 页面搜索接口
  bookTable: "/user/shop_reservation/save", //book table
  orderSubmit: "/user/order/submit/v3", //book table
  addToCart: "/user/cart/add/v3", //add to cart
  goodsDetails: "/goods/detail/v2", // goods detail

  // 三期
  //购物车list
  cartList: "/user/cart/list/v3", // 购物车
  updateCartList: "/user/cart/update/quantity/v2", // update 购物车
  removeCartList: "/user/cart/remove/v2", // remove 购物车
  //确认订单
  deliveryFee: "/user/order/freight_price/v3", // 配送费
  //个人中心-订单
  orderDetail: "/user/order/detail/v3", // order 详情
  orderEvaluateSave: "/user/order/evaluate/save/v2", // order 详情

  //确认订单
  historicalContacts: "/user/order/historical_contacts", // 联系人列表
  orderCouponList: "/user/order/coupon/list/v2", // 优惠券列表
  orderCouponObtain: "/user/order/coupon/obtain/v2", // 添加优惠券

  paymentEncryptRsa: '/user/order/payment/encrypt/rsa', //获取在线支付key 
  paymentOnlineEntity: '/user/order/payment/online/entity', //提交在线支付 
  paymentOnlineCheck: '/user/order/payment/check/', //支付状态查询
  paymentOnline: "/user/order/payment/online", // 在线支付

};
