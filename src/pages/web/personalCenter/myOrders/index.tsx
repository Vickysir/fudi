/*
 * @Author: your name
 * @Date: 2021-03-04 17:53:51
 * @LastEditTime: 2021-03-05 14:51:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/web/personalCenter/sendQ/index.tsx
 */
import React, { useEffect, useState } from 'react'
import { InfoCircleOutlined, HistoryOutlined } from '@ant-design/icons';
import AddReview from './addReview';
import SendSuccess from './sendSuccess';
import './index.less'
import { APIPersonalCenterOrderList } from '@/pages/api/request';




const MyOrders = () => {
    const [isOpen, setisOpen] = useState(false)
    const [issend, setissend] = useState(false)

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
        APIPersonalCenterOrderList()
            .then((res) => {
                console.log(`APIPersonalCenterOrderList res`, res)
            })
            .catch((err) => {
                console.log(`APIPersonalCenterOrderList err`, err)
            })
    }, [])
    return (
        <div className="myOrders-wrap">
            <div>
                <h3 style={{ marginTop: 0 }}>Active</h3>
                <div className="myOrders-wrap-list">
                    <ul className="myOrders-wrap-list-title">
                        <li>Jungle Pizza <span>·</span> Delivery <span>·</span> 3Item <span>·</span> €71</li>
                        <li><InfoCircleOutlined /></li>
                    </ul>
                    <div className="myOrders-wrap-list-content">
                        <p>Estimated Time:<span><HistoryOutlined /> 18:00</span></p>
                        <p>Status:<span>Delivering</span></p>
                    </div>
                    <div className="myOrders-wrap-list-footer">Order #3235</div>
                </div>
            </div>
            <div>
                <h3>Completed</h3>
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
            </div>
            <AddReview isOpen={isOpen} isClose={addReviewClose} />
            <SendSuccess isOpen={issend} isClose={sendSuccessClose} />
        </div>
    )
}

export default MyOrders