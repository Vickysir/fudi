import WebFooter from '@/pages/components/header/webFooter'
import WebHeader from '@/pages/components/header/webHeader'
import OrderDetailsList from '../../components/orderDetailsList'
import { Button, Form, Radio, Row } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import React, { useEffect, useState } from 'react'
import './index.less'
import { APIGetCartList } from '@/pages/api/request';
import TextArea from 'antd/lib/input/TextArea';
import RoundButton from '@/pages/components/antd/button';
import DeliveryCom from './delivery';
import CollectCom from './collect';
import { useAppStore } from '@/__internal';
import { DELIVERYTYPE_DELIVERY, paymentType, PAYMENTTYPE_OFFLINE, PAYMENTTYPE_ONLINE } from '@/utils/constant';
import { OrderOtherInfoFormData } from './components';
import OrderForVoucherModal from '@/pages/components/antd/modal/orderForVoucherModal';
import { withRouter } from 'react-router';

const OrderComfirm = (props) => {
    const { history } = props;
    const [refreshHeaderCart, setRefreshHeaderCart] = useState(0);
    const [total, setTotal] = useState("0");
    const [otherOrderInfo, setOtherOrderInfo] = useState<OrderOtherInfoFormData>();
    const [isOrderForVoucherModal, setisOrderForVoucherModal] = useState(false);
    const [form] = Form.useForm();
    const commonInfo = useAppStore("commonInfo");

    const orderType = commonInfo?.orderType;
    const shopId = commonInfo?.shopId;

    const getOrderListPrice = (total) => {
        setTotal(total)
    }
    const getOtherOrderInfo = (params: OrderOtherInfoFormData) => {
        console.log(`params`, params)
        setOtherOrderInfo(params);
    }
    const orderForVoucherModalClose = () => {
        setisOrderForVoucherModal(false);
    };
    const setDataFn = (data) => {
        const voucherData = {
            ...data
        }
        console.log(`voucherData`, voucherData)
    };

    return (
        <div>
            <div className="orderComfirm-wrap">
                <div className="orderComfirm-wrap-header">
                    <Button
                        // className="shop-wrap-banner-button"
                        type="primary"
                        shape="round"
                        onClick={() => { history.go(-1) }}
                    >
                        <ArrowLeftOutlined />Back
                        </Button>
                </div>
                <div className="orderComfirm-wrap-body">
                    <div>
                        <h1>Confirm Order</h1>
                        <OrderDetailsList comfirmBtn={false} orderListPrice={getOrderListPrice} />
                        <Form
                            form={form}
                            layout="vertical"
                            initialValues={{ payment: PAYMENTTYPE_OFFLINE }}
                            style={{ margin: "1rem 2rem" }}
                        >

                            <Form.Item noStyle>
                                <div className="orderComfirm-wrap-body-form-title">notes</div>
                            </Form.Item>
                            <Form.Item
                                name="notes"
                                label="notes"
                                noStyle
                            >
                                <TextArea />
                            </Form.Item>
                            <Form.Item noStyle>
                                <div className="orderComfirm-wrap-body-form-title">Payment Method</div>
                            </Form.Item>
                            <Form.Item
                                noStyle
                            >
                                <Row className="orderComfirm-wrap-body-form-payment">
                                    <Form.Item noStyle name="payment">
                                        <Radio.Group buttonStyle="solid">
                                            <Radio.Button value={PAYMENTTYPE_OFFLINE}>{paymentType.get(PAYMENTTYPE_OFFLINE)}</Radio.Button>
                                            <Radio.Button value={PAYMENTTYPE_ONLINE}>{paymentType.get(PAYMENTTYPE_ONLINE)}</Radio.Button>
                                        </Radio.Group>
                                    </Form.Item>
                                    <span style={{ "cursor": "pointer" }} onClick={() => setisOrderForVoucherModal(true)}>+ Add Voucher</span>
                                </Row>
                            </Form.Item>
                            <Form.Item>
                                <RoundButton
                                    type="primary"
                                    block
                                    onClick={() => {
                                        // TODO payment 为现金直接下单
                                        // TODO payment 为online ,需要填写银行卡
                                        const submit = {
                                            ...otherOrderInfo,
                                            ...form.getFieldsValue()
                                        }
                                        console.log(`联合表单`, submit)
                                        if (submit.payment === PAYMENTTYPE_ONLINE) {
                                            history.push("/home/payment");
                                        }
                                    }}
                                    style={{ marginTop: "4rem" }}
                                >
                                    Pay Now € {total}
                                </RoundButton>
                            </Form.Item>
                        </Form>
                    </div>
                    <div>
                        {
                            Number(orderType) === DELIVERYTYPE_DELIVERY ? <DeliveryCom setFormData={getOtherOrderInfo} /> : <CollectCom shopId={shopId} setFormData={getOtherOrderInfo} />
                        }
                    </div>
                    <OrderForVoucherModal
                        isOpen={isOrderForVoucherModal}
                        isClose={orderForVoucherModalClose}
                        shopId={Number(1)}
                        finishFn={setDataFn}
                    />
                </div>
            </div>
        </div>
    )
}

export default withRouter(OrderComfirm)
