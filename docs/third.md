## 目录

<br>

- [header 购物车 list](#header购物车list) ✅<br>
- [header 通知 list](#header通知list) 【暂缓】<br>
- [确认订单](#确认订单)<br> 
- [个人中心-订单](#个人中心-订单)<br> ✅
- [个人中心-通知](#个人中心-通知) 【暂缓】<br>
- [主题色](#主题色)<br>

### header 购物车 list

<br>
<div style="color:green">接口文档：</div>

    - 获取购物车 /user/cart/list/v3
    - 修改购物车，商品商量 /user/cart/update/quantity/v2
    - 删除购物车 商品 /user/cart/remove/v2

<br>

<div style="color:green">购物车交互</div>

    - 渲染购物车商品数量在header上，点击icon，显示购物车
        - 修改商品数量，减到0时，删除该商品
        - 修改商品数量时，计算出total价格显示出来
        - 点击Confirm Order 跳转到 确认订单页面
        - change to collecttion 【删掉】

<br>

### header 通知 list【 隐藏 】

<br>
<div style="color:green">接口文档：</div>

    - 获取消息内容api
    - 实时获取消息的socket

<div style="color:green">交互</div>

    - 通过socket，收到实时消息，小铃铛右上角数量+1
    - 点击小铃铛，通过api获取消息内容，展示消息内容
        - 点击see all，进入消息中心

<!-- <div style="color:red">获取消息内容的api，会返回几条消息？默认展示几条在页面？</div> -->

<br>

### 确认订单

<br>
<div style="color:green">接口文档：</div>

    - 获取购物车内容  /user/cart/list/v3 ❌ preview v4 
    - 根据 type = deliver、collect，展示右侧的相关信息 ✅
    - delivery fee  /user/order/freight_price/v3 
    - delivery 地址 是用户在homepage 输入的地址 ✅
    - 修改配送时间（当前时间往后延一个小时，必须要在营业时间范围内。不在营业范围之类，只能立刻送 ）✅
    - 修改联系人，获取联系人列表 /user/order/historical_contacts ✅
    - 优惠券列表 /user/order/coupon/list/v2 
    - 添加优惠券 /user/order/coupon/obtain/v2  ✅
    - 在线支付
        - /user/order/payment/online
        - /user/order/payment/encrypt/rsa
        - /user/order/payment/online/entity
    - 现金支付
        - /user/order/payment/offline
    - 下单 /user/order/submit/v3

<div style="color:green">交互</div>

    - 左侧订单详情 仅展示
    - 右侧信息
        - 地图查看位置 【删掉】
        - 修改时间 ✅
            - ASAP 立刻送
            - On Time ❌
        - 修改people ✅
            - for self 为自己
            - order for another person
                - 联系人列表
                - 选择联系人
        - 修改order option ✅
            - Meet in front of the door
            - Drop near the door
        - 地址，计算运费 ✅
    - 点击+ Add Voucher，添加优惠券 ✅
        - 优惠券列表 会返回 realm 字段
        - 添加优惠券
        - 选择优惠券 
        解释：在/user/order/submit/v3 请求参数新增 couponRealm字段，
            如果realm为0，则优惠券 ID为couponList.id
            如果realm为1，则优惠券 ID为couponList.couponId
        优惠券的使用规则：
        - type = 0 是for food；type = 1 是for delivery fee
        - discounttype = 0, 不包含打折的商品；= 1，全部商品
        - money: moneyType = 0，为折扣的金额；如果moneyType=1折扣的百分比，值为0-1，=0.8则表示打8折，有20%的优惠；
        - moneyType = 0,直接从价格中扣除，=1按照百分百扣除，=2全部免费
        - monyLimit = -1,没有限制；=100，则消费必须要达到100

    - Payment Method，二选一
        - 现金 （默认） ✅
            - 点击pay now ，下单，下单成功 
        - 银行卡 ✅
            - 点击pay now 下单
                - 获得订单号
                - 添加银行卡完成，comfirm,支付成功
    - 下单 
        - 下单成功，清空购物车，回到首页

<div style="color:red">Order Option 的list是什么？</div>
<br>

### 个人中心-订单

<br>

<div style="color:green">接口文档：</div>

    - 获取orderlist /user/order/list/v3
    - 获取order详情 /user/order/detail/v3
    - 实时获取消息的socket websocket/position/subscribe?userOrderId={{userOrderId}} 【先不做】
    - 添加评论接口 /user/order/evaluate/save/v2

<div style="color:green">交互</div>

    - 点击详情
        - 根据api渲染order详情
        - 地图渲染出一个location
        - 根据socket实时渲染位置信息 【先不做】
    - 点击Add a Review 状态为4的时候可评论
        - 添加评论
    - Repeat Order 【删除】

<div style="color:red">添加评论的具体交互设计？</div>
<br>

### 个人中心-通知 【隐藏】

<div style="color:green">接口文档：</div>

    - 获取通知list
    - 删除接口
    - 已读、未读update通知状态的接口

<div style="color:green">交互</div>

    - 根据api渲染通知list
    - 点击查看某条通知
        - 进入详情modal
        - 更新该消息的状态为已读
    - 点击删除，删除该消息，更新list

<br>

### 主题色


### 2021-07-11 check
- google登录成功，homepage页面header还是login的button ✅
- 添加评论成功之后，刷新一下订单页面 ✅
- homepage zipCode 不是强制的 ✅
- 商品图片不要拉伸 ✅
- 添加优惠券，优惠券显示出来，可删除
- 商品数量减为0的时候，减号 disable ✅
- 商品可选择的区域为整行 ✅
- BookTable的时间 和 确人订单中的时间 禁用处理

### 2021-07-17 check
- 在地址框格那边是可以输入地址也可以输入zip code,zipcode的输入框去掉 ✅
- 商品图片尽量全部显示 ✅
- 错误提示，字号大一些
- input 和 input里面的字再大一些
- collection time 处理  ✅