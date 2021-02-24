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


const MyOrders = () => {
    return (
        <div>
            <div>
                <h3>Active</h3>
                <Card title="Jungle Pizza · Delivery · 3Item · €71" bordered={false} style={{ width: 300 }}>
                    <p>Card content</p>
                    <Button type="primary">Order #3235</Button>
                </Card>
            </div>
            <div>
                <h3>Completed</h3>
                <Card title="Jungle Pizza · Delivery · 3Item · €71" bordered={false} style={{ width: 300 }}>
                    <p>Card content</p>
                    <Button type="primary">Order #3235</Button>
                </Card>
            </div>
        </div>
    )
}

export default MyOrders