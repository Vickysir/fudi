import { Divider } from 'antd'
import React from 'react'
import Icon from '@ant-design/icons';

import iconShopGoods from '@/assets/images/common/icon/icon-shop-goods.svg';
import style from '@/styles/theme/icon.less'

import './index.less'
import OrderMethod from '../components';

const CollectCom = () => {
    return (
        <div className="orderComfirmType-wrap">
            <div className="orderComfirmType-wrap-restaurant">
                <h5>Restaurant Adress</h5>
                <ul style={{ margin: 0 }}>
                    <li style={{ display: "flex", alignItems: "center", height: '30px' }}>
                        <Icon
                            component={iconShopGoods}
                            className={` ${style.iconFill}`}
                            style={{ fontSize: "2rem", }}
                        />
                    </li>
                    <li>
                        <h3>JUNGLE PIZZA</h3>
                        <h5>5 Castle St, Centre, Cork</h5>
                    </li>
                </ul>
            </div>
            <OrderMethod type="collect" />
        </div>
    )
}

export default CollectCom
