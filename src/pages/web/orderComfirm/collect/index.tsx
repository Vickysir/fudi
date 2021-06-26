import { Divider, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import Icon from '@ant-design/icons';

import iconShopGoods from '@/assets/images/common/icon/icon-shop-goods.svg';
import style from '@/styles/theme/icon.less'

import './index.less'
import OrderMethod from '../components';
import { APIShopDetail } from '@/pages/api/request';
import { ShopDetailResponse } from '@/pages/api/types';

interface Props {
    shopId: number
}
const CollectCom = (props: Props) => {
    const { shopId } = props;
    const [loading, setLoading] = useState(true)
    const [shopDetails, setshopDetails] = useState<ShopDetailResponse>();
    const fetchShopDetails = async () => {
        const { data } = await APIShopDetail({ "id": Number(shopId) });
        setshopDetails(data);
        setLoading(false);
        APP_STORE.commonInfo = {
            ...APP_STORE.commonInfo,
            startTimeFormat: data.startTimeFormat,
            endTimeFormat: data.endTimeFormat
        };
    }
    useEffect(() => {
        fetchShopDetails();
    }, [])
    return (
        <div className="orderComfirmType-wrap">
            <div className="orderComfirmType-wrap-restaurant">
                <h5>Restaurant Adress</h5>
                <Spin spinning={loading}>
                    <ul style={{ margin: 0 }}>
                        <li style={{ display: "flex", alignItems: "center", height: '30px' }}>
                            <Icon
                                component={iconShopGoods}
                                className={` ${style.iconFill}`}
                                style={{ fontSize: "2rem", }}
                            />
                        </li>

                        <li>
                            <h3>{shopDetails?.name}</h3>
                            <h5>{shopDetails?.address}</h5>
                        </li>
                    </ul>
                </Spin>
            </div>
            <OrderMethod type="collect" />
        </div>
    )
}

export default CollectCom
