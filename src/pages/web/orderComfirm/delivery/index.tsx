import React, { useEffect, useState } from 'react'
import Icon, { EnvironmentOutlined, WalletOutlined, HomeOutlined } from '@ant-design/icons';
import OrderMethod, { OrderOtherInfoFormData } from '../components'
import iconMap from '@/assets/images/common/icon/icon-map.svg';
import style from '@/styles/theme/icon.less'
import './index.less'
import { APIDeliveryFee } from '@/pages/api/request';
import { useAppStore } from '@/__internal';
import { COUPONTYPE_DELIVERYFEE } from '@/utils/constant';
import { OrderCoupon } from '@/pages/api/types';

interface Props {
    setFormData: (params: OrderOtherInfoFormData) => void
    setDeliverFee: (params: number) => void;
    voucher: OrderCoupon
}

const DeliveryCom = (props: Props) => {
    const { setDeliverFee, voucher } = props;
    const commonInfo = useAppStore("commonInfo");
    const [fee, setFee] = useState(0);

    useEffect(() => {
        async function fetchFee() {
            if (voucher?.type === COUPONTYPE_DELIVERYFEE) {
                const { data } = await APIDeliveryFee({ "shopId": commonInfo?.shopId, "userFreightCouponId": voucher.id, "userShippingAddressId": commonInfo?.deliveryAddressId });
                setFee(data.price);
                setDeliverFee(data.price);
            } else {
                const { data } = await APIDeliveryFee({ "shopId": commonInfo?.shopId, "userShippingAddressId": commonInfo?.deliveryAddressId });
                setFee(data.price);
                setDeliverFee(data.price);
            }
        }
        fetchFee()
    }, [commonInfo?.deliveryAddressId, voucher])

    return (
        <div className="orderComfirmType-wrap">
            <div className="orderComfirmType-wrap-address">
                <ul>
                    <li>Delivery Adress</li>
                    <li>
                        <div className="inaline">
                            <span><EnvironmentOutlined style={{ fontSize: '1.5rem' }} /></span>
                            <p className="inaline">{commonInfo.deliveryAddress}</p>
                        </div>
                        <span>
                            {/* <Icon
                                component={iconMap}
                                className={` ${style.iconFill}`}
                                style={{ fontSize: "1.5rem", }}
                            /> */}
                        </span>
                    </li>
                    <li>
                        <div>
                            <span><HomeOutlined style={{ fontSize: '1.5rem' }} /></span>
                            <p>{commonInfo.deliveryHouseNumber}</p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span><WalletOutlined style={{ fontSize: '1.5rem' }} /></span>
                            <p>{commonInfo.deliveryZipCode}</p>
                        </div>
                    </li>
                </ul>
                <ul style={{ margin: 0 }}>
                    <li>Delivery Fee: <span className="delivery-fee">€ {fee}</span></li>
                </ul>
            </div>
            <OrderMethod type="delivery" {...props} />
        </div>
    )
}


export default DeliveryCom
