import React, { useState, useEffect } from 'react'
import Icon, { EnvironmentOutlined, HomeOutlined, WalletOutlined } from '@ant-design/icons';
import { Divider, Modal, Spin } from 'antd';
import V_Map from '@/pages/components/map';
import OrderDetailsList from 'src/pages/components/orderDetailsList'

import { APIOrderDetail } from '@/pages/api/request';
import './index.less'
import { OrderDetailResponse } from '@/pages/api/types';
import { DELIVERYTYPE_DELIVERY, OrderStatus, paymentType } from '@/utils/constant';
import { havePlaceholder } from '@/utils';
import { formatDateTime } from '@/utils/timer';



const OrderDetails = (props) => {
    const [visible, setvisible] = useState(false)
    const [loading, setIsLoading] = useState(true)
    const { isOpen, isClose, orderId, orderType } = props;
    const [data, setData] = useState<OrderDetailResponse>();

    const handleCancel = (e) => {
        console.log(e);
        setvisible(false);
        isClose();
        setData(undefined);
    }
    useEffect(() => {
        setIsLoading(true);
        setvisible(isOpen);

        async function fetchDetails() {
            try {
                const { data } = await APIOrderDetail({ id: orderId });
                setData(data);
                setIsLoading(false)
            } catch (err) {
                console.log(`APIOrderDetail err`, err)
            }
        }
        if (orderId !== 0 && isOpen) {
            fetchDetails();
        }

    }, [isOpen])

    const location = orderType === DELIVERYTYPE_DELIVERY ?
        { "lat": data?.userShippingAddress.latitude, "lng": data?.userShippingAddress.longitude }
        : { "lat": data?.shop?.latitude, "lng": data?.shop?.longitude }

    const calculategoodsPrices = (item) => {
        let price = item.price;
        const quantity = item.quantity;
        item.ingredientClassifyList.map((el) => {
            el.ingredientList.map((v) => {
                price = price + v.price
            })
        })
        return price * quantity
    }
    return (
        <div>
            <Modal
                visible={visible}
                onCancel={handleCancel}
                footer={null}
                width='56.78%'
            >
                <Spin spinning={loading}>
                    <div className="model-content orderDetials" style={{ padding: 0 }}>
                        <div className="orderDetials-left">
                            <ul className="orderDetials-left-shop">
                                <li>
                                    <p>Order #{data?.id}</p>
                                </li>
                                <li>
                                    <h3>{data?.shop?.name}</h3>
                                    <p>{OrderStatus.get(data?.status)}</p>
                                </li>
                                <li>
                                    <div>
                                        <p>Total</p><span> € {data?.totalAmount}</span>
                                    </div>
                                    <div>
                                        <p>Coupon</p><span> € {data?.couponAmount}</span>
                                    </div>
                                    <div>
                                        <p>Actual</p><span> € {data?.actualAmount}</span>
                                    </div>
                                </li>
                            </ul>
                            <Divider />
                            <div className="orderDetials-left-order">
                                <p>Order Detials</p>
                                <ul >
                                    {
                                        data?.goodsList?.map((item) => {
                                            return (
                                                <li key={item.id}>
                                                    <span style={{ width: "10%" }}>{item.quantity}</span>
                                                    <div>
                                                        <p>{item.title}</p>
                                                        {
                                                            item.ingredientClassifyList.map((el) => {
                                                                return (
                                                                    <ul key={el.name}>
                                                                        {
                                                                            el.ingredientList.map((v) => {
                                                                                return (
                                                                                    <li key={v.id}>{el.name}:{v.name}</li>
                                                                                )
                                                                            })
                                                                        }
                                                                    </ul>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    <span style={{ width: "20%", textAlign: "right" }}>€ {calculategoodsPrices(item)}</span>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            <Divider />
                            {
                                orderType === DELIVERYTYPE_DELIVERY ? (
                                    <ul className="orderDetials-left-address" >
                                        <li>
                                            <p><EnvironmentOutlined style={{ fontSize: '1.5rem', marginRight: "1rem" }} />{havePlaceholder(data?.userShippingAddress?.detail)}</p>
                                        </li>
                                        <li>
                                            <p><HomeOutlined style={{ fontSize: '1.5rem', marginRight: "1rem" }} />{havePlaceholder(data?.userShippingAddress?.houseNumber)}</p>
                                            <p><WalletOutlined style={{ fontSize: '1.5rem', marginRight: "1rem" }} />{havePlaceholder(data?.userShippingAddress?.zipCode)}</p>
                                        </li>
                                    </ul>
                                ) : (
                                    <ul className="orderDetials-left-address" >
                                        <li>
                                            <p><EnvironmentOutlined style={{ fontSize: '1.5rem', marginRight: "1rem" }} />{data?.shop.address}</p>
                                        </li>
                                    </ul>
                                )
                            }

                            <Divider />
                            <ul className="orderDetials-left-options">
                                {
                                    orderType === DELIVERYTYPE_DELIVERY &&
                                    <li>
                                        <div>
                                            <p>Delivery Fee: <span>€ {data?.freightAmount}</span> </p>
                                        </div>
                                        {/* <div>
                                            <p>Delivery Time: <span>ASAP</span> </p>
                                        </div> */}
                                    </li>
                                }
                                <li>
                                    <div>
                                        <p>Order for: <span>{data?.userShippingAddress.consignee}</span> </p>
                                    </div>
                                    <div>
                                        <p>Payment Method: <span>{paymentType.get(data?.paymentType)}</span> </p>
                                    </div>
                                </li>
                                <li>
                                    <p>Create Time: <span>{formatDateTime(data?.createTime)}</span></p>
                                </li>
                                <li>
                                    <div>
                                        <p>Notes: <span>{data?.remark}</span> </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="orderDetials-right">
                            <V_Map markerLatLng={location} />
                        </div>
                    </div>
                </Spin>
            </Modal>
        </div>
    )
}

export default OrderDetails
