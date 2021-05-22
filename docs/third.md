## 目录

<br>

- [购物车list](#购物车list)<br>
- [通知list](#通知list)<br>
- [确认订单](#确认订单)<br>
- [个人中心-订单](#个人中心-订单)<br>
- [个人中心-通知](#个人中心-通知)<br>
- [主题色](#主题色)<br>

### 购物车list
<br>
<div style="color:green">接口文档：</div>


    - 获取购物车 /user/cart/list/v3
    - 修改购物车，商品商量 /user/cart/update/quantity/v2 
    - 删除购物车 商品 /user/cart/remove/v2 

 <div style="color:red">第二个接口，参数有shopid，购物车number是什么？怎么知道是修改哪个商品的数量？</div>
<div style="color:red">第三个接口， 这个接口好像是清空购物车？</div>
<br>

<div style="color:green">购物车交互</div>

    - 渲染购物车商品数量在header上，点击icon，显示购物车
        - 修改商品数量，减到0时，删除该商品
        - 修改商品数量时，计算出total价格显示出来
        - 点击Confirm Order 跳转到 确认订单页面
        - change to collecttion


<div style="color:red">点击change to collecttion，接下来交互是什么？</div>
<br>

### 通知list
<br>
<div style="color:green">接口文档：</div>

    - 获取消息内容api
    - 实时获取消息的socket


<div style="color:green">交互</div>

    - 通过socket，收到实时消息，小铃铛右上角数量+1
    - 点击小铃铛，通过api获取消息内容，展示消息内容
        - 点击see all，进入消息中心

<div style="color:red">获取消息内容的api，会返回几条消息？默认展示几条在页面？</div>

<br>

### 确认订单
<br>
<div style="color:green">接口文档：</div>

    - 获取购物车内容  /user/cart/list/v3
    - 根据 type = deliver、collect，获取右侧配送的信息
    - delivery fee  /user/order/freight_price/v3
    - 修改联系人，获取联系人列表
    - 优惠券列表 /user/order/coupon/list/v2
    - 添加优惠券 /user/order/coupon/obtain/v2
    - 在线支付 /user/order/payment/online
    - 下单 /user/order/submit/v3




<div style="color:green">交互</div>

    - 左侧订单详情，可支持增删商品数量，并计算好总价显示
    - 右侧信息
        - 地图查看位置
        - 修改时间
        - 修改people
        - 修改order option
    - 点击+ Add Voucher，添加优惠券
    - Payment Method，二选一
        - 现金
            - 点击pay now ，下单，下单成功
        - 银行卡
            - 点击pay now 下单 
                - 获得订单号
                - 添加银行卡完成，comfirm,支付成功
    
    
    - 下单
        - 下单成功，清空购物车，回到首页

<div style="color:red">Order Option 的list是什么？</div>
<div style="color:red">Payment Method默认值是？</div>
<div style="color:red">添加 payment 信息是否需要调api保存下来？</div>
<div style="color:red">Add Voucher，添加优惠券，此处的交互设计稿上没有</div>
<br>

### 个人中心-订单
<br>

<div style="color:green">接口文档：</div>

    - 获取order详情 /user/order/detail/v3
    - 实时获取消息的socket websocket/position/subscribe?userOrderId={{userOrderId}}
    - 添加评论接口


<div style="color:green">交互</div>

    - 点击详情
        - 根据api渲染order详情
        - 根据socket实时渲染位置信息
    - 点击Add a Review
        - 添加评论
    - Repeat Order

<div style="color:red">Repeat Order怎么做？</div>
<br>

### 个人中心-通知

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


### 主题色