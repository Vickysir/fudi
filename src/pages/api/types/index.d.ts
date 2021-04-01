export interface CommonInfo {
    "shopServicePhone"?: string,
    "shopId"?: number,
}

export interface PhoneVerificationCodePost {
    "phone": string//"+8613656690321"
}
export interface VerificationCodePostResponse {
    "token": string//"fbc9f41b02bd45e79a96264eb1371c97",
}
export interface LoginRegistPost {
    "phone": string//"12345678",
    "password": string//"hell0w0rld1",
    "againPassword": string//"hell0w0rld1",
    "code": string//"4266",
    "email": string//"2541150915@qq.com",
    "token": string//"8e660612d2064a63917c935e3c3bbc7d", 
    "invitationCode"?: string//"dsfwefweashyju"
}
export interface LoginPost {
    "password": string//"helloworld",
    "name": string//"spring"
}
export interface ThirdPartyLogin {
    "idToken": string
    "FCMToken"?: string
}
export interface LoginPostResponse {
    "token": string//"fbc9f41b02bd45e79a96264eb1371c97",
    "email": string//"460022058@qq.com"
    "nickname": string// "User_7193"
    "phone": string// "+447418310635"
}
export interface EmailVerificationCodePost {
    "email": string//"25411150915@qq.com"
}
export interface ResetPwdPost {
    "password"?: string//"hell0w0rld1",
    "code"?: string//"0732",
    "email"?: string//"648728367@qq.com",
    "token"?: string//"f4ebd009b4bf4facbcfb86ae8d6d3362"
}
export interface SendSuggestionsPost {
    "content": string
}
export interface PersonalCenterInfor {
    "head": string// "public/4b84ab80964c4cf8b15000fadaab1c94",
    "coupon": number//2,
    "bonus": number//20001,
    "nickname": string// "spring",
    "id"?: number//5,
    "order"?: number//0
}
export interface SettingPageInfoPostResponse extends PersonalCenterInfor {
    "email": string//'460022058@qq.com'
    "orderNumber": number//0
    "collection": number//0
    "phone": string//'+447418310635'
}

export interface FAQListPostResponseArray {
    "answer": string
    "question": string
}
export interface ShopServicePhoneResponse {
    "phone": string
}

export interface PersonalCenterUpdatePasswordPost {
    "oldPassword": string//"HelloWorld",
    "newPassword": string//"HelloWorld",
    "againNewPassword": string//"HelloWorld"
}
export interface PersonalCenterUpdatePasswordPost {
    "invitationCode": string//"dfe0"
    "invitationList": []
}
export interface PersonalCenterOrderListResponse {
    // TODO 换有数据的账号，对接order
}
export interface PersonalCenterObtainCouponPost {
    "id"?: number//1
    "code"?: string//dkmdc23
}
export interface Gets3UploadKeyPostResponse {
    "accessKeyId": string//"ASIA2UHYAPVRLFDWHDVT",
    "secretAccessKey": string//"JuoVS9rdrL2Xmq9toAhSpfsJzcysGqUmBznpQggP",
    "sessionToken": string//"FQoGZXIvYXdzEMj//////////wEaDKdch18OXdkYE4CehSLjAoMyO6msWGFVp32Gcer+dpmKUUZi2HwifZnokxR3oLA5ZwP7/pvQByEhWz2PkpID3BwfgCXaonHcd2Gau6+yO8Jpkv2yF/fxFlZrRuBnqn73On0LUNJ3BubqYspIeVNFOxx07WKGF5znKNiqGQ3PYNYn56IKEs0b2W27V10pgiIwkEjqW64xSbq6lGAX8zyW8o+fA06mucs7ZQe27sCvFEvd/HeL6wT2dIK6tnx3EX1nzecmEhVMUOrBT/cVRvwX400GsRvkKLTBWLz40pMJ+OTZvT2FdZRnXiCyZENjDSo5QdowVT2mJexDjyZ8rzFb26TIt9nniTbQDFzUS0Ad0XSIxqZMFxqNgoEXrDovTXFAMpEQuevrxNxnnAnTjaNM/RIggXfe243rsDZnoyQjCyiz1eEUIc+kAnFe2eXqQ5d80dRngE7iKYJTgnd1wiZ3mEfsY7u+EaidpfcpZ3NZIwYk3lcorvOM3QU=",
    "expiration": string//1537427390000,
    "objectKey": string//"public/9d5b5e63e9d74c2cabc11a79aea76ec3"
}
export interface PersonalCenterUpdateIconPost {
    "head": string//"public/6668fa286a2a4bde946389f422a98cf7"
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
        "address": string
        "phone": string
        "latitude": number
        "longitude": number
        "name": string
        "id": number
        "positionList": {
            "label": string//"A"
            "latLngList": {
                "latitude": number
                "longitude": number
            }[]
        }[]
    }[]
}

