import { APIGetCartList, APIRemoveCartList, APIUpdateCartList } from '@/pages/api/request'
import { message, Spin } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import RoundButton from '../antd/button'
import { create, all } from 'mathjs'
import './index.less'
import { useAppStore } from '@/__internal';

const config = {
    number: 'BigNumber',
    precision: 20
}
export const math = create(all, config)
export interface TotalStructure {
    basicPricePart: string;
    discountPricePart: string
}
interface Props extends RouteComponentProps {
    comfirmBtn?: boolean
    orderListPrice?: (total: TotalStructure[]) => void
}
const OrderDetailsList = (props: Props) => {
    const { comfirmBtn = true, orderListPrice, history } = props;
    const commonInfo = useAppStore("commonInfo");
    const [total, setTotal] = useState("0");
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const handleChangeGoodsCount = async (action, id, count) => {
        let goodCount;
        if (action === "plus") {
            goodCount = count + 1;
            await APIUpdateCartList({ shopId: commonInfo?.shopId, id, quantity: goodCount });
            await refreshHeader();

        } else if (action === "minus") {
            if (count === 1) {
                setLoading(true);
                await APIRemoveCartList({ shopId: commonInfo?.shopId, id });
                await refreshHeader();
                await refreshHeader();
                return
            }
            goodCount = count - 1;
            await APIUpdateCartList({ shopId: commonInfo?.shopId, id, quantity: goodCount });
            await refreshHeader();

        }
        setLoading(true);
        await refreshHeader();
    }

    const caculateTotal = (data) => {
        let totlePrice = "0";

        const list = data?.map((item) => {
            const { goods: { currentPrice, originalPrice, ingredientClassify } } = item;
            let discontPrice = '0';
            let price = '0';
            if (currentPrice === originalPrice) {
                price = currentPrice;
            } else {
                discontPrice = currentPrice;
            }
            ingredientClassify.map((el) => {
                const freeOption = el.free;
                el.ingredientList.map((v, index) => {
                    // free option 计算 currentPrice
                    if (index < freeOption) {
                        // 是否为打折商品
                        if (v.currentPrice === v.originalPrice) {
                            price = math.format(math.chain(math.bignumber(price)).add(math.bignumber(0)).done());
                        } else {
                            discontPrice = math.format(math.chain(math.bignumber(discontPrice)).add(math.bignumber(0)).done());
                        }
                    } else {
                        // 是否为打折商品
                        if (v.currentPrice === v.originalPrice) {
                            price = math.format(math.chain(math.bignumber(price)).add(math.bignumber(v.currentPrice)).done());
                        } else {
                            discontPrice = math.format(math.chain(math.bignumber(discontPrice)).add(math.bignumber(v.currentPrice)).done());
                        }
                    }
                })
            })
            return {
                "basicPricePart": math.format(math.chain(math.bignumber(price)).multiply(math.bignumber(item.quantity)).done()),
                "discountPricePart": math.format(math.chain(math.bignumber(discontPrice)).multiply(math.bignumber(item.quantity)).done())
            };
        })


        list?.map((item) => {
            totlePrice = math.format(math.chain(math.bignumber(item.basicPricePart)).add(math.bignumber(item.discountPricePart)).add(math.bignumber(totlePrice)).done());
        })
        //更新
        setTotal(totlePrice);
        orderListPrice && orderListPrice(list);
    }

    const fetchData = async () => {
        const { data } = await APIGetCartList({ shopId: commonInfo?.shopId });
        setData(data);
        setLoading(false)
        caculateTotal(data)
    }
    const refreshHeader = async () => {
        APP_STORE.commonInfo = {
            ...APP_STORE.commonInfo,
            refreshCart: new Date().getTime()
        };
    }

    useEffect(() => {
        fetchData();
    }, [])
    useEffect(() => {
        fetchData();
    }, [commonInfo?.refreshCart])

    return (
        <div className="orderDetailsList-wrap">
            <h5>Order Detials</h5>
            <Spin spinning={loading}>
                <ul className="orderDetailsList-wrap-detail">{
                    data?.map((item) => {
                        const { goods: { currentPrice, title, ingredientClassify } } = item;
                        let price = currentPrice;
                        return (
                            <li key={item.id}>
                                <ul>
                                    <li style={{ cursor: "pointer" }} onClick={() => handleChangeGoodsCount("plus", item.id, item.quantity)}>+</li>
                                    <li>{item.quantity}</li>
                                    <li style={{ cursor: "pointer" }} onClick={() => handleChangeGoodsCount("minus", item.id, item.quantity)}>-</li>
                                </ul>
                                <ul>
                                    <li><h3>{title}</h3></li>
                                    {
                                        ingredientClassify.map((el) => {
                                            const optionList = [];
                                            const freeOption = el.free;
                                            el.ingredientList.map((v, index) => {
                                                optionList.push(v.name);
                                                // free option 计算 currentPrice
                                                if (index < freeOption) {
                                                    price = math.format(math.chain(math.bignumber(price)).add(math.bignumber(0)).done());
                                                } else {
                                                    price = math.format(math.chain(math.bignumber(price)).add(math.bignumber(v.currentPrice)).done());
                                                }
                                            })
                                            return (
                                                <li key={el.id}><p>{el.name}: {optionList.join(',')}</p></li>
                                            )
                                        })
                                    }
                                </ul>
                                <div>€ {math.format(math.chain(math.bignumber(price)).multiply(math.bignumber(item.quantity)).done())}</div>
                            </li>
                        )
                    })
                }
                </ul>
            </Spin>
            {
                comfirmBtn && <div>
                    <RoundButton
                        disabled={data.length === 0}
                        type="primary"
                        block
                        onClick={() => {
                            history.push('/home/orderConfirm')
                        }}
                    >
                        Confirm Order € {total}
                    </RoundButton>
                </div>
            }

        </div>
    )
}

export default withRouter(OrderDetailsList)
