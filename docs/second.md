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

    - 用户自己保存的address List ：/user/shipping_address/list   渲染 detail字段
    - map配送范围接口 ：/shop/range/label/list/v2 （暂时用不上）
    - 餐馆list ：shop/list/v2/collection  渲染 address 字段
    - shop 查询接口
    - shop(restaurant) detail


dom结构

    - search select
    - type 选择
    - button

type两种类型

    - delivery  外卖
    - collect   自取


1. delivery
    <!-- - 地图icon
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
            - 支持地图缩放，行政区域划分 -->
    - select下拉菜单，map autocompete 
         - 通过自己的配送地址，判断属于哪个shop？选择后进入shop页面 ✅
         - 接口   对接 ✅
    <!-- [下拉菜单需要根据不同情况的用户显示](https://github.com/Vickysir/fudi/issues/12) --> 
    - Previous Addresses 
        - 点击
            - 模态框展示以前的adress ✅
            - continue
                - 跳转至 shop/id 页面 ✅
               
                


2. collect
    <!-- - 地图icon
        - 点击icon，进入地图模态框
            - 地图上显示，餐馆列表里面的餐馆
            - 选中，自动填充位置信息
            - continue button，模态框关闭，回到 搜索select
        - 自动填充刚才的选择，点击搜索
        - 跳转至shop页面 -->
    - select下拉菜单，餐馆list自动补全  ✅
        -点击 
            - 餐馆列表 
            - 选择，自动填充餐馆列表的选择，点击搜索 ✅
            <!-- - continue
                - 跳转至shop页面  -->
        


### shop {"shopId":1,"goodsClassifyId":131}数据最全

接口文档：

    - shop 详情：/shop/detail/v2 评分要自己计算一下
    - 商品分类：/goods/classify/list/first/v2  只返回一级分类
    - 二级分类：good/list/v2 返回二级分类和二级分类下面的所有产品【 这个接口最好能拆分一下】
    - 搜索下拉列表接口，搜索查询接口：/goods/search 进入商品详情
    - book table 接口  /user/order/submit/v3

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
        - 直接进入商品详情
    - 分类商品list

### goodsDetails {"id": 234}数据最全

接口文档：

    - goodsDetails：/goods/detail/v2  【接口字段需要解释一下】
    - 添加购物车接口：/user/cart/add/v3 【接口字段remark哪里填的？goodsIngredientList结构？】


dom结构:

    - goods image
    - goods details
    - ingredientClassifyList - 
        - Size
            - 规格大小对应不同的价格
        - Toppings
            - 不同配料对应不同的价格
        - Total = 商品价格 X 数量
            - 商品基础价格
            - size价格 
            - Toppings价格 X 数量

    - add to order
        - 校验用户登录状态
            - 未登录
                - 跳转至login
                - 登录成功，自动加入购物车
                - 【如果用户不登录，选购的商品信息如何】
            - 已登录
                - 加入购物车
    