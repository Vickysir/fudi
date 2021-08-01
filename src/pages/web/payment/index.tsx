

import React, { useEffect, useState } from 'react'
import { Button, Form, Input, message, Radio, Row } from 'antd';
import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';
import { useAppStore } from '@/__internal';
import './index.less'
import RoundButton from '@/pages/components/antd/button';
import RoundInput from '@/pages/components/antd/input';
import { PaymentOnlineEntityPost } from '@/pages/api/types';
import { APIPaymentEncryptRsa, APIPaymentOnlineCheck, APIPaymentOnlineEntity } from '@/pages/api/request';
import { withRouter } from 'react-router';
import JSEncrypt from 'jsencrypt';

const Payment = (props) => {
    const { history } = props;
    const commonInfo = useAppStore("commonInfo");
    const [submitValue, setSubmitValue] = useState<PaymentOnlineEntityPost>();
    const [publicKey, setPublicKey] = useState('');
    const id = commonInfo?.userOrderId


    const handleChange = (e, type) => {
        const value = e.target.value;

        setSubmitValue({
            ...submitValue,
            userOrderId: commonInfo?.userOrderId,
            [type]: value
        })
    }
    useEffect(() => {
        async function fetch() {
            try {
                const { event, data } = await APIPaymentEncryptRsa({ userOrderId: id });
                if (event === 'SUCCESS') {
                    setPublicKey(data.publicKey);
                    setSubmitValue({
                        ...submitValue,
                        userOrderId: commonInfo?.userOrderId,
                        rsaKey: data?.rsaKey
                    })
                }
            } catch (err) {
                console.log(`APIPaymentEncryptRsa:`, err)
            }
        }
        async function PaymentCheck() {
            try {
                const { event, data } = await APIPaymentOnlineCheck({ userOrderId: id })
                if (event === 'SUCCESS' && data?.status === 1) {
                    message.info("The order has been placed, place contact customer service for more info", 5);
                    history.push('/home');
                }
            }
            catch (err) {
                console.log(`APIPaymentOnlineCheck update:`, err)
            }
        }
        // 页面刷新时需要 check 一下订单状态；
        PaymentCheck();
        fetch();
    }, [])
    function rsa_encrypt(data) {
        let encryptor = new JSEncrypt({});  // 新建JSEncrypt对象
        encryptor.setPublicKey(publicKey); // 设置公钥
        for (let i in data) {
            if (i !== 'rsaKey' && i !== 'userOrderId') {
                data[i] = (encryptor.encrypt(data[i]))
            }
        }
        return data
    }
    return (
        <div>
            <div className="payment-wrap">
                <div className="payment-wrap-header">
                    <Button
                        type="primary"
                        shape="round"
                        onClick={async () => {
                            try {
                                const { event, data } = await APIPaymentOnlineCheck({ userOrderId: id })
                                if (event === 'SUCCESS' && data?.status === 0) {
                                    history.go(-1);
                                } else if (event === 'SUCCESS' && data?.status === 1) {
                                    message.info("The order has been placed, place contact customer service for more info", 5);
                                    history.push('/home');
                                }
                            }
                            catch (err) {
                                console.log(`APIPaymentOnlineCheck back:`, err)
                            }
                        }}
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
                                        if (!submitValue?.userOrderId) { return message.error("订单号获取失败") }
                                        if (!submitValue?.rsaKey) { return message.error("rsa 获取失败") }
                                        console.log(`submitValue`, submitValue)
                                        // 提交下单
                                        const { event } = await APIPaymentOnlineEntity(rsa_encrypt(submitValue))
                                        if (event === 'SUCCESS') {
                                            message.success("Ordered Successfully")
                                            history.push('/home');
                                        }
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
