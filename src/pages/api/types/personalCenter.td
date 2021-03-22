/*
 * @Author: your name
 * @Date: 2021-03-22 09:33:48
 * @LastEditTime: 2021-03-22 10:31:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/api/types/personalCenter.ts
 */
export interface infoOnSettingsPagePostResponse {
    "event": "SUCCESS",
    "data": {
        "head": string //"public/6668fa286a2a4bde946389f422a98cf7",
        "coupon": number //0,
        "bonus": number //0,
        "nickname": string//"spring .",
        "collection": number //0
    },
    "describe": ""
}

export interface SendSuggestionsPost {
    "content": string//"helloworld"
}