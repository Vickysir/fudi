/*
 * @Author: your name
 * @Date: 2021-03-10 14:45:49
 * @LastEditTime: 2021-03-10 15:48:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/api/types/login.d.ts
 */
export interface LoginRegistPost {
    "phone": string//"12345678",
    "password": string//"hell0w0rld1",
    "againPassword": string//"hell0w0rld1",
    "code": string//"4266",
    "email": string//"2541150915@qq.com",
    "token": string//"8e660612d2064a63917c935e3c3bbc7d", 
    "invitationCode": string//"dsfwefweashyju"
}
export interface PhoneVerificationCodePost {
    "phone": string//"+8613656690321"
}
export interface EmailVerificationCodePost {
    "email": string//"25411150915@qq.com"
}

export interface ResetPwdPost {
    "password": string//"hell0w0rld1",
    "code": string//"0732",
    "email": string//"648728367@qq.com",
    "token": string//"f4ebd009b4bf4facbcfb86ae8d6d3362"
}
export interface LoginPost {
    "password": string//"helloworld",
    "name": string//"spring"
}
export interface SaveAddressPost {
    "zipCode": string//"310000",
    "consignee": string//"this is user name",
    "phone": string//"13656690321",
    "sex": number//0,
    "latitude": number//234.56,
    "longitude": number//123.45
    "houseNumber": string//"9-905",
    "detail": string//"cork street",
    "region": string//"",
}

export interface AddressListPostResponse {
    "event": "SUCCESS",
    "data": [{
        "id": 1,
        "shopId": 4,
        "consignee": "Guan guan",
        "sex": 1,
        "phone": "021494788",
        "region": "yaoyongqi",
        "detail": "Highfield Rugby Club, Model Farm Road, Glasheen, Cork, Ireland",
        "longitude": -8.5168845,
        "latitude": 51.8855478,
        "zipCode": "",
        "houseNumber": "1024"
    }, {
        "id": 31,
        "shopId": 2,
        "consignee": "Guan",
        "sex": 0,
        "phone": "+35321494788",
        "region": "B",
        "detail": "Centre Park Rd, Ballintemple, Cork, Ireland",
        "longitude": -8.448020199999974,
        "latitude": 51.898053,
        "zipCode": "",
        "houseNumber": "1024"
    }],
    "describe": ""
}
export interface MapRangePostResponse {
    "event": "SUCCESS",
    "describe": ""
    "data": {
        address: string
        phone: string
        latitude: number
        longitude: number
        name: string
        id: number
        positionList: {
            label: string//"A"
            latLngList: {
                latitude: number
                longitude: number
            }[]
        }[]
    }[]
}