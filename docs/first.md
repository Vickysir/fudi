<!--
 * @Author: your name
 * @Date: 2021-04-09 09:15:13
 * @LastEditTime: 2021-04-12 10:06:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/docs/first.md
-->
### homepage 
- web端页面
    - 动态header
- 移动端页面


动态header

    - 未登录状态
    - 登录状态

1. 未登录
    - header右侧，显示一个按钮，按钮内容根据不同页面显示：
        - home页，按钮显示Login
        - 登录页面，按钮显示Home
        - 注册页面，按钮显示Login
    - homepage shop电话号码隐藏
    - Help Center 电话号码 、online chat  是否和homepage的一致


2. 已登录
    - header右侧，显示登录人头像，购物车图标，通知图标
    - homepage 电话号码隐藏（ 直到获取到 shopId  ）



### 登录

登录方式

    - 邮箱登录
    - 第三方授权登录


1. 邮箱登录
    - 用户名、密码成功，则登录进入homepage
    - 失败，错误提示

2. 第三方授权登录
    - 授权成功，调用后端接口，将idToken传给后端，自动注册
    - 检查用户 phone number 是否存在
        - 如果存在，则直接登录进入homepage
        - 如果不存在，则进入绑定手机号流程
            此处采用的注册时候绑定手机号的UI
            - 输入手机号，获取验证码（60s 重发倒计时）/user/phone/verification/code
            - 如果是授权登录过来的用户，则调用update phone number 接口，需要两个参数
                - phone
                - code
            - 如果是邮箱注册流程过来的，则调用regist接口，需要四个参数


### 注册

注册方式

    - 邮箱注册

1. 邮箱注册
    - 填写邮箱
    - 填写密码
    - 绑定手机号/auth/register/phone/verification
    - 接收手机验证码 

    调用注册接口，注册


### 个人中心

布局结构

    - leftMenu
        - 如果没有shopId,则 voucher 菜单栏不显示
    - content
        - 如果没有数据，则显示logo

1. myOrder
    - 分为两组展示
        - active
            - 无数据，为空
            - status为,1-3
        - complete
            - 无数据，为空
            - status为，4-9
            
2.  myVochers

    - 优惠券列表
        - 详情 Available
            - 点击，模态框展示优惠券详情
    - 添加优惠券

3. 邀请朋友
    - 邀请码
    - 分享
        - 点击按钮，分享至Facebook 

    - 邀请列表，数据显示
        - status = 0，则invite
        - status = 1，则complete

4. 通知中心
    - 暂缓 //TODO:三期

5. edit my info

    - nike name
        - 显示状态 
            - text
            - 右侧 小笔icon
                - 点击，进入编辑状态
        - 编辑状态 
            - input
            - 右侧 save
                - 非空验证
            - 右侧 Cancel
                - 返回显示状态
    - email
        - 同 nike name
    - phone number
        - 显示状态 
           同 nike name
        - 编辑状态 
            - phone number input  + 发送验证码 button

                - 点击button，phone number不存在
                    - 提示必填 
                - 点击button，phone number存在
                    - 发送获取验证码请求
                        - 进入60s 倒计时，button = disable 
                            - 离开倒计时页面，再返回，倒计时不受影响
                            - 页面刷新，倒计时不受影响
                        - 计时结束，button = enable
                
            - code number input
            - 右侧 save
                - phone number input 非空验证
                - code number input 非空验证
            - 右侧 Cancel
                - 返回显示状态
     - adress list 
        - 同 nike name
     - add adress //TODO:二期
        - 模态框表单，非空验证
            - detail
            - houseNumber
            - zipCode
            - 地图交互 
                - 填充input值

6. change password

    - input 校验
        - 原password，新password，confirm password 非空校验
        - 新 password 与 confirm password 一致性校验
    - 校验通过，调用更新密码接口
    

7. 发送建议
    - 确定
        - 发送请求
    - 取消
        - 清空input
    
8. 退出登录
    - 返回至homepage未登录页面
    - 清空所有localStorage


### 路由
1. auth路由
    - personalCenter
    
2. 公开路由

    - home
    - login
    - regist
    - helpCenter
    - faq
    - shop
    - goodsdetails
