import WebFooter from '@/pages/components/header/webFooter'
import WebHeader from '@/pages/components/header/webHeader'
import OrderDetailsList from '../../components/orderDetailsList'
import { Button, Form, Radio, Row } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import React, { useEffect, useState } from 'react'
import './index.less'
import { APIGetCartList, APIOrderSubmit } from '@/pages/api/request';
import TextArea from 'antd/lib/input/TextArea';
import RoundButton from '@/pages/components/antd/button';
import DeliveryCom from './delivery';
import CollectCom from './collect';
import { useAppStore } from '@/__internal';
import { deliveryOption, DELIVERYTYPE_COLLECTION, DELIVERYTYPE_DELIVERY, paymentType, PAYMENTTYPE_OFFLINE, PAYMENTTYPE_ONLINE } from '@/utils/constant';
import { OrderOtherInfoFormData } from './components';
import OrderForVoucherModal from '@/pages/components/antd/modal/orderForVoucherModal';
import { withRouter } from 'react-router';
import { CollectionInfo, DeliveryInfo, UserOrderBasicSubmit } from '@/pages/api/types';
import moment from 'moment';

const OrderComfirm = (props) => {
    const { history } = props;
    const [refreshHeaderCart, setRefreshHeaderCart] = useState(0);
    const [total, setTotal] = useState("0");
    const [otherOrderInfo, setOtherOrderInfo] = useState<DeliveryInfo | CollectionInfo>();
    const [isOrderForVoucherModal, setisOrderForVoucherModal] = useState(false);
    const [form] = Form.useForm();
    const commonInfo = useAppStore("commonInfo");

    const shopId = commonInfo?.shopId;
    const orderType = commonInfo?.orderType;
    const basicRequireSubmint: Partial<UserOrderBasicSubmit> = {
        shopId,
        diningType: orderType,
    }

    const getOrderListPrice = (total) => {
        setTotal(total)
    }
    const getOtherOrderInfo = (params: OrderOtherInfoFormData) => {
        let otherOrderInfo;
        //TODO 处理需要提交的表单数据
        if (orderType === DELIVERYTYPE_DELIVERY) {
            //TODO diningType 为 delivery
            otherOrderInfo = {
                deliveryTime: moment(params.diningTime).format("HH:mm")
            }

        }
        if (orderType === DELIVERYTYPE_COLLECTION) {
            //TODO diningType 为 collection
            otherOrderInfo = {
                contactName: params.consignee,
                contactNumber: params.phone,
                deliveryTime: moment(params.diningTime).format("HH:mm")
            }
        }
        console.log(`params`, params)
        setOtherOrderInfo(otherOrderInfo);
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
                            initialValues={{ paymentType: PAYMENTTYPE_OFFLINE }}
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
                                    <Form.Item noStyle name="paymentType">
                                        <Radio.Group onChange={(e) => {
                                            console.log(`e.target.value`, e.target.value)
                                            form.setFieldsValue({ "paymentType": e.target.value });
                                        }} buttonStyle="solid" >
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
                                    onClick={async () => {
                                        const submit = {
                                            ...basicRequireSubmint,
                                            ...form.getFieldsValue(),
                                            collection: { ...otherOrderInfo },
                                        }
                                        console.log(`联合表单`, submit)

                                        if (submit.paymentType === PAYMENTTYPE_ONLINE) {
                                            // TODO payment 0 为online ,保存订单号
                                            // const {data} = await APIOrderSubmit(submit)
                                            // console.log(`APIOrderSubmit`, data)
                                            // APP_STORE.commonInfo = {
                                            //     ...APP_STORE.commonInfo,
                                            //     userOrderId:''
                                            // };
                                            history.push("/home/payment");
                                        } else {
                                            // TODO payment 1 为现金直接下单
                                            // await APIOrderSubmit(submit)
                                            history.push("/home");
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
