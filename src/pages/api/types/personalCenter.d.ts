/*
 * @Author: your name
 * @Date: 2021-03-22 09:33:48
 * @LastEditTime: 2021-03-24 10:13:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/api/types/personalCenter.ts
 */
export interface PersonalCenterInfor {
    "head": string// "public/4b84ab80964c4cf8b15000fadaab1c94",
    "coupon": number//2,
    "bonus": number//20001,
    "nickname": string// "spring",
    "id"?: number//5,
    "order"?: number//0
}


export interface SendSuggestionsPost {
    "content": "helloworld"
}
export interface SendSuggestionsPostResponse {
    "content": "helloworld"
}


export interface SettingPageInfoPostResponse extends PersonalCenterInfor {
    email: string//'460022058@qq.com'
    orderNumber: number//0
    collection: number//0
    phone: string//'+447418310635'
}
