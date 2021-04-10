/*
 * @Author: your name
 * @Date: 2021-03-04 17:26:34
 * @LastEditTime: 2021-04-01 11:38:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/web/personalCenter/coupons/index.tsx
 */
import React, { useEffect, useState } from 'react'
import { Input, Row, Col, message } from 'antd';
import { ContainerOutlined, PlusOutlined } from '@ant-design/icons';
import logoOne from '@/assets/images/fudi/logoOne.svg'
import VouchersInfo from './info';
import './index.less'
import { APIPersonalCenterCouponList, APIPersonalCenterInvalidCoupon, APIPersonalCenterObtainCoupon, APIPersonalCenterUsableCoupon } from '@/pages/api/request';
import { useAppStore } from '@/__internal';
import { formatDateToDay } from '@/utils/timer';



const { Search } = Input;
const Vouchers = () => {
    const [isOpen, setisOpen] = useState(false);
    const [data, setData] = useState([]);
    const [vouchersDetails, setVouchersDetails] = useState(null);
    const commonInfo = useAppStore("commonInfo");


    const handleAddVouchers = (value: string) => {
        console.log(value);
        if (value) {
            APIPersonalCenterObtainCoupon({ code: value })
                .then((res) => {
                    console.log(`APIPersonalCenterCouponList res`, res)
                    getVouchersList();
                })
                .catch((err) => {
                    console.log(`APIPersonalCenterCouponList err`, err)
                })
        }

    }

    const onClickOpen = (item) => {
        setisOpen(true);
        setVouchersDetails(item)
    }
    const onCloseInfo = () => {
        setisOpen(false);
    }
    useEffect(() => {
        getVouchersList();
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

    const getVouchersList = async () => {
        if (commonInfo?.shopId) {
            const { data } = await APIPersonalCenterCouponList({ "shopId": commonInfo.shopId });
            setData(data);
        } else {
            message.error("not have shop id")
        }
    }



    return (
        <div className={"vouchers-wrap"}>

            <>
                <header>
                    <h3>My Vouchers</h3>
                    <Search
                        placeholder="Add Voucher Code"
                        allowClear
                        onSearch={handleAddVouchers}
                        prefix={<ContainerOutlined style={{ "margin": "0 0.5rem" }} />}
                        enterButton={<PlusOutlined />}
                        style={{ "width": 300 }}
                    />
                </header>
                {
                    data.length > 0 ?
                        <div>
                            <Row gutter={[24, 32]}>
                                {
                                    data.map((item, index) => {
                                        return <Col key={item.id} span={12}>
                                            <div className="vouchers-wrap-box">
                                                <div>
                                                    <h5>{item.title}</h5>
                                                    <p onClick={() => onClickOpen(item)}>Available</p>
                                                </div>
                                                <p>{`${formatDateToDay(item.activeDate)} - ${formatDateToDay(item.quietDate)}`}</p>
                                            </div>
                                        </Col>
                                    })
                                }

                            </Row>
                        </div>
                        :
                        <div style={{ height: "80%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <img src={logoOne} alt="logo" />
                        </div>
                }
            </>

            <VouchersInfo isOpen={isOpen} onClose={onCloseInfo} data={vouchersDetails} />
        </div>
    )
}

export default Vouchers
