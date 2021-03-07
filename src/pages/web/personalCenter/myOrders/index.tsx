/*
 * @Author: your name
 * @Date: 2021-03-04 17:53:51
 * @LastEditTime: 2021-03-05 14:51:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/web/personalCenter/sendQ/index.tsx
 */
import React from 'react'
import { Card, Button } from 'antd'
import { InfoCircleOutlined, HistoryOutlined } from '@ant-design/icons';
import './index.min.css'


const MyOrders = () => {
    return (
        <div className="myOrders-wrap">
            <div>
                <h3>Active</h3>
                <div className="myOrders-wrap-list">
                    <Card
                        title="Jungle Pizza · Delivery · 3Item · €71"
                        bordered={false}
                        extra={<InfoCircleOutlined />}
                    >
                        <div className="myOrders-wrap-list-content">
                            <p>Estimated Time:<span><HistoryOutlined /> 18:00</span></p>
                            <p>Status:<span>Delivering</span></p>
                        </div>
                        <div className="myOrders-wrap-list-footer">Order #3235</div>
                    </Card>
                </div>

            </div>
            <div>
                <h3>Completed</h3>
                <div className="myOrders-wrap-list">
                    <Card
                        title="Jungle Pizza · Delivery · 3Item · €71"
                        bordered={false}
                        extra={<InfoCircleOutlined />}
                    >
                        <p>Card content</p>
                        <Button type="primary" block>Order #3235</Button>
                    </Card>
                </div>

            </div>
        </div>
    )
}

export default MyOrders