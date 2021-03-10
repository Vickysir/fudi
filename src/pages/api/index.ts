/*
 * @Author: your name
 * @Date: 2021-03-10 13:59:47
 * @LastEditTime: 2021-03-10 15:50:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/api/index.ts
 */
export const apiPath = {
    "regist": "/auth/register/v2",//regist
    "phoneVerificationCode": "/auth/register/phone/verification",//注册获取验手机证码
    "emailVerificationCode": "/user/forget/password/email/verification",// Send email forgot password
    "resetPwd": "/user/forget/password",// Reset password
    "login": "/auth/login",//login
    "saveAddress": "/user/shipping_address/save",//save address
    "addressList": "/user/shipping_address/list",//address list
    "mapRange": "/shop/range/label/list/v2",//map range
}