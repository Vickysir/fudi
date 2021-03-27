/*
 * @Author: your name
 * @Date: 2021-03-23 12:58:41
 * @LastEditTime: 2021-03-23 14:03:39
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
    PersonalCenterObtainCouponPost
} from './types';

// 注册  获取手机验证码
export const APIPhoneVerificationCode = async (params: PhoneVerificationCodePost) => {
    return await axios.post<VerificationCodePostResponse>(apiPath.phoneVerificationCode, params)
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
export const APIShopServicePhone = async () => {
    return await axios.get(apiPath.shopServicePhone)
}


// 个人中心 获取个人信息
export const APISettingPageInfo = async () => {
    return await axios.post<SettingPageInfoPostResponse>(apiPath.personalCenterInfo)
}
// 个人中心 获取 adress list
export const APIUserAddressList = async () => {
    return await axios.post(apiPath.addressList)
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
    return await axios.post<PersonalCenterUpdatePasswordPost>(apiPath.personalCenterInvitation)
}
// 个人中心 my order
export const APIPersonalCenterOrderList = async () => {
    return await axios.post(apiPath.personalCenterOrderList)
}
// 个人中心 my Vouchers
export const APIPersonalCenterCouponList = async () => {
    return await axios.post(apiPath.personalCenterCouponList)
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