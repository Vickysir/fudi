import React, { useEffect, useState } from 'react'
import WebFooter from '@/pages/components/header/webFooter'
import WebHeader from '@/pages/components/header/webHeader'
import { ArrowLeftOutlined, PlusOutlined, MinusOutlined, PlusCircleOutlined, MinusCircleOutlined, CheckOutlined } from '@ant-design/icons';
import SeasameSeeds from '@/assets/images/common/imgs/goodsDetails1-SeasameSeeds.svg'
import Soybeans from '@/assets/images/common/imgs/goodsDetails2-Soybeans.svg'
import Molluscs from '@/assets/images/common/imgs/goodsDetails3-Molluscs.svg'
import Crustaceans from '@/assets/images/common/imgs/goodsDetails4-Crustaceans.svg'
import goodsDetailsBanner from '@/assets/images/fudi/goodsDetails-banner.png';
import { defaultStorage } from '@/utils/uploadUseS3';
import _ from 'lodash'

import { Button, Divider, message, Spin, Switch, Tooltip } from 'antd';
import { withRouter } from 'react-router';
import { useAppStore } from '@/__internal';
import { isLogin } from '@/utils';
import { APIAddToCart, APIGetCommon, APIGoodsDetails } from '@/pages/api/request';
import style from '@/styles/theme/icon.less'
import './index.less'
import { GoodsDetailsResponse } from '@/pages/api/types';
import { create, all } from 'mathjs'



