<!--
 * @Author: your name
 * @Date: 2021-04-09 10:18:57
 * @LastEditTime: 2021-04-12 11:02:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/docs/second.md
-->
### homepage 搜索
接口文档：

    - address List
    - 餐馆list
    - shop 查询接口


dom结构

    - search select
    - type 选择
    - button

type两种类型

    - delivery  外卖
    - collect   自取

【下面1，2部分，设计稿的顺序不知道是不是有逻辑的，反正对这块交互不是很清楚】

1. delivery
    - 地图icon
        - 点击icon，进入地图模态框
            - 显示配送区域范围
                - 在配送范围
                    - apply，判断用户选择的地址在哪个区域，推荐该区的商铺
                - 不在配送范围
                    - 错误提示，选择去collect
                        - 显示所有商铺图标
                            - 选择一家商铺
                                - apply
                    - 不允许apply
            - 显示上一步input输入的位置或当前浏览器所在位置
                - 地图上显示小图标
                - input - 文字形式的地理位置描述
            - 支持为图标拖拽
            - 支持地图缩放，行政区域划分
    - select下拉菜单，[下拉菜单需要根据不同情况的用户显示](https://github.com/Vickysir/fudi/issues/12)
    - Previous Addresses 【这个是纯显示的文字，还是有交互，点击弹出模态框？这个地方的交互和 selec 下拉菜单好像冲突，不太明白】
        - 点击
            - 模态框展示以前的adress
                


2. collect
    - 地图icon
        - 点击icon，进入地图模态框
            - 地图上显示，餐馆列表里面的餐馆
            - 选中，自动填充位置信息
            - continue button，模态框关闭，回到 搜索select
        - 自动填充刚才的选择，点击搜索
        - 跳转至shop页面
    - select下拉菜单
        - 餐馆列表
        - 选择，自动填充餐馆列表的选择，点击搜索
        - 跳转至shop页面
        


### shop

接口文档：

    - shop 详情：/shop/detail/v2
    - 商品分类：/goods/classify/list/first/v2 【返回的数据结构没有文档？是包含该分类下的商品list？还是只返回分类，那请求相关分类下的商品list是哪个接口？这个'/goods/list/v2'？】
    - 搜索下拉列表接口，搜索查询接口：/goods/search
    - book table 接口 【没找着这个接口】

dom 结构

    - banner
    - shop details
        - book table  ，点击预定   
            - 表单模态框
                - for who
                    - 下拉列表 【 什么列表，对应什么接口】
                - number of people  几个人 【min，max是多少？】
                - time 精确到时刻
            - 确定
                - 非空验证
                    - 预定成功模态框
                - message 提示必填信息
            - 取消
                - 清空表单
                - 关闭book table 模态框
    - 分类枚举
        - 点击分类，自动定位到下面的分类商品的锚点处
    - 搜索
        -【搜索内容是什么，对应哪个接口？搜索下拉菜单列表是有接口的吗？对应是什么？】
        -【搜索替换的是下面分类商品结果？还是跳转到goodsDetails商品详情页面？】
    - 分类商品list

### goodsDetails

接口文档：

    - goodsDetails：/goods/detail/v2  【接口字段需要解释一下】
    - 添加购物车接口：/user/cart/add/v3 【接口字段remark哪里填的？goodsIngredientList结构？】


dom结构:

    - goods image
    - goods details
    - Size
        - 规格大小对应不同的价格
    - Toppings
        - 不同配料对应不同的价格
    - Total = 商品价格 X 数量
        - 商品基础价格
        - size价格 X 数量
        - Toppings价格 X 数量

    - add to order
        - 校验用户登录状态
            - 未登录
                - 跳转至login
                - 登录成功，自动加入购物车
            - 已登录
                - 加入购物车
    