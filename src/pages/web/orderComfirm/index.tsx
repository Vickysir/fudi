import WebFooter from '@/pages/components/header/webFooter'
import WebHeader from '@/pages/components/header/webHeader'
import OrderDetailsList, { TotalStructure } from '../../components/orderDetailsList'
import { Button, Form, message, Radio, Row, Tag } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import React, { useEffect, useState } from 'react'
import './index.less'
import { APIGetCartList, APIOrderSubmit } from '@/pages/api/request';
import TextArea from 'antd/lib/input/TextArea';
import RoundButton from '@/pages/components/antd/button';
import DeliveryCom from './delivery';
import CollectCom from './collect';
import { useAppStore } from '@/__internal';
import { COUPONTYPE_DELIVERYFEE, COUPONTYPE_FOOD, COUPON_DISCOUNTTYPE_DISCOUNTED_EXCEPT, deliveryOption, DELIVERYTYPE_COLLECTION, DELIVERYTYPE_DELIVERY, moneyType, MONEYTYPE_DEDUCT, MONEYTYPE_FREE, MONEYTYPE_PERCENTAGE, orderTimeType, ORDERTIME_ASAP, paymentType, PAYMENTTYPE_OFFLINE, PAYMENTTYPE_ONLINE } from '@/utils/constant';
import { OrderOtherInfoFormData } from './components';
import OrderForVoucherModal from '@/pages/components/antd/modal/orderForVoucherModal';
import { withRouter } from 'react-router';
import { CollectionInfo, DeliveryInfo, OrderCoupon, UserOrderBasicSubmit } from '@/pages/api/types';
import moment from 'moment';
import { create, all } from 'mathjs'
import style from '@/styles/theme/icon.less'



