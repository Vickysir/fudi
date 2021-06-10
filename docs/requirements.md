字体？
支持第三方授权登录？

默认进入的页面 homepage

移动端：ipad 一个下载 app 的页面

web 端：
Homepage，搜索，进入分店，选择餐食，add to order 的时候校验是否登录，如果登录可以下单，如果没登录跳转到登录页面

change 取餐地址点击之后流程

add google 日历

house number 必填
收货时间：必须是未来的，具体表现形式

支付方式选择银行卡 =》点击 继续 =》绑定银行卡

### 搜索下拉列表

如果 用户保存过地址
addresslist
googlemaplist

### 修改手机号码，需要获取验证码 UI

### 去掉 edit my adress 改成 show adress list

### 优惠劵列表，如果没有 shopid，隐藏

### receive 状态明确

### shop 页面，在一个接口中返回分类和产品

### 开发者账号，申请的 Facebook，google，map key

### 通知中心的接口



### 一期问题

- 移动端 menu 隐藏 ✅

- 手机框 和 图片 一起的截图  ✅

- 移动端加个下载 ✅

- 邮箱修改的时候有问题  ✅

- edit 手机号码，understand ✅, 手机input长度太短 ✅

- 删除地址， delete success 提示语， ✅

- 删除地址，增加删除确认模态框 ✅

- 注册的时候，增加 nike name 和 invite code ✅

- online chart, homepage、help center 上的电话换成 +353858275002 ✅


### 2021-05-06 二期优化

- previous address 字号放大一点  ✅
    place input address 
- 结果搜索不到时，提示 The address is out of our delivery range. Please input again.  ✅
- collect时候，左边input换成select ，默认值为第一个餐馆 ✅
- 地图搜索预测更偏向，限制范围 Ireland， 去掉地图  ✅
- shop 搜索交互，用户点击搜索后，产品分类信息改为搜索结果
- shop 添加一个二级分类
- book table 接口 ✅
- goods detail 接口  ✅
- 添加购物车接口


### 2021-06-10 二期调整
- goods页面，标题一行，价格一行
- good 的价格计算保证准确
- shop 页面商品排列可能太挤
- shop 页面search有问题 【bug】
- banner 图片 重复问题
- header 用户icon
- 第三方登录，在用户未绑定手机号时，中断操作后，发现已经登录【bug】
- 第三方授权登录，set手机号的时候，understand
- 购物车 Change to Collection 去掉


### 2021-06-13 讨论主题
- 下单规则
- 优惠券规则
- 接口核对
- 订单允许评论