/*
 * @Author: your name
 * @Date: 2021-03-04 17:26:34
 * @LastEditTime: 2021-04-01 11:38:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/web/personalCenter/coupons/index.tsx
 */
import React, { useEffect, useState } from 'react'
import { Input, Row, Col } from 'antd';
import { ContainerOutlined, PlusOutlined } from '@ant-design/icons';
import logoOne from '@/assets/images/fudi/logoOne.svg'
import VouchersInfo from './info';
import './index.less'
import { APIPersonalCenterCouponList, APIPersonalCenterInvalidCoupon, APIPersonalCenterObtainCoupon, APIPersonalCenterUsableCoupon } from '@/pages/api/request';



const { Search } = Input;
const Vouchers = () => {
    const [isOpen, setisOpen] = useState(false);
    const [data, setData] = useState([])

    const handleAddVouchers = (value: string) => {
        console.log(value);
        if (value) {
            APIPersonalCenterObtainCoupon({ code: value })
                .then((res) => {
                    console.log(`APIPersonalCenterCouponList res`, res)
                    setData(res.data);

                })
                .catch((err) => {
                    console.log(`APIPersonalCenterCouponList err`, err)
                })
        }

    }

    const onClickOpen = () => {
        setisOpen(true);
    }
    const onCloseInfo = () => {
        setisOpen(false);
    }
    useEffect(() => {
        APIPersonalCenterCouponList()
            .then((res) => {
                console.log(`APIPersonalCenterCouponList res`, res)
            })
            .catch((err) => {
                console.log(`APIPersonalCenterCouponList err`, err)
            })
        APIPersonalCenterUsableCoupon()
            .then((res) => {
                console.log(`APIPersonalCenterUsableCoupon res`, res)
            })
            .catch((err) => {
                console.log(`APIPersonalCenterUsableCoupon err`, err)
            })
        APIPersonalCenterInvalidCoupon()
            .then((res) => {
                console.log(`APIPersonalCenterInvalidCoupon res`, res)
            })
            .catch((err) => {
                console.log(`APIPersonalCenterInvalidCoupon err`, err)
            })

    }, [])
    const nodataStyle = data.length > 0 ? "" : "nodata"

    return (
        <div className={"vouchers-wrap " + nodataStyle}>
            {
                data.length > 0 ?
                    <>
                        <header>
                            <h3>My Vouchers</h3>
                            <Search
                                placeholder="Add Voucher Code"
                                allowClear
                                onSearch={handleAddVouchers}
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
                                            <p onClick={onClickOpen}>Available</p>
                                        </div>
                                        <p>21 Jun 2021 – 21 Jul 2021</p>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="vouchers-wrap-box">
                                        <div>
                                            <h5>Fudi2020</h5>
                                            <p onClick={onClickOpen}>Available</p>
                                        </div>
                                        <p>21 Jun 2021 – 21 Jul 2021</p>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="vouchers-wrap-box">
                                        <div>
                                            <h5>Fudi2020</h5>
                                            <p onClick={onClickOpen}>Available</p>
                                        </div>
                                        <p>21 Jun 2021 – 21 Jul 2021</p>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="vouchers-wrap-box">
                                        <div>
                                            <h5>Fudi2020</h5>
                                            <p onClick={onClickOpen}>Available</p>
                                        </div>
                                        <p>21 Jun 2021 – 21 Jul 2021</p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </>
                    : <img src={logoOne} alt="logo" />
            }
            <VouchersInfo isOpen={isOpen} onClose={onCloseInfo} />
        </div>
    )
}

export default Vouchers