const config = {
    number: 'BigNumber',
    precision: 20
}
const math = create(all, config)
const GoodsDetails = (props) => {
    const { history, match: { params: { id, shopId } } } = props;
    const [loading, setLoading] = useState(true);
    const [noOnly, setNoOnly] = useState(false);
    const [useOptionList, setUseOptionList] = useState({ "ingredientList": [] });
    const [richText, setRichText] = useState('')
    const [dataSource, setDataSource] = useState<GoodsDetailsResponse>();
    const [count, setCount] = useState(1)
    const authInfo = useAppStore("authInfo");
    const commonInfo = useAppStore("commonInfo");
    const [totalPrice, setTotalPrice] = useState("0")
    const [basicPrice, setBasicPrice] = useState(0)
    const [refreshHeaderCart, setRefreshHeaderCart] = useState(0);

    const dealUseOptionListToBackend = (useOptionList) => {
        const goodsIngredientList = [];
        Object.keys(useOptionList).map((item) => {
            useOptionList[item].map((el) => {
                goodsIngredientList.push(Number(el.id));
            })
        })
        return goodsIngredientList
    }
    const handleChangeGoodsCount = (action) => {
        let goodCount;
        if (action === "plus") {
            goodCount = count + 1;
        } else if (action === "minus") {
            if (count === 1) {
                message.error("The quantity is require")
                return
            }
            goodCount = count - 1;
        }
        setCount(goodCount);
    }
    const handleClickAddToOrder = async () => {
        const goodsIngredientList = dealUseOptionListToBackend(useOptionList);


        const currentShopping = {
            basicPrice,
            count,
            totalPrice,
            goodsIngredientList
        }
        console.log("买的啥", currentShopping)

        APP_STORE.commonInfo = {
            ...APP_STORE.commonInfo,
            currentShopping
        };
        if (isLogin(authInfo)) {
            message.success("Successful");
            //添加至购物车
            await APIAddToCart({ "quantity": count, "goodsId": Number(id), "remark": "", "goodsIngredientList": goodsIngredientList, "shopId": Number(shopId) })
            setRefreshHeaderCart(new Date().getTime());
        } else {
            message.error("You are not logged in, you will be redirected to log in after 3s");
            setTimeout(() => {
                history.push("/login")
            }, 3000)
        }
    }
    // TODO 待写测试用例
    const calculatTotal = () => {
        // 裸价
        let total = String(basicPrice);
        Object.keys(useOptionList).map((item) => {
            if (!useOptionList[item]) return;

            useOptionList[item]?.map((el) => {
                // 商品单价 = 裸价 + 附加的option 价格
                total = math.format(math.chain(math.bignumber(total)).add(math.bignumber(el.price)).done());

            })

        })
        // 总价 = 商品单价 * 商品数量
        const price = math.format(math.chain(math.bignumber(total)).multiply(math.bignumber(count)).done());
        setTotalPrice(price)
    }
    useEffect(() => {
        async function ftetchApi() {
            try {
                // const { data } = await APIGoodsDetails({ "id": Number(234) })
                const { data } = await APIGoodsDetails({ "id": Number(id) })
                setDataSource(data);
                setBasicPrice(data.currentPrice);
                setLoading(false);
                // 设置默认值
                let _useOptionList = { "ingredientList": [] };
                data?.ingredientClassifyGroupList[0].ingredientClassifyList.map((item) => {
                    _useOptionList = Object.assign(_useOptionList, { [item.name]: [] })
                    if (item.defaultSelect === -1) return
                    _useOptionList[item.name].push({
                        id: item.defaultSelect,
                        price: item.ingredientList.filter((el) => el.id === item.defaultSelect)[0].currentPrice
                    })
                })
                console.log(`_useOptionList`, _useOptionList);

                setUseOptionList(_useOptionList);

                APIGetCommon(`${defaultStorage.S3header}${data.richtext}`)
                    .then(function (response) {
                        return response.text()
                    })
                    .then(function (myJson) {
                        setRichText(`${myJson}`);
                    });
            } catch (err) {
                console.log(`err`, err)
            }
        }
        ftetchApi();

    }, [])
    useEffect(() => {
        calculatTotal();
    }, [basicPrice, useOptionList, count])

    //判断必填
    const chooseAtLeast = (item: {
        name: string,
        free: number,
        required: number,
        only: number,
        defaultSelect: number
    }, arr: any[]) => {
        // 是否必选
        if (item.required) {
            const res = arr.length; // 用户选择的list
            if (res === 0) {
                message.error("Place choose at least one option")
                return true
            } else {
                return false
            }
        }
    }
    return (
        <>
            <WebHeader refreshCart={refreshHeaderCart} />
            <Spin spinning={loading} size="large" tip="Loading...">
                <div className="goodsDetails-wrap">
                    <div className="goodsDetails-wrap-banner">
                        <div>
                            <Button
                                // className="shop-wrap-banner-button"
                                type="primary"
                                shape="round"
                                onClick={() => { history.go(-1) }}
                            >
                                <ArrowLeftOutlined />Back to All Dishes
                        </Button>
                        </div>
                        <div className="goodsDetails-wrap-banner-bg" style={{ background: dataSource?.thumbnail ? `url(${defaultStorage.S3header}${dataSource.thumbnail}) center center no-repeat` : `url(${goodsDetailsBanner}) center center no-repeat` }}></div>
                    </div>
                    <div className="goodsDetails-wrap-product">
                        <div className="goodsDetails-wrap-product-title">
                            <h3>
                                <span>{dataSource?.title}</span>
                            </h3>
                            <div>
                                <span>
                                    <span className="originalPrice">€ {dataSource?.originalPrice}</span>
                                    € {dataSource?.currentPrice} / portion
                                </span>
                            </div>
                            {/* 一排 小 icon */}
                            {/* <div>
                                <img style={{ marginRight: "1rem" }} src={SeasameSeeds} alt="" />
                                <img style={{ marginRight: "1rem" }} src={Soybeans} alt="" />
                                <img style={{ marginRight: "1rem" }} src={Molluscs} alt="" />
                                <img style={{ marginRight: "1rem" }} src={Crustaceans} alt="" />
                            </div> */}
                            <div dangerouslySetInnerHTML={{ __html: `${richText}` }} ></div>
                        </div>
                        <Divider />
                        {
                            dataSource?.ingredientClassifyGroupList[0]?.ingredientClassifyList?.map((item, index) => {
                                if (item.only === 1) { // 单选
                                    return (
                                        <>
                                            <div className="goodsDetails-wrap-product-size" key={item.id}>
                                                <Tooltip title={item.required === 1 ? "Required" : ""}>
                                                    <h3>{item.name}</h3>
                                                </Tooltip>
                                                <div>
                                                    {
                                                        item.ingredientList.map((el, index) => {
                                                            return (
                                                                <Button
                                                                    key={el.id}
                                                                    className="goodsDetails-wrap-product-size-style"
                                                                    type={useOptionList[item.name] && _.findIndex(useOptionList[item.name], ['id', el.id]) !== -1 ? "primary" : null}
                                                                    onClick={() => {
                                                                        let arr = useOptionList[item.name];
                                                                        const index = _.findIndex(arr, ['id', el.id]);
                                                                        if (index == -1) {
                                                                            arr = [];
                                                                            arr.push({
                                                                                id: el.id,
                                                                                price: el.currentPrice
                                                                            })
                                                                        } else {
                                                                            arr.splice(index, 1);
                                                                        }
                                                                        if (chooseAtLeast(item, arr)) return;
                                                                        setUseOptionList(
                                                                            {
                                                                                ...useOptionList,
                                                                                [item.name]: arr
                                                                            }
                                                                        )
                                                                    }}
                                                                >
                                                                    {el.currentPrice === 0 ? `${el.name}` : `${el.currentPrice}” - ${el.name}`}
                                                                </Button>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            <Divider />
                                        </>
                                    )
                                } else { // 多选
                                    return (
                                        <>
                                            <div className="goodsDetails-wrap-product-toppings">
                                                <Tooltip title={item.free > 0 ? `The first any ${item.free} options are free` : ""}>
                                                    <h3>
                                                        {item.name}
                                                        <span className=""> {item.free > 0 ? `( The first any ${item.free} options are free )` : ""}</span>
                                                    </h3>
                                                </Tooltip>
                                                <ul>
                                                    {
                                                        item.ingredientList.map((el, index) => {
                                                            return (
                                                                <li key={el.id}>
                                                                    <div className={`toppings-title`}><h5>{el.name}</h5><span>{el.currentPrice === 0 ? "" : `+ € ${el.currentPrice} `}</span></div>
                                                                    <div>
                                                                        <CheckOutlined
                                                                            className={useOptionList[item.name] && useOptionList[item.name].length > 0 && _.findIndex(useOptionList[item.name], ['id', el.id]) !== -1 ? style.themeColor : ""}
                                                                            onClick={() => {

                                                                                let arr = useOptionList[item.name];
                                                                                const index = _.findIndex(arr, ['id', el.id]);
                                                                                if (index == -1) {
                                                                                    arr.push({
                                                                                        id: el.id,
                                                                                        price: arr.length < item.free ? 0 : el.currentPrice,
                                                                                    })
                                                                                } else {
                                                                                    arr.splice(index, 1);
                                                                                }
                                                                                if (chooseAtLeast(item, arr)) return;
                                                                                // message.success(_.findIndex(useOptionList[item.name], ['id', el.id]) == -1 ? `- ${item.name}:${el.name}, total: € ${totalPrice - (arr.length <= item.free ? 0 : el.currentPrice)}` : `+ ${item.name}:${el.name}, total: € ${totalPrice + (arr.length <= item.free ? 0 : el.currentPrice)}`)

                                                                                setUseOptionList(
                                                                                    {
                                                                                        ...useOptionList,
                                                                                        [item.name]: arr
                                                                                    }
                                                                                )
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                            <Divider />
                                        </>
                                    )
                                }
                            })
                        }
                        {
                            dataSource?.ingredientClassifyGroupList[1] &&
                            <>
                                <div className="goodsDetails-wrap-product-noOnly">
                                    <Tooltip title={""}>
                                        <h3>Ingredient <Switch checkedChildren="only" unCheckedChildren="no" defaultChecked
                                            onChange={(value) => {
                                                setUseOptionList({ ...useOptionList, "ingredientList": [] })
                                                setNoOnly(value)
                                            }} /></h3>
                                    </Tooltip>
                                    <ul>
                                        {
                                            dataSource?.ingredientClassifyGroupList[1]?.ingredientClassifyList[noOnly ? 0 : 1].ingredientList?.map((item, index) => {
                                                return (
                                                    <li key={item.id}>
                                                        <div className="toppings-title"><h5>{item.name}</h5><span>{item.currentPrice === 0 ? "" : `+ € ${item.currentPrice} `}</span></div>
                                                        <div>
                                                            <CheckOutlined
                                                                className={_.findIndex(useOptionList?.ingredientList, ['id', item.id]) !== -1 ? style.themeColor : ""}
                                                                onClick={() => {
                                                                    let arr = useOptionList.ingredientList;
                                                                    const index = _.findIndex(arr, ['id', item.id]);
                                                                    if (index == -1) {
                                                                        arr.push({
                                                                            id: item.id,
                                                                            price: arr.length < dataSource?.ingredientClassifyGroupList[1]?.ingredientClassifyList[noOnly ? 0 : 1].free ? 0 : item.currentPrice,
                                                                        })
                                                                    } else {
                                                                        arr.splice(index, 1);
                                                                    }
                                                                    setUseOptionList(
                                                                        {
                                                                            ...useOptionList,
                                                                            "ingredientList": arr
                                                                        }
                                                                    )
                                                                }}
                                                            />
                                                        </div>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                                <Divider />
                            </>
                        }
                        <div className="goodsDetails-wrap-product-total">
                            <div>
                                <h3>Total <span>€ {totalPrice}</span></h3>
                            </div>
                            <div>
                                <PlusCircleOutlined onClick={() => handleChangeGoodsCount("plus")} />
                                <span>{count}</span>
                                <MinusCircleOutlined onClick={() => handleChangeGoodsCount("minus")} />
                            </div>
                        </div>
                        <Button type="primary" shape="round" block size="large" onClick={handleClickAddToOrder}>Add to Order</Button>
                    </div>
                </div>
            </Spin>
            <WebFooter />
        </>
    )
}

export default withRouter(GoodsDetails)
