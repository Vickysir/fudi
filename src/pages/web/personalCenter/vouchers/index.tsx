/*
 * @Author: your name
 * @Date: 2021-03-04 17:26:34
 * @LastEditTime: 2021-03-16 13:15:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/web/personalCenter/coupons/index.tsx
 */
import React, { useState } from 'react'
import { Input, Row, Col } from 'antd';
import { ContainerOutlined, PlusOutlined } from '@ant-design/icons';
import VouchersInfo from './info';
import './index.less'



const { Search } = Input;
const sendQ = () => {
    const [isOpen, setisOpen] = useState(false);
    const onSearch = value => console.log(value);

    const onClickInfo = () => {
        setisOpen(true);
    }
    const onCloseInfo = () => {
        setisOpen(false);
    }

    return (
        <div className="vouchers-wrap">
            <header>
                <h3>My Vouchers</h3>
                <Search
                    placeholder="Add Voucher Code"
                    allowClear
                    onSearch={onSearch}
                    enterButton={<PlusOutlined />}
                    prefix={<ContainerOutlined style={{ "margin": "0 0.5rem" }} />}
                    style={{ "width": 300 }}
                />
            </header>
            <div>
                <Row gutter={[24, 32]}>
                    <Col span={12}>
                        <div className="vouchers-wrap-box">
                            <div>
                                <h5>Fudi2020</h5>
                                <p onClick={onClickInfo}>Available</p>
                            </div>
                            <p>21 Jun 2021 – 21 Jul 2021</p>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="vouchers-wrap-box">
                            <div>
                                <h5>Fudi2020</h5>
                                <p onClick={onClickInfo}>Available</p>
                            </div>
                            <p>21 Jun 2021 – 21 Jul 2021</p>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="vouchers-wrap-box">
                            <div>
                                <h5>Fudi2020</h5>
                                <p onClick={onClickInfo}>Available</p>
                            </div>
                            <p>21 Jun 2021 – 21 Jul 2021</p>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="vouchers-wrap-box">
                            <div>
                                <h5>Fudi2020</h5>
                                <p onClick={onClickInfo}>Available</p>
                            </div>
                            <p>21 Jun 2021 – 21 Jul 2021</p>
                        </div>
                    </Col>
                </Row>
            </div>
            <VouchersInfo isOpen={isOpen} onClose={onCloseInfo} />
        </div>
    )
}

export default sendQ
