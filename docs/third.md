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
- 添加优惠券，优惠券显示出来，可删除 ✅
- 商品数量减为0的时候，减号 disable ✅
- 商品可选择的区域为整行 ✅
- BookTable的时间 和 确人订单中的时间 禁用处理 ✅

### 2021-07-17 check
- 在地址框格那边是可以输入地址也可以输入zip code,zipcode的输入框去掉 ✅
- 商品图片尽量全部显示 ✅
- 错误提示，字号大一些  ✅
- input 和 input里面的字再大一些 ✅
- collection time 处理  ✅
- 确认订单，省略的地方都有hover的tootip提示 ✅


### 2021-07-30 测试用例

[测出的问题详情](https://github.com/Vickysir/fudi/issues/42) 

- 选择商品
    - 商品规格 ✅
    - 商品options ✅
    - 商品单价 ✅
    - 商品数量 ✅
    - 商品总价格 ✅
- 下单
    - 未使用优惠券
        - 商品单价，总价是否正确，且与购物车当时商品价格一致 ✅
        - 增删商品，总价格是否计算正确 ✅
        - 运费对总价格的影响
            - delivery
                - 有运费（不知道有运费的地址范围是哪些，暂无法测试） ❌
                - 无运费 ✅
            - coloction ✅
                无 ✅
        - 时间
            - delivery
                - ASAP ✅
                - 选择指定的时间,[规则参考](https://github.com/Vickysir/fudi/issues/41) ✅
                   
            - coloction
                - 时间选择上与delivery一致 ✅

        - 联系人电话
            - delivery
                - 修改联系人 [解决方案](https://github.com/Vickysir/fudi/issues/42#issuecomment-890335890) ✅
            - coloction
                - 修改联系人 ✅
        - 支付
            - delivery
                - 无法下单（暂无法测试） ❌
            - coloction
                - cash
                    - 下单是否成功 ✅
                    - 成功之后正确提示与跳转  ✅
                    - 订单详情内容是否与下单时一致  ✅
                - card
                    - 下单是否成功，是否进入支付页面  ✅
                    - 输入银行卡号之后确认，是否正确提示、跳转 ✅
                    - 订单详情内容是否与下单时一致  ✅
                    - 本页面页面刷新
                        - check 订单状态，已支付，则进入homepage ✅
                    - 后退按钮
                        - check 订单状态 
                            - 已支付，则进入homepage页面，提示用户has been placed ✅
                            - 未支付，返回orderComfirm页面  ✅

    - 使用优惠券
        - 优惠券列表可使用优惠券 ✅
        - 优惠券的id获取是否正确 ✅
            - 当realm=0时，取值自上述四个接口返回的"couponList.id"；✅
            - 当realm=1时，取值自上述四个接口返回的"couponList.couponId"  ✅
        - 优惠券的优惠方式
            [规则参考](https://github.com/Vickysir/fudi/issues/38)
            - moneyLimit
                - moneyLimit =  -1 不限制订单金额 ✅
                - moneyLimit = 100 金额必须达到100
            - discountType
                - discountType = 1，全部商品 ✅
                - discountType = 0，不包含打折商品 
            - moneyType
                - moneyType = 0，从金额中直接减10元 ✅
                - moneyType = 1，按照百分比优惠 
                - moneyType = 2，按照百分比优惠 
           
        - 是否在优惠券列表可添加新的优惠券  ✅
            - 新增 ✅
            - 新增为过期的优惠券 (交互待改进) [解决方案](https://github.com/Vickysir/fudi/issues/42#issue-957208662) ✅
        - 是否可取消使用优惠券，并且商品价格在取消优惠券后恢复原价 ✅
            - 商品优惠券
                - 在选择使用优惠券后，商品总价格是否按照优惠券正确优惠 ✅
                - 在选择使用优惠券后，增删商品，商品总价是否正确优惠 ✅
            - 运费优惠券
                - 在选择使用优惠券后，运费是否正确减免，并且不会影响总价格计算 ✅
                

### 2021-08-14 测试问题
    - 下单时，只选择了小时，就点了ok
        - 选择晚上9点，默认显示五点多的情况，未复现
        - ASAP 不显示时间 
    - 购物车，应该是买完单之后，再次hover的时候订单列表还在 
        - 未复现
    - 点击所有的区域都可以进产品界面，不只是order button， order 改成detail ✅
    - 个人中心，左右容器需要间隔 ✅
        - 需要优化适配分辨率（1440*900） 
    - 个人中心，订单列表，点击整个tab都可以进到订单详细界面 而不是要点击右上角的那个信息图标 ✅
    - 个人中心，优惠券列表，我已经领了五个优惠券了 这边没显示  
        - 这边的优惠券列表是拉的这个接口 /coupon/list/received ，使用订单处获取优惠券列表
    - 下单添加优惠券时，领了三个优惠券了 但是再往上加优惠券的话 列表就不改变了 还是那几张 但其实优惠券已经被领取了
        - 检查一下添加的优惠券是否在优惠券列表，并提示 The coupon (coupon name) can not be applied on this order.
    - 设置手机号点击没反应 (注册时)
        - 手机号邮箱进行注册是成功的，是第三方注册的时候有问题？
        - 修复了，在存入手机号时，将 +353 这个 + 前缀存入的问题  ✅
    - 在使用满减 和 打九折的优惠券时，饮料跟snack 这两种不应该打折的
        - 无法区分，暂时不做
    - Order for me/others 联系人姓名跟电话没有传上去 
        - 可能是deliver 传的参数问题
            - userShippingAddress: {
                id: commonInfo?.deliveryAddressId,
                consignee: params?.contactName,
                phone: params?.contactNumber,
            }
        - 联系人列表里一直是 Sam 和 Jonh  ✅
    - 点击网络付款下单的时候，没有锁屏 ✅
    - 首页，download our app 显示不全 ✅
        - 需要优化适配分辨率（1440*900） 
    - 希望输入postcode 能显示相关地址  ✅
    - 超时登出，总退回至 我的博客




 测试用例
        - 当前时间 12：12

        - 营业时间：16:00，结束时间 20:59  测试远远超出start时间 ✅ 提示告知营业时间，默认显示starttime   
        - 营业时间：14:00，结束时间 20:59  测试超出start1小时外  ✅ 提示告知营业时间，默认显示starttime  
        - 营业时间：07:00，结束时间 09:59  测试远远超出end时间 ✅ 提示告知营业时间，默认显示endtime
        - 营业时间：07:00，结束时间 10:59  测试超出end时间1小时外 ✅ 提示告知营业时间，默认显示endtime
        - 营业时间：10:00，结束时间 20:59  测试正常营业时间段内 ✅ 可选择时间
        - 营业时间：00:00，结束时间 23:59  测试正常营业时间段内 ✅ 可选择时间
        - 营业时间：13:00，结束时间 20:59  测试临近营业开始1小时内  ✅ 可选择时间，默认显示配送时间
        - 营业时间：07:00，结束时间 12:59  测试临近营业结束1小时内 ✅ 提示告知营业时间
        - 刚好等于营业开始时间
        - 刚好等于营业结束时间

         测试用例
        - 当前时间 13:05

        - 营业时间：16:00，结束时间 20:59  测试远远超出start时间 ✅ 提示告知营业时间，默认显示配送时间
        - 营业时间：15:00，结束时间 20:59  测试超出start1小时外  ✅ 提示告知营业时间，默认显示配送时间
        - 营业时间：07:00，结束时间 10:59  测试远远超出end时间 ✅ 提示告知营业时间，默认显示endtime
        - 营业时间：07:00，结束时间 11:59  测试超出end时间1小时外 ✅ 提示告知营业时间，默认显示endtime
        - 营业时间：10:00，结束时间 20:59  测试正常营业时间段内 ✅ 可选择时间
        - 营业时间：00:00，结束时间 23:59  测试正常营业时间段内 ✅ 可选择时间
        - 营业时间：14:00，结束时间 20:59  测试临近营业开始1小时内  ✅ 可选择时间，默认显示配送的时间
        - 营业时间：07:00，结束时间 13:59  测试临近营业结束1小时内 ✅ 提示告知营业时间,默认显示配送的时间

        - 刚好等于营业开始时间 ✅ 可选择时间，默认显示配送的时间
        - 刚好等于营业结束时间 ✅ 可选择时间，默认显示配送的时间

       【 统一修改为，默认显示配送时间 】 

         测试用例
        - 当前时间 14:05

        - 营业时间：17:00，结束时间 20:59  测试远远超出start时间 ✅ 提示告知营业时间，默认显示配送时间
        - 营业时间：16:00，结束时间 20:59  测试超出start1小时外  ✅ 提示告知营业时间，默认显示配送时间
        - 营业时间：07:00，结束时间 10:59  测试远远超出end时间 ✅ 提示告知营业时间，默认显示配送时间
        - 营业时间：07:00，结束时间 12:59  测试超出end时间1小时外 ✅ 提示告知营业时间，默认显示配送时间
        - 营业时间：10:00，结束时间 20:59  测试正常营业时间段内 ✅ 可选择时间，默认显示配送时间
        - 营业时间：00:00，结束时间 23:59  测试正常营业时间段内 ✅ 可选择时间，默认显示配送时间
        - 营业时间：15:00，结束时间 20:59  测试临近营业开始1小时内  ✅ 可选择时间，默认显示配送的时间
        - 营业时间：07:00，结束时间 14:59  测试临近营业结束1小时内 ✅ 提示告知营业时间,默认显示配送的时间

        - 刚好等于营业开始时间 ✅ 可选择时间，默认显示配送的时间
        - 刚好等于营业结束时间 ✅ 可选择时间，默认显示配送的时间

