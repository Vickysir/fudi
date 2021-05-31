import { APIGetCartList, APIRemoveCartList, APIUpdateCartList } from '@/pages/api/request'
import { message, Spin } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import RoundButton from '../antd/button'
import './index.less'

interface Props extends RouteComponentProps {
    refreshHeader: () => void
}
const OrderDetailsList = (props: Props) => {
    const { refreshHeader, history } = props;
    const [total, setTotal] = useState(0);
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const handleChangeGoodsCount = async (action, id, count) => {
        let goodCount;
        if (action === "plus") {
            goodCount = count + 1;
            await APIUpdateCartList({ shopId: 1, id, quantity: goodCount });

        } else if (action === "minus") {
            if (count === 1) {
                setLoading(true);
                await APIRemoveCartList({ shopId: 1, id });
                await fetchData();
                await refreshHeader();
                return
            }
            goodCount = count - 1;
            await APIUpdateCartList({ shopId: 1, id, quantity: goodCount });

        }
        setLoading(true);
        fetchData();
    }

    const caculateTotal = (data) => {
        let totlePrice = 0;
        data?.map((item) => {
            totlePrice += (item.quantity * item.goods.currentPrice)
        })
        setTotal(totlePrice)
    }

    const fetchData = async () => {
        const { data } = await APIGetCartList({ shopId: 1 });
        setData(data);
        setLoading(false)
        caculateTotal(data)
    }
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div className="orderDetailsList-wrap">
            <h5>Order Detials</h5>
            <Spin spinning={loading}>
                <ul className="orderDetailsList-wrap-detail">{
                    data?.map((item) => {
                        const { goods: { currentPrice, title, ingredientClassify } } = item;
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
                                            el.ingredientList.map((v) => {
                                                optionList.push(v.name);
                                                // TODO free如何计算 currentPrice
                                            })
                                            return (
                                                <li><p>{el.name}: {optionList.join(',')}</p></li>
                                            )
                                        })
                                    }
                                </ul>
                                {/* TODO js计算精度的问题 */}
                                <div>€ {currentPrice * item.quantity}</div>
                            </li>
                        )
                    })
                }
                </ul>
            </Spin>
            <div>
                <RoundButton
                    disabled={data.length === 0}
                    type="primary"
                    block
                    onClick={() => {
                        history.push('/orderConfirm')
                    }}
                >
                    Confirm Order € {total}
                </RoundButton>
            </div>
        </div>
    )
}

export default withRouter(OrderDetailsList)
