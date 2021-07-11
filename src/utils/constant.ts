export const websitePhone = "353858275002";
//邀请朋友
export const INVITATEFRIENDS_INVITIED = 0;
export const INVITATEFRIENDS_COMPLETE = 1;
export const invitateFriendsStaus = new Map([
  [0, "invited"],
  [1, "complete"],
]);

// 订单 status
export const ORDERSTATUS_RECEIVED = 1; //Received
export const ORDERSTATUS_COOKING = 2; //Cooking
export const ORDERSTATUS_DELIVERING = 3; //Delivering(show driver location)
export const ORDERSTATUS_DELIVERED = 4; //( Allow user to add review)
export const ORDERSTATUS_REVIEWED = 5; //(hide the review button )
export const ORDERSTATUS_REFUNDING = 6; // Refunding request received
// export const ORDERSTATUS_REFUNDING = 7  //Refunding request received
export const ORDERSTATUS_REFUNDED = 8; //Refunded
export const ORDERSTATUS_CANCELLED = 9; //Cancelled
export const OrderStatus = new Map([
  [1, "Received"],
  [2, "Cooking"],
  [3, "Delivering"],
  [4, "Delivered"],
  [5, "Reviewed"],
  [6, "Refunding"],
  [7, "Refunding"],
  [8, "Refunded"],
  [9, "Cancelled"],
]);

// deliveryType
export const DELIVERYTYPE_DELIVERY = 0; //delivery
export const DELIVERYTYPE_COLLECTION = 1; //collection
export const DELIVERYTYPE_RESERVE = 2; //reserve 预约去店里吃
export const DeliveryType = new Map([
  [0, "Delivery"],
  [1, "Collection"],
  [2, "Reservee"],
]);
// paymentType
export const PAYMENTTYPE_ONLINE = 0; //online
export const PAYMENTTYPE_OFFLINE = 1; //offline
export const paymentType = new Map([
  [0, "card"],
  [1, "cash"],
]);

// 优惠券相关
// 优惠券类型 （for food、for delivery fee）
export const couponType = new Map([
  [0, "food"],
  [1, "delivery fee"],
]);
export const COUPONTYPE_FOOD = 0;
export const COUPONTYPE_DELIVERYFEE = 1;

// 优惠券使用范围 （折扣商品、all）
export const coupon_discountType = new Map([
  [0, "the discounted food is not included in this coupon"], //折扣食品不包含在此券中
  [1, "all food are included in this coupon"], //所有食品都包含在此券中
]);
export const COUPON_DISCOUNTTYPE_DISCOUNTED_EXCEPT = 0;
export const COUPON_DISCOUNTTYPE_ALL = 1;

export const discountRateConversion = (money: number) => {
  // money = 0.8  => 即20%的优惠
  const discount = Math.round((1 - money) * 100);
  return discount + "%";
};
export const moneyType = new Map([
  [0, "directly deduct from the price"], //直接从价格中扣除
  [1, "deduct as the percentage"], //按百分比扣除
  [2, "all free"], //全部免费
]);
export const MONEYTYPE_DEDUCT = 0;
export const MONEYTYPE_PERCENTAGE = 1;
export const MONEYTYPE_FREE = 2;


export const moneyLimit = new Map([
  [-1, "there is no limit"], //则没有限价
]);

export const ORDERTIME_ASAP = 1;
export const ORDERTIME_ONTIME = 2;
export const orderTimeType = new Map([
  [1, "ASAP"],
  [2, "On Time"],
]);

export const DELIVERYOPTION_FRONT = 1;
export const DELIVERYOPTION_NEAR = 2;
export const deliveryOption = new Map([
  [1, "Meet in front of the door"],
  [2, "Drop near the door"],
]);
