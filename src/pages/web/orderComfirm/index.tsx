import WebFooter from '@/pages/components/header/webFooter'
import WebHeader from '@/pages/components/header/webHeader'
import OrderDetailsList from '../../components/orderDetailsList'
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import React, { useState } from 'react'
import './index.less'
import { APIGetCartList } from '@/pages/api/request';

const OrderComfirm = () => {
    const [refreshHeaderCart, setRefreshHeaderCart] = useState(0);

    const fetchData = async () => {
        setRefreshHeaderCart(new Date().getTime())
    }
    return (
        <div>
            <WebHeader refreshCart={refreshHeaderCart} />
            <div className="orderComfirm-wrap">
                <div className="orderComfirm-wrap-header">
                    <Button
                        // className="shop-wrap-banner-button"
                        type="primary"
                        shape="round"
                        onClick={() => { history.go(-1) }}
                    >
                        <ArrowLeftOutlined />Back
                        </Button>
                </div>
                <div className="orderComfirm-wrap-body">
                    <div>
                        <h1>Confirm Order</h1>
                        <OrderDetailsList refreshHeader={fetchData} />
                    </div>
                    <div></div>
                </div>
            </div>
            <WebFooter />
        </div>
    )
}

export default OrderComfirm
