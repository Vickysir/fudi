/*
 * @Author: your name
 * @Date: 2021-03-23 12:58:41
 * @LastEditTime: 2021-05-06 19:22:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/api/request.ts
 */
import axios from 'axios';
import { apiPath } from '@/pages/api';
import {
    EmailVerificationCodePost, LoginPost, LoginPostResponse,
    LoginRegistPost, PhoneVerificationCodePost, ResetPwdPost,
    ThirdPartyLogin, VerificationCodePostResponse, SendSuggestionsPost,
    SettingPageInfoPostResponse,
    FAQListPostResponseArray,
    PersonalCenterUpdatePasswordPost,
    PersonalCenterObtainCouponPost,
    Gets3UploadKeyPostResponse,
    PersonalCenterUpdateIconPost,
    SaveAddressPost,
    ShopServicePhoneResponse,
    PersonalCenterOrderListPost,
    PersonalCenterInvitationPost,
    PersonalCenterUpdatePhonePost,
    PersonalCenterCouponListPost,
    PersonalCenterCouponListPostResponseArray,
    AddressListPostResponseArray,
    ShopDetailResponse,
    ShopCategoriesLevelOneResponseArray,
    BookTablePost,
    UserOrderSubmitPost,
    AddToCartPost,
    UpdateToCartPost,
    DeliveryFeePost,
    ShopGoodsListAllResponseArray,
    GoodsDetailsResponse,
} from './types';
import { String } from 'aws-sdk/clients/cloudhsm';


// 注册  获取手机验证码
export const APIRegistPhoneVerificationCode = async (params: PhoneVerificationCodePost) => {
    return await axios.post<VerificationCodePostResponse>(apiPath.registPhoneVerificationCode, params)
}
// 更新手机号  获取手机验证码
export const APIUpdatePhoneVerificationCode = async (params: PhoneVerificationCodePost) => {
    return await axios.post<VerificationCodePostResponse>(apiPath.updatePhoneVerificationCode, params)
}
// 注册
export const APIRegist = async (params: LoginRegistPost) => {
    return await axios.post<LoginPostResponse>(apiPath.regist, params)
}
// 登录
export const APILogin = async (params: LoginPost) => {
    return await axios.post<LoginPostResponse>(apiPath.login, params)
}
// 忘记密码  获取邮箱code
export const APIEmailVerificationCode = async (params: EmailVerificationCodePost) => {
    return await axios.post<VerificationCodePostResponse>(apiPath.emailVerificationCode, params)
}
// 忘记密码  修改密码
export const APIResetPwd = async (params: ResetPwdPost) => {
    return await axios.post(apiPath.resetPwd, params)
}
// 第三方登录
export const APIThirdPartyLogin = async (params: ThirdPartyLogin) => {
    return await axios.post<LoginPostResponse>(apiPath.thirdPartyLogin, params)
}


// FAQList
export const APIFAQList = async () => {
    return await axios.get<FAQListPostResponseArray[]>(apiPath.FAQList)
}
// shopServicePhone
export const APIShopServicePhone = async (shopId: number) => {
    return await axios.post<ShopServicePhoneResponse>(apiPath.shopServicePhone, { shopId })
}


// 个人中心 获取个人信息
export const APISettingPageInfo = async () => {
    return await axios.post<SettingPageInfoPostResponse>(apiPath.personalCenterInfo)
}
// 个人中心 send 建议
export const APISendSuggestions = async (params: SendSuggestionsPost) => {
    return await axios.post(apiPath.sendSuggestions, params)
}
// 个人中心 修改密码
export const APIPersonalCenterUpdatePassword = async (params: PersonalCenterUpdatePasswordPost) => {
    return await axios.post(apiPath.personalCenterUpdatePassword, params)
}


// 个人中心 邀请朋友
export const APIPersonalCenterInvitation = async () => {
    return await axios.post<PersonalCenterInvitationPost>(apiPath.personalCenterInvitation)
}
// 个人中心 my order
export const APIPersonalCenterOrderList = async (params: PersonalCenterOrderListPost) => {
    return await axios.post(apiPath.personalCenterOrderList, params)
}


// 个人中心 my Vouchers 
export const APIPersonalCenterCouponList = async (params: PersonalCenterCouponListPost) => {
    return await axios.post<PersonalCenterCouponListPostResponseArray[]>(apiPath.personalCenterCouponList, params)
}
// 个人中心 有效的 Vouchers
export const APIPersonalCenterUsableCoupon = async () => {
    return await axios.post(apiPath.personalCenterUsableCoupon)
}
// 个人中心 无效的 Vouchers
export const APIPersonalCenterInvalidCoupon = async () => {
    return await axios.post(apiPath.personalCenterInvalidCoupon)
}
// 个人中心 添加优惠券
export const APIPersonalCenterObtainCoupon = async (params: PersonalCenterObtainCouponPost) => {
    return await axios.post(apiPath.personalCenterObtainCoupon, params)
}


