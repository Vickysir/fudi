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

import { Button, Divider, message, Spin, Switch, Tooltip } from 'antd';
import { withRouter } from 'react-router';
import { useAppStore } from '@/__internal';
import { isLogin } from '@/utils';
import { APIAddToCart, APIGetCommon, APIGoodsDetails } from '@/pages/api/request';
import style from '@/styles/theme/icon.less'
import './index.less'
import { GoodsDetailsResponse } from '@/pages/api/types';



const GoodsDetails = (props) => {
    const { history, match: { params: { id } } } = props;
    const [loading, setLoading] = useState(true);
    const [noOnly, setNoOnly] = useState(false);
    const [useOptionList, setUseOptionList] = useState({ "ingredientList": {} });
    const [richText, setRichText] = useState('')
    const [dataSource, setDataSource] = useState<GoodsDetailsResponse>({
        title: "Margherita",
        currentPrice: 5,
        richtext: "",
        ingredientClassifyGroupList: [
            {
                id: 1,
                name: "default",
                type: 0,
                ingredientClassifyList: [ // defaultOptionsList
                    {
                        defaultSelect: 2328,
                        free: 0,
                        id: 8,
                        ingredientList: [{ originalPrice: 0, name: "Tofu", currentPrice: 0, id: 2328 }],
                        name: "Main",
                        only: 1,
                        required: 1
                    }
                ]
            },
            {
                id: 1,
                name: "No & Only",
                type: 1,
                ingredientClassifyGroupList: [
                    {
                        defaultSelect: -1,
                        free: 0,
                        id: 6,
                        ingredientList: [],
                        name: "No",
                        only: 0,
                        required: 0
                    }, {

                    }
                ]
            },
        ]
    });
    const [count, setCount] = useState(1)

    const { title, currentPrice, originalPrice, ingredientClassifyGroupList: options } = dataSource;
    const [defaultOptions, noOnlyOptions] = options;
    const { ingredientClassifyList: defaultOptionsList } = defaultOptions;
    const { ingredientClassifyList: noOnlyOptionsList } = noOnlyOptions;
    const authInfo = useAppStore("authInfo");
    const commonInfo = useAppStore("commonInfo");
    const [totalPrice, setTotalPrice] = useState(0)
    const [basicPrice, setBasicPrice] = useState(currentPrice)
    const [refreshHeaderCart, setRefreshHeaderCart] = useState(0);

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
        const currentShopping = {
            basicPrice,
            count,
            totalPrice,
        }
        APP_STORE.commonInfo = {
            ...APP_STORE.commonInfo,
            currentShopping
        };
        if (isLogin(authInfo)) {
            message.success("Successful");
            //添加至购物车
            await APIAddToCart({ "quantity": 1, "goodsId": 86, "remark": "hello world .", "goodsIngredientList": [1141, 1144, 2132], "shopId": 1 })
            setRefreshHeaderCart(new Date().getTime());
        } else {
            message.warning("您还未登录，3s后为您跳转登录");
            setTimeout(() => {
                history.push("/login")
            }, 3000)
        }
    }
    const calculatTotal = () => {
        let total = basicPrice;
        Object.keys(useOptionList).map((item) => {
            console.log(`useOptionList`, useOptionList)
            console.log(`item`, item)
            if (!useOptionList[item]) return;
            for (let i in useOptionList[item]) {
                if (useOptionList[item][i].option) {
                    total = total + useOptionList[item][i].price
                }
            }
        })
        setTotalPrice(total * count)
    }
    useEffect(() => {
        async function ftetchApi() {
            try {
                const { data } = await APIGoodsDetails({ "id": Number(234) })
                setDataSource(data);
                setBasicPrice(data.currentPrice);
                setLoading(false);
                // 设置默认值
                let _useOptionList = { "ingredientList": {} };
                data?.ingredientClassifyGroupList[0].ingredientClassifyList.map((item) => {
                    if (item.defaultSelect === -1) return
                    _useOptionList[item.name] = {
                        [item.defaultSelect]: {
                            option: true,
                            price: item.ingredientList.filter((el) => el.id === item.defaultSelect)[0].currentPrice
                        }
                    }
                })
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
    }, el: {
        currentPrice: number
        id: number
        name: string
        originalPrice: number
    }) => {
        // 是否必选
        if (useOptionList[item.name] && useOptionList[item.name][el.id] && item.required) {
            const res = Object.keys(useOptionList[item.name][el.id]).filter((i) => i.option)
            if (res.length === 0) return message.error("Place choose at least one option")
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
                        <div style={{ background: dataSource?.thumbnail ? `url(${defaultStorage.S3header}${dataSource.thumbnail})` : `url(${goodsDetailsBanner})`, backgroundSize: "cover" }}></div>
                    </div>
                    <div className="goodsDetails-wrap-product">
                        <div className="goodsDetails-wrap-product-title">
                            <h3>
                                <span>{title}</span>
                                <span>
                                    <span className="originalPrice">€ {originalPrice}</span>
                                    € {currentPrice} / portion
                                    </span>
                            </h3>
                            <div>
                                <img style={{ marginRight: "1rem" }} src={SeasameSeeds} alt="" />
                                <img style={{ marginRight: "1rem" }} src={Soybeans} alt="" />
                                <img style={{ marginRight: "1rem" }} src={Molluscs} alt="" />
                                <img style={{ marginRight: "1rem" }} src={Crustaceans} alt="" />
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: `${richText}` }} ></div>
                        </div>
                        <Divider />
                        {
                            defaultOptionsList?.map((item, index) => {
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
                                                                    type={useOptionList[item.name] && useOptionList[item.name][el.id]?.option ? "primary" : null}
                                                                    onClick={() => {
                                                                        chooseAtLeast(item, el);
                                                                        setUseOptionList(
                                                                            {
                                                                                ...useOptionList,
                                                                                [item.name]: {
                                                                                    [el.id]: {
                                                                                        option: useOptionList[item.name] && useOptionList[item.name][el.id]?.option ? false : true,
                                                                                        price: el.currentPrice
                                                                                    }
                                                                                }
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
                                                <Tooltip title={item.free > 0 ? `The first ${item.free} options are free` : ""}>
                                                    <h3>
                                                        {item.name}
                                                        <span className=""> {item.free > 0 ? `( The first ${item.free} options are free )` : ""}</span>
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
                                                                            className={useOptionList[item.name] && useOptionList[item.name][el.id]?.option ? style.themeColor : ""}
                                                                            onClick={() => {
                                                                                chooseAtLeast(item, el)
                                                                                message.success(useOptionList[item.name] && useOptionList[item.name][el.id]?.option ? `- ${item.name}, total: € ${totalPrice - (index < item.free ? 0 : el.currentPrice)}` : `+ ${item.name}, total: € ${totalPrice + (index < item.free ? 0 : el.currentPrice)}`)
                                                                                setUseOptionList(
                                                                                    {
                                                                                        ...useOptionList,
                                                                                        [item.name]: {
                                                                                            ...useOptionList[item.name],
                                                                                            [el.id]: {
                                                                                                option: useOptionList[item.name] && useOptionList[item.name][el.id]?.option ? false : true,
                                                                                                price: index < item.free ? 0 : el.currentPrice
                                                                                            }
                                                                                        }
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
                            noOnlyOptionsList &&
                            <>
                                <div className="goodsDetails-wrap-product-noOnly">
                                    <Tooltip title={""}>
                                        <h3>Ingredient <Switch checkedChildren="only" unCheckedChildren="no" defaultChecked
                                            onChange={(value) => {
                                                setUseOptionList({ ...useOptionList, "ingredientList": {} })
                                                setNoOnly(value)
                                            }} /></h3>
                                    </Tooltip>
                                    <ul>
                                        {
                                            noOnlyOptionsList[noOnly ? 0 : 1].ingredientList?.map((item, index) => {
                                                return (
                                                    <li key={item.id}>
                                                        <div className="toppings-title"><h5>{item.name}</h5><span>{item.currentPrice === 0 ? "" : `+ € ${item.currentPrice} `}</span></div>
                                                        <div>
                                                            <CheckOutlined
                                                                className={useOptionList?.ingredientList[item.id]?.option ? style.themeColor : ""}
                                                                onClick={() => {
                                                                    chooseAtLeast(useOptionList, item);
                                                                    message.success(useOptionList.ingredientList[item.id]?.option ? `- ${item.name}, total: € ${totalPrice - item.currentPrice}` : `+ ${item.name}, total: € ${totalPrice + item.currentPrice}`)
                                                                    setUseOptionList(
                                                                        {
                                                                            ...useOptionList,
                                                                            "ingredientList": {
                                                                                ...useOptionList.ingredientList,
                                                                                [item.id]: {
                                                                                    option: useOptionList.ingredientList[item.id]?.option ? false : true,
                                                                                    price: index < useOptionList.free ? 0 : item.currentPrice
                                                                                }
                                                                            }
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
