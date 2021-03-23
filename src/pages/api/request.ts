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
import { EmailVerificationCodePost, LoginPost, LoginPostResponse, LoginRegistPost, PhoneVerificationCodePost, ResetPwdPost, VerificationCodePostResponse } from './types/login';
import { SettingPageInfoPostResponse } from './types/personalCenter';

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

// 个人中心 获取个人信息
export const APISettingPageInfo = async () => {
    return await axios.post<SettingPageInfoPostResponse>(apiPath.personalCenterInfo)
}