export interface ShopListPostResponseArray {
    "id": number// 1,
    "name": string// "Edenhall",
    "address": string// "Edenhall, Model Farm Rd, Cork, Ireland",
    "thumbnail": string// "public/f6499e879cc24b649dccec89a2594001",
    "longitude": number// -8.5386944,
    "latitude": number// 51.8903393,
    "self": number// 0,
    "eatIn": number// 1,
    "delivery": number// 1,
    "reservation": number// 1
}
export interface ShopDetailPostResponseArray {
    "outline": string// "Restaurant & Takeaway",
    "address": string// "Edenhall, Model Farm Rd, Cork, Ireland",
    "phone": string// "+353214947888",
    "latitude": number// 51.8903393,
    "longitude": number// -8.5386944,
    "name": string// "Edenhall",
    "startTime": number// 14400000,
    "id": number// 1,
    "endTime": number// 54000000,
    "evaluate": { //评论
        "total": number// 25,
        "evaluateList": {
            "complexStarLevel": number// 4,
            "thumbnail": string[]// [],
            "createTime": number// 1555435246000,
            "id": number// 96,
            "user": {
                "head": string// "public/6b80b80a30364abbb22bd2d52a62d462",
                "nickname": string// "Mikey Ryan",
                "id": number// 5576
            },
            "content": "V good "
        }[]
    },
}

export interface CategoriesInHomePagesPost {
    "shopId": number//1
}

export interface CategoriesInHomePagesPostResponse {

}
export interface FoodPagesPostPost {
    "shopId": number//1
}
export interface FoodPagesPostResponse {
    "whirligigList": {
        "id": number//2,
        "resource": string// "public/8223865e30b545d2a7efab03b4681796",
        "thumbnail": string// "public/68d2cc9d198145ad84a96670afa753d8"
    }[],
    "hotSaleGoodsList": {
        "thumbnail": string// "public/2d22f9f6eb924b08ada22309945ac1da",
        "sale": number//0,
        "originalPrice": number//4,
        "currentPrice": number//4,
        "id": number//54,
        "title": string// "dough balls(6)"
    }[],
    "newGoodsList": {
        "thumbnail": string// "public/d2a72fdc66ac4a7e949534d3543c9592",
        "sale": number//0,
        "originalPrice": number//0,
        "currentPrice": number//0,
        "id": number//50,
        "title": string// "margherita"
    }[],
    "user": PersonalCenterInfor
}

export interface CategoriesInFoodListPost {
    "shopId": number//1,
    "goodsClassifyId": number//102
}
export interface CategoriesInFoodListPostResponseArray {
    "name": string// "Extra",
    "goodsList": {
        "thumbnail": string// "public/d2a72fdc66ac4a7e949534d3543c9592",
        "originalPrice": number//0,
        "currentPrice": number//0,
        "id": number//50,
        "title": string// "margherita"
    }[]
}

export interface FoodDetailsPost {
    "id": number//1,
}
export interface FoodDetailsPostResponse {

}

