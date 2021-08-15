/*
 * @Author: your name
 * @Date: 2021-03-04 17:53:51
 * @LastEditTime: 2021-04-08 11:04:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/web/personalCenter/sendQ/index.tsx
 */
import React, { useEffect, useState } from 'react'
import { InfoCircleOutlined, HistoryOutlined } from '@ant-design/icons';
import logoOne from '@/assets/images/fudi/logoOne.svg'
import AddReview from './addReview';
import SendSuccess from './sendSuccess';
import './index.less'
import { APIPersonalCenterOrderList } from '@/pages/api/request';
import { useAppStore } from '@/__internal';
import { ORDERSTATUS_RECEIVED, ORDERSTATUS_COOKING, ORDERSTATUS_DELIVERING, OrderStatus, DeliveryType, ORDERSTATUS_DELIVERED } from '@/utils/constant';
import { Spin } from 'antd';
import { formatDateToHour } from '@/utils/timer';
import OrderDetails from './orderDetails';





const MyOrders = () => {
    const [isOpen, setisOpen] = useState(false)
    const [issend, setissend] = useState(false)
    const [isOpenDetails, setOpenDetails] = useState(false)
    const [selectOrder, setSelectOrder] = useState<{ id: number, deliveryType: number }>({ id: 0, deliveryType: 0 })
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        activeGroup: [],
        completedGroup: []
    });
    const commonInfo = useAppStore("commonInfo");


    const addReview = () => {
        setisOpen(true);
    }
    const addReviewClose = (type: string) => {
        setisOpen(false);
        if (type === "ok") {
            setissend(true);
            fetchOrderList();
            return
        }
        return setissend(false);
    }
    const sendSuccessClose = () => {
        setissend(false);
    }

    const closeDetails = () => {
        setOpenDetails(false);
    }
    const fetchOrderList = () => {
        const params = {
            shopId: commonInfo?.shopId,
            // status: 1
        }
        setLoading(true)
        APIPersonalCenterOrderList(params)
            .then((res) => {
                const data = dataToGroup(res.data);
                setData(data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(`APIPersonalCenterOrderList err`, err)
            })
    }
    useEffect(() => {
        fetchOrderList();
    }, [])
    const dataToGroup = (dataSource) => {
        let activeGroup = [];
        let completedGroup = [];

        dataSource.map((item, index) => {
            if (item.status === ORDERSTATUS_RECEIVED || item.status === ORDERSTATUS_COOKING || item.status === ORDERSTATUS_DELIVERING) {
                activeGroup.push(item);
            } else {
                completedGroup.push(item);
            }
            return
        })
        return { activeGroup, completedGroup }


    }
    const { activeGroup, completedGroup } = data;
    const nodataStyle = activeGroup.length > 0 || completedGroup.length > 0 ? "" : "nodata"
    //TODO 如何处理预估时间

    return (
        <div className={"myOrders-wrap " + nodataStyle}>
            {
                activeGroup.length > 0 || completedGroup.length > 0 ?
                    <>
                        {
                            <div className="myOrders-wrap-list-layout">
                                <h3 style={{ marginTop: 0 }}>Active</h3>
                                {
                                    loading ?
                                        <div style={{ "textAlign": "center" }}>
                                            <Spin />
                                        </div>
                                        :
                                        activeGroup.map((item, index) => {
                                            return (
                                                <div key={item.id} className="myOrders-wrap-list">
                                                    <div onClick={() => { setOpenDetails(true); setSelectOrder(item) }}>
                                                        <ul className="myOrders-wrap-list-title">
                                                            <li>{item.shop.name} <span>·</span> {DeliveryType.get(item.deliveryType)} <span>·</span> {item.goodsList.length}Item <span>·</span> €{item.actualAmount}</li>
                                                            <li onClick={() => { setOpenDetails(true); setSelectOrder(item) }}><InfoCircleOutlined /></li>
                                                        </ul>
                                                        <div className="myOrders-wrap-list-content">
                                                            <p>Estimated Time:<span><HistoryOutlined /> {formatDateToHour(item.createTime)}</span></p>
                                                            <p>Status:<span>{OrderStatus.get(item.status)}</span></p>
                                                        </div>
                                                    </div>
                                                    <ul className="myOrders-wrap-list-footer">
                                                        <li>Order #{item.id}</li>
                                                        {
                                                            item.status === ORDERSTATUS_DELIVERED && (
                                                                <li onClick={() => { addReview(); setSelectOrder(item) }}>Add Review</li>
                                                            )
                                                        }
                                                    </ul>
                                                </div>
                                            )
                                        })

                                }
                            </div>

                        }
                        {
                            <div className="myOrders-wrap-list-layout">
                                <h3 style={{ marginTop: 0 }}>Completed</h3>
                                {
                                    loading ?
                                        <div style={{ "textAlign": "center" }}>
                                            <Spin />
                                        </div>
                                        :
                                        completedGroup.map((item, index) => {
                                            return (
                                                <div key={item.id} className="myOrders-wrap-list">
                                                    <div onClick={() => { setOpenDetails(true); setSelectOrder(item) }}>
                                                        <ul className="myOrders-wrap-list-title title-completed">
                                                            <li>{item.shop.name} <span>·</span> {DeliveryType.get(item.deliveryType)} <span>·</span> {item.goodsList.length}Item <span>·</span> €{item.actualAmount}</li>
                                                            <li onClick={() => { setOpenDetails(true); setSelectOrder(item) }}><InfoCircleOutlined /></li>
                                                        </ul>
                                                        <div className="myOrders-wrap-list-content">
                                                            <p>Estimated Time:<span className="completed"><HistoryOutlined /> {formatDateToHour(item.createTime)}</span></p>
                                                            <p>Status:<span className="completed">{OrderStatus.get(item.status)}</span></p>
                                                        </div>
                                                    </div>
                                                    <ul className="myOrders-wrap-list-footer footer-completed">
                                                        <li>Order #{item.id}</li>
                                                        {
                                                            item.status === ORDERSTATUS_DELIVERED && (
                                                                <li onClick={() => { addReview(); setSelectOrder(item) }}>Add Review</li>
                                                            )
                                                        }
                                                    </ul>
                                                </div>
                                            )
                                        })
                                }
                            </div>
                        }
                    </>
                    : <img src={logoOne} alt="logo" />
            }
            <AddReview isOpen={isOpen} isClose={addReviewClose} orderId={selectOrder?.id} />
            <SendSuccess isOpen={issend} isClose={sendSuccessClose} />
            <OrderDetails isOpen={isOpenDetails} isClose={closeDetails} orderId={selectOrder?.id} orderType={selectOrder?.deliveryType} />
        </div >
    )

}

export default MyOrders