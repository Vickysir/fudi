

import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Radio, Row } from 'antd';
import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';
import { useAppStore } from '@/__internal';
import './index.less'
import RoundButton from '@/pages/components/antd/button';
import RoundInput from '@/pages/components/antd/input';

const Payment = () => {

    const commonInfo = useAppStore("commonInfo");

    return (
        <div>
            <div className="payment-wrap">
                <div className="payment-wrap-header">
                    <Button
                        type="primary"
                        shape="round"
                        onClick={() => { history.go(-1) }}
                    >
                        <ArrowLeftOutlined />Back
                        </Button>
                </div>
                <div className="payment-wrap-body">
                    <div>
                        <h1>Payment</h1>
                        <ul className="payment-wrap-body-cardInfo">
                            <li>
                                <p className="payment-wrap-body-cardInfo-title">Card Number</p>
                                <RoundInput placeholder="**** **** **** ****" style={{ paddingLeft: "16px" }} />
                            </li>
                            <li>
                                <div>
                                    <p className="payment-wrap-body-cardInfo-title">Expiry date</p>
                                    <RoundInput placeholder="mm/yyyy" style={{ paddingLeft: "16px" }} />
                                </div>
                                <div>
                                    <p className="payment-wrap-body-cardInfo-title">CVV</p>
                                    <RoundInput placeholder="***" style={{ paddingLeft: "16px" }} />
                                </div>
                            </li>
                        </ul>
                        <div>
                            <RoundInput placeholder="Cardoldern Name" style={{ paddingLeft: "16px" }} prefix={<UserOutlined />} />
                        </div>
                        <div>
                            <p>We accept Visa & Master Card</p>
                        </div>

                        <div>
                            <RoundButton
                                type="primary"
                                block
                                onClick={() => {
                                }}
                            >
                                Confirm
                        </RoundButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