// aws 获取 key
export const APIGets3UploadKey = async () => {
    return await axios.post<Gets3UploadKeyPostResponse>(apiPath.gets3UploadKey)
}
// 个人中心 上传头像
export const APIPersonalCenterUpdateIcon = async (params: PersonalCenterUpdateIconPost) => {
    return await axios.post(apiPath.personalCenterUpdateIcon, params)
}



// 个人中心 修改信息  Nickname
export const APIPersonalCenterUpdateNickname = async (param: { nickname: string }) => {
    return await axios.post(apiPath.personalCenterUpdateNickname, param)
}
// 个人中心 修改信息  Email
export const APIPersonalCenterUpdateEmail = async (params: EmailVerificationCodePost) => {
    return await axios.post(apiPath.personalCenterUpdateEmail, params)
}
// 个人中心 修改信息  Phone
export const APIPersonalCenterUpdatePhone = async (params: PersonalCenterUpdatePhonePost) => {
    return await axios.post(apiPath.personalCenterUpdatePhone, params)
}
// 个人中心 获取 adress list
export const APIUserAddressList = async () => {
    return await axios.post<AddressListPostResponseArray[]>(apiPath.addressList)
}
// 个人中心 保存 adress 
export const APISaveAddress = async (params: SaveAddressPost) => {
    return await axios.post(apiPath.saveAddress, params)
}

// 个人中心 remove adress 
export const APIRemoveAddress = async (params: { id: number }) => {
    return await axios.post(apiPath.removeAddress, params)
}





// 首页搜索
export const APIShopInRange = async (params: { latitude: number, longitude: number }) => {
    return await axios.post(apiPath.shopInRange, params)
}
export const APICollectShopList = async () => {
    return await axios.post(apiPath.shopList)
}
// 根据 placeId 获取经纬度
export const APITranslatePlaceIdToLocation = async (place_id: string) => {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?place_id=${place_id}&key=AIzaSyDU8SBtzx84CB2gf2kfZhC_Y9BRP6U7znw`)
}
// 商铺shop详情
export const APIShopDetail = async (params: { id: number }) => {
    return await axios.post<ShopDetailResponse>(apiPath.shopDetail, params)
}
//返回 shop 一级商品分类  （暂时不用）
export const APIShopCategoriesLevelOne = async (params: { shopId: number }) => {
    return await axios.post<ShopCategoriesLevelOneResponseArray[]>(apiPath.categoriesInHomePages, params)
}
// 获取shop所有分类及商品
export const APIShopGoodsListAll = async (params: { shopId: number }) => {
    return await axios.post<ShopGoodsListAllResponseArray[]>(apiPath.shopGoodsListAll, params)
}
// shop页面 搜索
export const APIGoodsSearch = async (params: { shopId: number, title: string, goodsClassifyId?: number, }) => {
    return await axios.post(apiPath.goodsSearch, params)
}
// bookTable
export const APIBookTable = async (params: BookTablePost) => {
    return await axios.post(apiPath.bookTable, params)
}
//add to cart
export const APIAddToCart = async (params: AddToCartPost) => {
    return await axios.post(apiPath.addToCart, params)
}
// 商品详情
export const APIGoodsDetails = async (params: { id: number }) => {
    return await axios.post<GoodsDetailsResponse>(apiPath.goodsDetails, params)
}
//通用接口
export const APIGetCommon = async (url: string) => {
    return fetch(url)
}



//获取购物车
export const APIGetCartList = async (params: { shopId: number }) => {
    return await axios.post(apiPath.cartList, params)
}
//更新购物车
export const APIUpdateCartList = async (params: UpdateToCartPost) => {
    return await axios.post(apiPath.updateCartList, params)
}
//remove 购物车
export const APIRemoveCartList = async (params: { shopId: number, id: number }) => {
    return await axios.post(apiPath.removeCartList, params)
}


//获取配送费
export const APIDeliveryFee = async (params: DeliveryFeePost) => {
    return await axios.post(apiPath.deliveryFee, params)
}
//在线支付
export const APIPaymentOnline = async (params: { userOrderId: number }) => {
    return await axios.post(apiPath.paymentOnline, params)
}


//获得订单详情
export const APIOrderDetail = async (params: { id: number }) => {
    return await axios.post(apiPath.orderDetail, params)
}
//获取联系人列表
export const APIHistoricalContacts = async (params: { limit: number }) => {
  return await axios.post(apiPath.historicalContacts, params);
};