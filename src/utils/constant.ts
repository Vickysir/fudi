//邀请朋友
export const INVITATEFRIENDS_INVITIED = 0
export const INVITATEFRIENDS_COMPLETE = 1
export const invitateFriendsStaus = new Map([
    [0, "invited"],
    [1, "complete"],
])

// 订单 status
export const ORDERSTATUS_RECEIVED = 1 //Received
export const ORDERSTATUS_COOKING = 2 //Cooking
export const ORDERSTATUS_DELIVERING = 3 //Delivering(show driver location)
export const ORDERSTATUS_DELIVERED = 4  //( Allow user to add review)
export const ORDERSTATUS_REVIEWED = 5  //(hide the review button )
export const ORDERSTATUS_REFUNDING = 6 // Refunding request received
// export const ORDERSTATUS_REFUNDING = 7  //Refunding request received
export const ORDERSTATUS_REFUNDED = 8   //Refunded
export const ORDERSTATUS_CANCELLED = 9  //Cancelled
export const orderStaus = new Map([
    [1, "Received"],
    [2, "Cooking"],
    [3, "Delivering"],
    [4, "Delivered"],
    [5, "Reviewed"],
    [6, "Refunding"],
    [7, "Refunding"],
    [8, "Refunded"],
    [9, "Cancelled"],
])

// deliveryType
export const DELIVERYTYPE_DELIVERY = 0 //delivery
export const DELIVERYTYPE_COLLECTION = 1 //collection
export const DELIVERYTYPE_RESERVE = 2 //reserve 预约去店里吃
export const deliveryType = new Map([
    [0, "delivery"],
    [1, "collection"],
    [2, "reservee"],
])
// paymentType
export const PAYMENTTYPE_ONLINE = 0 //online
export const PAYMENTTYPE_OFFLINE = 1 //offline
export const paymentType = new Map([
    [0, "online"],
    [1, "offline"],
])