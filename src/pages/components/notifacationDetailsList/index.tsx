import { APIGetCartList, APIRemoveCartList, APIUpdateCartList } from '@/pages/api/request'
import { Divider, message, Spin } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import RoundButton from '../antd/button'
import './index.less'

interface Props extends RouteComponentProps {
    refreshHeader: () => void
}
const NotifacationDetailsList = (props: Props) => {
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
        <div className="notifacationDetailsList-wrap">
            <Spin spinning={loading}>
                <ul className="notifacationDetailsList-wrap-detail">
                    <li>
                        <ul>
                            <li>Tropical Summer</li>
                            <li>Today</li>
                        </ul>
                        <p>Fresh discount for the hot summer!</p>
                        <p>All lemonades with -50% discount.</p>
                        <Divider />
                    </li>
                    <li>
                        <ul>
                            <li>Tropical Summer</li>
                            <li>Today</li>
                        </ul>
                        <p>Fresh discount for the hot summer!</p>
                        <p>All lemonades with -50% discount.</p>
                        <Divider />
                    </li>
                </ul>
            </Spin>
            <div>
                <RoundButton
                    disabled={data.length === 0}
                    type="primary"
                    block
                    onClick={() => {
                        history.push('/personalCenter/notification')
                    }}
                >
                    See All
                </RoundButton>
            </div>
        </div>
    )
}

export default withRouter(NotifacationDetailsList)
