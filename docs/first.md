<!--
 * @Author: your name
 * @Date: 2021-04-09 09:15:13
 * @LastEditTime: 2021-04-09 10:39:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/docs/first.md
-->
### homepage 
- web端页面
    - 动态header
- 移动端页面


1. 未登录
    - header右侧，显示登录按钮
    - homepage 电话号码隐藏

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
    - 接着走第三方注册流程


### 注册
注册方式

    - 邮箱注册
    - 第三方授权注册

1. 邮箱注册
    - 填写邮箱
    - 填写密码
    - 绑定手机号
    - 接收手机验证码
    调用注册接口，注册

2. 第三方注册
    - 授权成功，调用后端接口，将idToken传给后端，自动注册
    - 检查用户 phone number 是否存在
        - 如果存在，则直接登录进入homepage
        - 如果不存在，则进入绑定手机号流程
            - 输入手机号，获取验证码（60s 重发倒计时）
            - 如果是授权登录过来的用户，则调用update phone number 接口，需要两个参数
                - phone
                - code
            - 如果是邮箱注册流程过来的，则调用regist接口，需要四个参数

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
            
2.  <div style="color:red">myVochers</div>

    - 优惠券列表
    - 添加优惠券

3. 邀请朋友
    - 邀请码
    - <div style="color:red">分享</div>
        - 点击按钮，分享
            - 至Facebook （？？？？如果是Google登录的账户，或者没有Facebook账户的人怎么办）

    - 邀请列表，数据显示
        - status = 0，则invite
        - status = 1，则complete

4. 通知中心
    - 暂缓

5. <div style="color:red">edit my info</div>
    - nike name
        - 显示状态 
            - text
            - 右侧 小笔icon
        - 编辑状态 
            - input
            - 右侧 save
                - 非空验证
    - email
        - 同 nike name
    - phone number
        - 显示状态 
            - text
            - 右侧 小笔icon
        - 编辑状态 
            - phone number input  + 发送验证码 button

                - 点击button，phone number不存在
                    - 提示必填 
                - 点击button，phone number存在
                    - 发送获取验证码请求
                    - 进入60s 倒计时，button = disable
                    - 计时结束，button = enable
                
            - code number input
            - 右侧 save
                - 非空验证

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
1. <div style="color:red">auth路由</div>
    - personalCenter
    
2. 开放路由

    - home
    - login
    - regist
    - helpCenter
    - faq
    - shop
    - goodsdetails