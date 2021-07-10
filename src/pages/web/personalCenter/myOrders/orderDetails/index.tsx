import React, { useState, useEffect } from 'react'
import Icon, { EnvironmentOutlined, HomeOutlined, WalletOutlined } from '@ant-design/icons';
import { Divider, Modal, Spin } from 'antd';
import V_Map from '@/pages/components/map';
import OrderDetailsList from 'src/pages/components/orderDetailsList'

import { APIOrderDetail } from '@/pages/api/request';
import './index.less'
import { OrderDetailResponse } from '@/pages/api/types';
import { OrderStatus, paymentType } from '@/utils/constant';



const OrderDetails = (props) => {
    const [visible, setvisible] = useState(false)
    const [loading, setIsLoading] = useState(true)
    const { isOpen, isClose, orderId } = props;
    const [data, setData] = useState<OrderDetailResponse>();

    useEffect(() => {
        setvisible(isOpen);
    }, [isOpen])


    const handleCancel = (e) => {
        console.log(e);
        setvisible(false);
        isClose();
    }
    useEffect(() => {
        setIsLoading(true)
        async function fetchDetails() {
            try {
                const { data } = await APIOrderDetail({ id: orderId });
                setData(data);
                setIsLoading(false)
            } catch (err) {
                console.log(`APIOrderDetail err`, err)
            }
        }
        if (orderId !== 0) {
            fetchDetails();
        }
        fetchDetails();
    }, [orderId])
    const location = data?.userShippingAddress ?
        { "lat": data?.userShippingAddress.latitude, "lng": data?.userShippingAddress.longitude }
        : { "lat": data?.shop?.latitude, "lng": data?.shop?.longitude }
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
                                    <p>Total</p><span> € {data?.totalAmount}</span>
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
                                                    <span style={{ width: "20%", textAlign: "right" }}>€ {item.price}</span>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            <Divider />
                            {
                                data?.userShippingAddress ? (
                                    <ul className="orderDetials-left-address" >
                                        <li>
                                            <p><EnvironmentOutlined style={{ fontSize: '1.5rem', marginRight: "1rem" }} />{data?.userShippingAddress?.detail}</p>
                                        </li>
                                        <li>
                                            <p><HomeOutlined style={{ fontSize: '1.5rem', marginRight: "1rem" }} />{data?.userShippingAddress?.houseNumber}</p>
                                            <p><WalletOutlined style={{ fontSize: '1.5rem', marginRight: "1rem" }} />{data?.userShippingAddress?.zipCode}</p>
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
                                <li>
                                    <div>
                                        <p>Delivery Fee: <span>€ {data?.freightAmount}</span> </p>
                                    </div>
                                    <div>
                                        <p>Order for: <span>{data?.userShippingAddress.consignee}</span> </p>
                                    </div>
                                </li>
                                <li>
                                    {/* <div>
                                        <p>Delivery Time: <span>ASAP</span> </p>
                                    </div> */}
                                    <div>
                                        <p>Payment Method: <span>{paymentType.get(data?.paymentType)}</span> </p>
                                    </div>
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
