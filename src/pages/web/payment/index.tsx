

import React, { useEffect, useState } from 'react'
import { Button, Form, Input, message, Radio, Row } from 'antd';
import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';
import { useAppStore } from '@/__internal';
import './index.less'
import RoundButton from '@/pages/components/antd/button';
import RoundInput from '@/pages/components/antd/input';
import { PaymentOnlineEntityPost } from '@/pages/api/types';
import { APIPaymentOnlineEntity } from '@/pages/api/request';
import { withRouter } from 'react-router';

const Payment = (props) => {
    const { history } = props;

    const commonInfo = useAppStore("commonInfo");
    const [submitValue, setSubmitValue] = useState<PaymentOnlineEntityPost>();
    const handleChange = (e, type) => {
        const value = e.target.value;

        setSubmitValue({
            ...submitValue,
            [type]: value
        })
    }
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
                                <RoundInput
                                    placeholder="**** **** **** ****"
                                    style={{ paddingLeft: "16px" }}
                                    onChange={(e) => { handleChange(e, 'cardNumber') }}
                                />
                            </li>
                            <li>
                                <div>
                                    <p className="payment-wrap-body-cardInfo-title">Expiry Date</p>
                                    <RoundInput
                                        placeholder="mm/yyyy"
                                        style={{ paddingLeft: "16px" }}
                                        onChange={(e) => { handleChange(e, 'expiryDate') }}
                                    />
                                </div>
                                <div>
                                    <p className="payment-wrap-body-cardInfo-title">CVV</p>
                                    <RoundInput
                                        placeholder="***"
                                        style={{ paddingLeft: "16px" }}
                                        onChange={(e) => { handleChange(e, 'cvc') }}

                                    />
                                </div>
                            </li>
                        </ul>
                        <div>
                            <RoundInput
                                placeholder="Cardoldern Name"
                                style={{ paddingLeft: "16px" }}
                                prefix={<UserOutlined />}
                                onChange={(e) => { handleChange(e, 'customerName') }}

                            />
                        </div>
                        <div>
                            <p>We accept Visa & Master Card</p>
                        </div>

                        <div>
                            <RoundButton
                                type="primary"
                                block
                                onClick={async () => {
                                    try {
                                        if (!submitValue) { return message.error("Place input pyayment information") }
                                        if (!submitValue?.cardNumber) { return message.error("Place input Card Number information") }
                                        if (!submitValue?.expiryDate) { return message.error("Place input Expiry date information") }
                                        if (!submitValue?.cvc) { return message.error("Place input CVV information") }
                                        if (!submitValue?.customerName) { return message.error("Place input Cardoldern Name information") }
                                        console.log(`submitValue`, submitValue)
                                        // 提交下单
                                        // cosnt {event} = await APIPaymentOnlineEntity(submitValue)
                                        // if(event===''){
                                        //     history.push('/home')
                                        // }
                                    } catch (err) {
                                        console.log(`APIPaymentOnlineEntity err`, err)
                                    }

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

export default withRouter(Payment)
