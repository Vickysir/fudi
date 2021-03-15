/*
 * @Author: your name
 * @Date: 2021-03-04 17:26:34
 * @LastEditTime: 2021-03-15 18:13:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/web/personalCenter/coupons/index.tsx
 */
import React from 'react'
import { Input, Card } from 'antd';
import './index.less'


const { Search } = Input;
const sendQ = () => {
    const onSearch = value => console.log(value);
    return (
        <div className="vouchers-wrap">
            <header>
                <h3>My Vouchers</h3>
                <Search placeholder="input search text" allowClear onSearch={onSearch} enterButton />
            </header>
            <div>
                <Card title="Default size card" bordered={false} extra={<a href="#">More</a>} style={{ width: 300 }}>
                    <p>Card content</p>
                </Card>
            </div>
        </div>
    )
}

export default sendQ
