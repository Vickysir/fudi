import { APIGetCartList, APIRemoveCartList, APIUpdateCartList } from '@/pages/api/request'
import { message, Spin } from 'antd'
import React, { ReactNode, useEffect, useState } from 'react'
import RoundButton from '../antd/button'
import './index.less'

interface Props {
    refreshHeader: () => void
}
const OrderDetailsList = (props: Props) => {
    const { refreshHeader } = props;
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
                        const { goods: { currentPrice, title } } = item;
                        return (
                            <li key={item.id}>
                                <ul>
                                    <li onClick={() => handleChangeGoodsCount("plus", item.id, item.quantity)}>+</li>
                                    <li>{item.quantity}</li>
                                    <li onClick={() => handleChangeGoodsCount("minus", item.id, item.quantity)}>-</li>
                                </ul>
                                <ul>
                                    <li><h3>{title}</h3></li>
                                    <li><p>Size: 14” - Giant</p></li>
                                    <li><p>Toppings: Extra Cheese, Sundried tomatoes</p></li>
                                </ul>
                                <div>€ {currentPrice * item.quantity}</div>
                            </li>
                        )
                    })
                }
                </ul>
            </Spin>
            <div>
                <RoundButton type="primary" block>Confirm Order € {total}</RoundButton>
            </div>
        </div>
    )
}

export default OrderDetailsList
