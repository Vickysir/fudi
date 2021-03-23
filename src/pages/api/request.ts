/*
 * @Author: your name
 * @Date: 2021-03-23 12:58:41
 * @LastEditTime: 2021-03-23 13:29:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/api/request.ts
 */
import axios from 'axios';
import { apiPath } from '@/pages/api';
import { LoginPost, LoginPostResponse, LoginRegistPost, PhoneVerificationCodePost } from './types/login';

// 注册  获取手机验证码
export const APIPhoneVerificationCode = async (params: PhoneVerificationCodePost) => {
    return await axios.post(apiPath.phoneVerificationCode, params)
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
// 忘记密码  修改密码