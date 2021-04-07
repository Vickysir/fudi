/*
 * @Author: your name
 * @Date: 2021-03-04 17:53:51
 * @LastEditTime: 2021-04-01 11:27:15
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
import { ORDERSTATUS_RECEIVED, ORDERSTATUS_COOKING, ORDERSTATUS_DELIVERING, OrderStatus, DeliveryType } from '@/utils/constant';
import { Spin } from 'antd';





const MyOrders = () => {
    const [isOpen, setisOpen] = useState(false)
    const [issend, setissend] = useState(false)
    const [data, setData] = useState({
        activeGroup: [],
        completedGroup: []
    });
    const commonInfo = useAppStore("commonInfo");


    const addReview = () => {
        console.log('open')
        setisOpen(true);
    }
    const addReviewClose = (type: string) => {
        setisOpen(false);
        if (type === "ok") return setissend(true);
        return setissend(false);
    }
    const sendSuccessClose = () => {
        setissend(false);
    }

    useEffect(() => {
        const params = {
            shopId: commonInfo?.shopId,
            // status: 1
        }
        APIPersonalCenterOrderList(params)
            .then((res) => {
                console.log(`APIPersonalCenterOrderList res`, res)
                const data = dataToGroup(res.data);
                console.log(`data`, data)
                setData(data);
            })
            .catch((err) => {
                console.log(`APIPersonalCenterOrderList err`, err)
            })
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
    const nodataStyle = data ? "" : "nodata"
    const { activeGroup, completedGroup } = data;
    return (
        <div className={"myOrders-wrap " + nodataStyle}>
            {
                data ?
                    <>
                        {
                            <div className="myOrders-wrap-list-layout">
                                <h3 style={{ marginTop: 0 }}>Active</h3>
                                {
                                    activeGroup.length !== 0 ?
                                        activeGroup.map((item, index) => {
                                            return (
                                                <div key={item.id} className="myOrders-wrap-list">
                                                    <ul className="myOrders-wrap-list-title">
                                                        <li>{item.shop.name} <span>·</span> {DeliveryType.get(item.deliveryType)} <span>·</span> {item.goodsList.length}Item <span>·</span> €{item.actualAmount}</li>
                                                        <li><InfoCircleOutlined /></li>
                                                    </ul>
                                                    <div className="myOrders-wrap-list-content">
                                                        <p>Estimated Time:<span><HistoryOutlined /> 18:00</span></p>
                                                        <p>Status:<span>{OrderStatus.get(item.status)}</span></p>
                                                    </div>
                                                    <div className="myOrders-wrap-list-footer">Order #{item.id}</div>
                                                </div>
                                            )
                                        })
                                        :
                                        <div style={{ "textAlign": "center" }}>
                                            <Spin />
                                        </div>
                                }
                            </div>

                        }
                        {
                            <div className="myOrders-wrap-list-layout">
                                <h3 style={{ marginTop: 0 }}>Completed</h3>
                                {
                                    completedGroup.length !== 0 ?
                                        completedGroup.map((item, index) => {
                                            return (
                                                <div key={item.id} className="myOrders-wrap-list">
                                                    <ul className="myOrders-wrap-list-title title-completed">
                                                        <li>{item.shop.name} <span>·</span> {DeliveryType.get(item.deliveryType)} <span>·</span> {item.goodsList.length}Item <span>·</span> €{item.actualAmount}</li>
                                                        <li><InfoCircleOutlined /></li>
                                                    </ul>
                                                    <div className="myOrders-wrap-list-content">
                                                        <p>Estimated Time:<span className="completed"><HistoryOutlined /> 18:00</span></p>
                                                        <p>Status:<span className="completed">{OrderStatus.get(item.status)}</span></p>
                                                    </div>
                                                    <div className="myOrders-wrap-list-footer footer-completed">Order #{item.id}</div>
                                                </div>
                                            )
                                        })
                                        :
                                        <div style={{ "textAlign": "center" }}>
                                            <Spin />
                                        </div>
                                }
                            </div>
                        }

                        {/* <div>
                            <h3 style={{ marginTop: 0 }}>Completed</h3>
                            <div className="myOrders-wrap-list">
                                <ul className="myOrders-wrap-list-title title-completed">
                                    <li>Jungle Pizza <span>·</span> Delivery <span>·</span> 3Item <span>·</span> €71</li>
                                    <li><InfoCircleOutlined /></li>
                                </ul>
                                <div className="myOrders-wrap-list-content">
                                    <p>Estimated Time:<span className="completed"><HistoryOutlined /> 18:00</span></p>
                                    <p>Status:<span className="completed">Recieved</span></p>
                                </div>
                                <ul className="myOrders-wrap-list-footer footer-completed">
                                    <li>Order #3235</li>
                                    <li onClick={addReview}>Add Review</li>
                                </ul>
                            </div>
                        </div> */}
                    </>
                    : <img src={logoOne} alt="logo" />
            }
            <AddReview isOpen={isOpen} isClose={addReviewClose} />
            <SendSuccess isOpen={issend} isClose={sendSuccessClose} />
        </div>
    )

}

export default MyOrders