const config = {
    number: 'BigNumber',
    precision: 20
}
const math = create(all, config)
const OrderComfirm = (props) => {
    const { history } = props;
    const [refreshHeaderCart, setRefreshHeaderCart] = useState(0);
    const [total, setTotal] = useState("0");
    const [otherOrderInfo, setOtherOrderInfo] = useState<DeliveryInfo | CollectionInfo>();
    const [isOrderForVoucherModal, setisOrderForVoucherModal] = useState(false);
    const [totalStructure, setTotalStructure] = useState<TotalStructure[]>([])
    const [voucher, setVoucher] = useState<OrderCoupon>(undefined)
    const [voucherIsVisitable, setVoucherIsVisitable] = useState(true)
    const [fee, setFee] = useState<number>(0)
    const [form] = Form.useForm();
    const commonInfo = useAppStore("commonInfo");

    const shopId = commonInfo?.shopId;
    const orderType = commonInfo?.orderType;
    const basicRequireSubmint: Partial<UserOrderBasicSubmit> = {
        shopId,
        diningType: orderType,
    }


    const getOtherOrderInfo = (params: OrderOtherInfoFormData) => {

        let otherOrderInfo;
        const { timeType } = params
        if (orderType === DELIVERYTYPE_DELIVERY) {
            // diningType 为 delivery
            otherOrderInfo = {
                contactName: params.consignee,
                contactNumber: params.phone,
                deliveryTime: timeType === ORDERTIME_ASAP ? orderTimeType.get(timeType) : moment(params.diningTime).format("HH:mm"),
                deliveryOption: params?.orderOption.label
            }

        }
        if (orderType === DELIVERYTYPE_COLLECTION) {
            // diningType 为 collection
            otherOrderInfo = {
                contactName: params.consignee,
                contactNumber: params.phone,
                deliveryTime: timeType === ORDERTIME_ASAP ? orderTimeType.get(timeType) : moment(params.diningTime).format("HH:mm")
            }
        }
        setOtherOrderInfo(otherOrderInfo);
    }
    const orderForVoucherModalClose = () => {
        setisOrderForVoucherModal(false);
    };
    const getOrderInfo = (data, type) => {
        if (type === "totalStructure") {
            console.log(`totalStructure`, data)
            setTotalStructure(data)
        }
        if (type === "voucher") {
            console.log(`voucherData`, data)
            if (data?.id) {
                setVoucherIsVisitable(false);
            }
            setVoucher(data)
        }
        if (type === "fee") {
            console.log(`fee`, data)
            setFee(data)
        }
    };
    const handleUseVoucher = (totalStructure: TotalStructure[], voucher: OrderCoupon) => {
        let totalPrice = '0';
        let undisCountTotalPrice = '0';
        let disCountTotalPrice = '0';

        totalStructure?.map((item) => {
            undisCountTotalPrice = math.format(math.chain(math.bignumber(item.basicPricePart)).add(math.bignumber(undisCountTotalPrice)).done());
            disCountTotalPrice = math.format(math.chain(math.bignumber(item.discountPricePart)).add(math.bignumber(disCountTotalPrice)).done());
        })
        console.log(`undisCountTotalPrice`, undisCountTotalPrice)
        console.log(`disCountTotalPrice`, disCountTotalPrice)
        if (voucher?.type === COUPONTYPE_DELIVERYFEE) { // 运费的优惠券，则不抵扣商品金额
            totalPrice = math.format(math.chain(math.bignumber(undisCountTotalPrice)).add(math.bignumber(disCountTotalPrice)).done());
            return totalPrice
        }

        // 优惠券限制 
        // - discountType = 0, 不包含打折的商品；= 1，全部商品
        // - money: moneyType = 0，为折扣的金额；如果moneyType=1折扣的百分比，值为0-1，=0.8则表示打8折，有20%的优惠；
        // - moneyType = 0,直接从价格中扣除，=1按照百分百扣除，=2全部免费

        if (voucher.discountType === COUPON_DISCOUNTTYPE_DISCOUNTED_EXCEPT) {// 不包含打折的商品
            if (voucher.moneyType === MONEYTYPE_DEDUCT) { // 直接从价格中扣除
                let undisCountPart = math.format(math.chain(math.bignumber(undisCountTotalPrice)).subtract(math.bignumber(voucher.money)).done());
                if (Number(undisCountPart) <= 0) {
                    undisCountPart = '0'
                }
                totalPrice = math.format(math.chain(math.bignumber(undisCountPart)).add(math.bignumber(disCountTotalPrice)).done());
            } else if (voucher.moneyType === MONEYTYPE_PERCENTAGE) { // 按照百分百扣除
                totalStructure?.map((item) => {
                    let undisCountPart = math.format(math.chain(math.bignumber(undisCountTotalPrice)).multiply(math.bignumber(voucher.money)).done());
                    if (Number(undisCountPart) <= 0) {
                        undisCountPart = '0'
                    }
                    totalPrice = math.format(math.chain(math.bignumber(undisCountPart)).add(math.bignumber(disCountTotalPrice)).done());
                })

            } else if (voucher.moneyType === MONEYTYPE_FREE) { // 除去打折商品的部分，原价商品全部免费
                totalStructure?.map((item) => {
                    totalPrice = math.format(math.chain(math.bignumber(0)).add(math.bignumber(disCountTotalPrice)).done());
                })
            }
        } else { // 全部商品都可以使用优惠券
            totalPrice = math.format(math.chain(math.bignumber(undisCountTotalPrice)).add(math.bignumber(disCountTotalPrice)).done());

            if (voucher.moneyType === MONEYTYPE_DEDUCT) { // 直接从价格中扣除
                totalPrice = math.format(math.chain(math.bignumber(totalPrice)).subtract(math.bignumber(voucher.money)).done());
                if (Number(totalPrice) <= 0) {
                    totalPrice = '0'
                }

            } else if (voucher.moneyType === MONEYTYPE_PERCENTAGE) { // 按照百分百扣除
                totalPrice = math.format(math.chain(math.bignumber(totalPrice)).multiply(math.bignumber(voucher.money)).done());
                if (Number(totalPrice) <= 0) {
                    totalPrice = '0'
                }
            } else if (voucher.moneyType === MONEYTYPE_FREE) {
                totalPrice = '0'
            }

        }

        return totalPrice
    }

    const handleCaculateTotalPrice = (totalStructure: TotalStructure[], fee: number, voucher: OrderCoupon) => {
        if (voucher === undefined) {
            // 未使用优惠券
            let totalPrice = '0';
            totalStructure?.map((item) => {
                totalPrice = math.format(math.chain(math.bignumber(item.basicPricePart)).add(math.bignumber(item.discountPricePart)).add(math.bignumber(totalPrice)).done());
            })
            // 是否要加上运费
            if (orderType === DELIVERYTYPE_DELIVERY) {
                totalPrice = math.format(math.chain(math.bignumber(totalPrice)).add(math.bignumber(fee)).done());
                setTotal(totalPrice);
                return
            }
            setTotal(totalPrice);
            return

        } else {
            // 使用优惠券
            let totalPrice = '0';
            totalPrice = handleUseVoucher(totalStructure, voucher);
            // 是否需要加上运费
            if (orderType === DELIVERYTYPE_DELIVERY) {
                totalPrice = math.format(math.chain(math.bignumber(totalPrice)).add(math.bignumber(fee)).done());
                setTotal(totalPrice);
                return
            }
            setTotal(totalPrice);
            return

        }

    }
    useEffect(() => {
        handleCaculateTotalPrice(totalStructure, fee, voucher);
    }, [totalStructure, fee, voucher])

    const formatDeleverySubmit = (params) => {
        const CouponId = params?.voucher?.realm === 0 ? params?.voucher?.id : params?.voucher?.couponId;

        let data = {
            deliveryTime: params?.deliveryTime,
            diningType: params?.diningType,
            notes: params?.notes,
            paymentType: params?.paymentType,
            shopId: params?.shopId,
            collection: {
                contactName: params?.contactName,
                contactNumber: params?.contactNumber,
            },
            userGoodsCouponId: undefined,
            userFreightCouponId: undefined,
            couponRealm: params?.voucher?.realm,

            deliveryOption: params?.deliveryOption,
            userShippingAddress: {
                id: commonInfo?.deliveryAddressId,
            },
        }
        if (params?.voucher?.type === COUPONTYPE_FOOD) {
            data.userGoodsCouponId = CouponId;
        } else {
            data.userFreightCouponId = CouponId;
        }

        return data
    }
    const formatColoctionSubmit = (params) => {
        const CouponId = params?.voucher?.realm === 0 ? params?.voucher?.id : params?.voucher?.couponId;
        let data = {
            deliveryTime: params?.deliveryTime,
            diningType: params?.diningType,
            notes: params?.notes,
            paymentType: params?.paymentType,
            shopId: params?.shopId,
            collection: {
                contactName: params?.contactName,
                contactNumber: params?.contactNumber,
            },
            userGoodsCouponId: undefined,
            userFreightCouponId: undefined,
            couponRealm: params?.voucher?.realm,
        }
        if (params?.voucher?.type === COUPONTYPE_FOOD) {
            data.userGoodsCouponId = CouponId;
        } else {
            data.userFreightCouponId = CouponId;
        }

        return data
    }
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
                        <OrderDetailsList comfirmBtn={false} orderListPrice={(data) => { getOrderInfo(data, "totalStructure") }} />
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
                                        <Radio.Group buttonStyle="solid" >
                                            <Radio.Button value={PAYMENTTYPE_OFFLINE}>{paymentType.get(PAYMENTTYPE_OFFLINE)}</Radio.Button>
                                            <Radio.Button value={PAYMENTTYPE_ONLINE}>{paymentType.get(PAYMENTTYPE_ONLINE)}</Radio.Button>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Tag
                                        closable
                                        visible={!voucherIsVisitable}
                                        onClose={() => { setVoucherIsVisitable(true); setVoucher(undefined) }}
                                        className="voucher"
                                    >
                                        {voucher?.title}
                                    </Tag>
                                    {
                                        voucherIsVisitable && <span style={{ "cursor": "pointer" }} onClick={() => setisOrderForVoucherModal(true)}>+ Add Voucher</span>
                                    }
                                </Row>
                            </Form.Item>
                            <Form.Item>
                                <RoundButton
                                    type="primary"
                                    block
                                    onClick={async () => {
                                        let submit;

                                        if (orderType === DELIVERYTYPE_DELIVERY) {
                                            submit = formatDeleverySubmit({
                                                ...basicRequireSubmint,
                                                ...form.getFieldsValue(),
                                                ...otherOrderInfo,
                                                voucher
                                            });
                                        } else {
                                            submit = formatColoctionSubmit({
                                                ...basicRequireSubmint,
                                                ...form.getFieldsValue(),
                                                ...otherOrderInfo,
                                                voucher
                                            });

                                        }
                                        console.log(`联合表单`, submit)

                                        if (submit.paymentType === PAYMENTTYPE_ONLINE) {
                                            // TODO payment 0 为online ,保存订单号
                                            const { data } = await APIOrderSubmit(submit)
                                            console.log(`APIOrderSubmit`, data)
                                            APP_STORE.commonInfo = {
                                                ...APP_STORE.commonInfo,
                                                userOrderId: data?.id
                                            };
                                            history.push("/home/payment");
                                        } else {
                                            // TODO payment 1 为现金直接下单
                                            const { event } = await APIOrderSubmit(submit);
                                            if (event === 'SUCCESS') {
                                                message.success("Successfully ordered")
                                                history.push("/home");
                                            }
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
                            Number(orderType) === DELIVERYTYPE_DELIVERY
                                ? <DeliveryCom
                                    setFormData={getOtherOrderInfo}
                                    setDeliverFee={(data) => { getOrderInfo(data, 'fee') }}
                                    voucher={voucher}
                                />
                                : <CollectCom shopId={shopId} setFormData={getOtherOrderInfo} />
                        }
                    </div>
                    <OrderForVoucherModal
                        isOpen={isOrderForVoucherModal}
                        isClose={orderForVoucherModalClose}
                        shopId={Number(1)}
                        finishFn={(data) => { getOrderInfo(data, 'voucher') }}
                        totalStructure={totalStructure}
                    />
                </div>
            </div>
        </div>
    )
}

export default withRouter(OrderComfirm)
