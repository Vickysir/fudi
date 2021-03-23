/*
 * @Author: your name
 * @Date: 2021-03-10 13:59:47
 * @LastEditTime: 2021-03-23 17:01:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/api/index.ts
 */
export const apiPath = {
    "regist": "/auth/register/v2",//regist
    "login": "/auth/login",//login
    "phoneVerificationCode": "/auth/register/phone/verification",//注册获取验手机证码
    "emailVerificationCode": "/user/forget/password/email/verification",// Send email forgot password
    "resetPwd": "/user/forget/password",// Reset password


    "saveAddress": "/user/shipping_address/save",//save address
    "addressList": "/user/shipping_address/list",//address list
    "mapRange": "/shop/range/label/list/v2",//map range
    "shopList": "/shop/list/v2/collection",//shop(restaurant) list
    "shopDetail": "/shop/detail/v2",//shop(restaurant) detail
    "categoriesInHomePages": "/goods/classify/list/first/v2",//categories in home page
    "foodPage": "/goods/classify/list/first/v2",// discounted / hot sale / new food page
    "categoriesInFoodList": "/goods/list/v2",// Food list for other categories
    "foodDetail": "/goods/detail/v2",// food details

    "sendAdvice": "/user/feedback/save",// Send Suggestions
    "personalCenterInfo": "/user/my",// Info on Setting page

    "gets3UploadKey": "/auth/aws/sts/s3/put",// Get keys for S3(only used when uploading user icon)
    "personalCenterUpdatePhone": "/user/update/phone/v2",// Update phone number
    "personalCenterUpdateIcon": "/user/update/head",//Update user icon
    "personalCenterUpdatePassword": "/user/update/password",//Update Password
    "personalCenterUpdateCouponList": "/coupon/list/v2",//Get coupon list
    "personalCenterObtainCoupon": "/user/coupon/obtain/v2",//Obtain the coupon code from the text field
    "personalCenterUsableCoupon": "/user/coupon/usable",// return the useable coupon 
    "personalCenterInvalidCoupon": "/user/coupon/invalid",// Return the expired coupon
    "personalCenterInvitation": "/user/invitation",// Return if this user's invitation status
    "personalCenterUpdateNickname": "/user/update/nickname",// Update user name
    "personalCenterOrderList": "/user/order/list/v2",// return the order list
    "shopServicePhone": "/shop/custom_service_phone",// Get customer service phone number
}