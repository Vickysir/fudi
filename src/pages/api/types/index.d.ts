export interface CommonInfo {
    "shopServicePhone"?: string,
    "shopId"?: number,
    "count"?: number, // 倒计时
    "liked"?: boolean,
    "uploadAvatar"?: string,
    "currentShopping"?: any
    "websitePhone"?: string,
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
export interface PersonalCenterUpdatePhonePost {
    "phone": string//"25411150915@qq.com"
    "code": string//"25411150915@qq.com"
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
export interface PersonalCenterInvitationPost {
    "invitationCode": string//"dfe0"
    "invitationList": {
        "create_Time": number//1610617576000
        "id": number//67
        "inviteesUserNickname": string//"User_6488"
        "status": number//1
    }[]
}
export interface PersonalCenterOrderListPost {
    "shopId": number,
    "status"?: number,
}
export interface PersonalCenterOrderListPostResponse {
    actualAmount: number//34.9  付款金额
    createTime: number//1615275355000
    deliveryType: number//0
    id: string//"D-A3FQC"
    paymentType: number//1
    status: number//3
    goodsList: {
        id: number// 98
        thumbnail: string//"public/c57c7179be3b415fb02d124a9f1f2ddd"
        title: string//"Bang Bang Chicken"
        userOrderDetailId: number//596410
    }[]
    shop: {
        id: number// 1
        name: string//"Edenhall"
        thumbnail: string//"public/0aff270dd06c4812b32c77b165b5ecf0"
    }[]
}
export interface PersonalCenterObtainCouponPost {
    "id"?: number//1
    "code"?: string//dkmdc23
}
export interface PersonalCenterCouponListPost {
    "shopId": number,
}
export interface PersonalCenterCouponListPostResponseArray {
    "activeDate": number//1553904000000
    "discountType": number//0
    "id": number//30
    "money": number//0.8
    "moneyLimit": number//-1
    "moneyType": number//1
    "quietDate": number//1672444800000
    "thumbnail": string//"public/852d33a1ba614a41b5efc0333b16c143"
    "title": string//"AQU20"
    "type": number//0
    "rule": {
        "goodsClassify": {
            "except": number[] //[148, 158] 
        }
    }

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
    "consignee"?: string//"this is user name",
    "phone"?: string//"13656690321",
    "sex"?: number//0,
    "latitude"?: number//234.56,
    "longitude"?: number//123.45
    "houseNumber": string//"9-905",
    "detail": string//"cork street",
    "region"?: string//"",
}

export interface AddressListPostResponseArray {
    "id": number//1,
    "shopId": number//4,
    "consignee": string//"Guan guan",
    "sex": number//1,
    "phone": string//"021494788",
    "region": string//"yaoyongqi",
    "detail": string//"Highfield Rugby Club, Model Farm Road, Glasheen, Cork, Ireland",
    "longitude": number//-8.5168845,
    "latitude": number//51.8855478,
    "zipCode": string//"",
    "houseNumber": string//"1024"
}

export interface ShopDetailResponse {
    "address": string//"Edenhall, Model Farm Rd, Cork, Ireland"
    "endTime": number// 86340000
    "endTimeFormat": string//  "23:59"
    "evaluate": {
        total: number// 485,
        evaluateList: EvaluateList[]
    }
    "id": number// 1
    "latitude": number// 51.8903393
    "longitude": number// -8.5386944
    "name": string//"Edenhall"
    "outline": string//"Restaurant & Takeaway(Delivery Min order €10 )"
    "phone": string//"+353214947888"
    "startTime": number// 0
    "startTimeFormat": string// "00:00"
    "thumbnail": string//"public/0aff270dd06c4812b32c77b165b5ecf0"
    "rate": number
}
export interface ShopGoodsListAllResponseArray {
    "secondGoodsClassify":
    {
        "activeTimeFormat": string//"00:00:00",
        "name": string// "Stir Fry",
        "quietTimeFormat": string// "00:00:00",
        "goodsList": [
            {
                "thumbnail": string//"public/b3136171c5e24941be57d3d872fc318e",
                "originalPrice": number//9.9,
                "currentPrice": number//9.9,
                "id": number//117,
                "title": string//"Sweet & Sour Chicken"
            }
        ],
        "id": number //133
    }[]
    "activeTimeFormat": string// "00:00:00",
    "name": string//"Main",
    "quietTimeFormat": string//"00:00:00",
    "id": number//131
}
export interface GoodsDetailsResponse {
    activeTime: string// "00:00:00"
    currentPrice: number // 9.9
    id: number //234
    onSale: number //1
    originalPrice: number //9.9
    quietTime: string//"00:00:00"
    richtext: string//"public/6c3a636c5a604bf79a11eda411249d98"
    thumbnail: string//"public/354e965af3db416f8c6df160af1084cf"
    timeLimit: number //0
    title: string//"Oyster Stir Fry"
    ingredientClassifyGroupList: {
        id: number //1
        name: string// "default"
        type: number //0
        ingredientClassifyList: {
            defaultSelect: number // -1
            free: number // 3
            id: number //10
            name: string// "Vegetables"
            only: number // 0
            required: number // 0
            ingredientList: {
                currentPrice: number //0.5
                id: number //7031
                name: string//"Red Onions"
                originalPrice: number // 0.5
            }[]
        }[]
    }[]
}

export interface EvaluateList {
    "complexStarLevel": number// 5
    "content": string//"Good as usual"
    "createTime": number// 1599221539000
    "id": number// 1750
    "thumbnail": string[]
    "user": {
        "head": string// "public/6b80b80a30364abbb22bd2d52a62d462",
        "nickname": string// "Mikey Ryan",
        "id": number// 5576
    },
}


export interface ShopCategoriesLevelOneResponseArray {
    "id": number// 215
    "name": string //"Gluten Free & Vegetarian"
    "promotion": number //0
    "thumbnail": string //"public/dfde891713054186a64e76ed6fa4bc59"    
}
export interface UserOrderSubmitPost {
    "remark"?: string,
    "diningType": number,
    "shopId": number,
    "reservation": BookTablePost
}
export interface BookTablePost {
    "consignee": string //收货人
    "sex": number // 性别
    "phone": string //  
    "peopleNumber": number //
    "diningTime": number // 精确到毫秒 
    "shopId": Number
}

export interface AddToCartPost {
    "quantity": number // 1,  数量
    "goodsId": number //86, 
    "remark"?: string// "hello world .", 
    "goodsIngredientList": number[] //[1141, 1144, 2132], 
    "shopId": number//1 
}

export interface UpdateToCartPost {
    "shopId": number//1 
    "quantity": number // 1,  数量
    "id": number // Shopping Cart number
}

export interface DeliveryFeePost {
    "shopId": number//1 
    "userFreightCouponId": number // user delivery fee coupon number
    "userShippingAddressId": number // Shopping Cart number
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

