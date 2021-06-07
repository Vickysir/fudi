import React from 'react'
import Icon, { EnvironmentOutlined, WalletOutlined, HomeOutlined } from '@ant-design/icons';
import OrderMethod from '../components'
import iconMap from '@/assets/images/common/icon/icon-map.svg';
import style from '@/styles/theme/icon.less'
import './index.less'

const DeliveryCom = () => {
    return (
        <div className="orderComfirmType-wrap">
            <div className="orderComfirmType-wrap-address">
                <ul>
                    <li>Delivery Adress</li>
                    <li>
                        <div className="inaline">
                            <span><EnvironmentOutlined style={{ fontSize: '1.5rem' }} /></span>
                            <p className="inaline">Grafton Street, Dublin</p>
                        </div>
                        <span>
                            <Icon
                                component={iconMap}
                                className={` ${style.iconFill}`}
                                style={{ fontSize: "1.5rem", }}
                            />
                        </span>
                    </li>
                    <li>
                        <div>
                            <span><HomeOutlined style={{ fontSize: '1.5rem' }} /></span>
                            <p>88-95</p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span><WalletOutlined style={{ fontSize: '1.5rem' }} /></span>
                            <p>AB 23</p>
                        </div>
                    </li>
                </ul>
                <ul style={{ margin: 0 }}>
                    <li>Delivery Fee: <span className="delivery-fee">€ 6</span></li>
                </ul>
            </div>
            <OrderMethod type="delivery" />
        </div>
    )
}


export default DeliveryCom
