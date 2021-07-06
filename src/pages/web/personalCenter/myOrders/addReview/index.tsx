import React, { useEffect, useState } from 'react'
import { Rate, Modal, Input, Button, Spin } from 'antd';
import './index.less'
import { OrderDetailResponse, OrderEvaluateSavePost } from '@/pages/api/types';
import { APIOrderDetail, APIOrderEvaluateSave } from '@/pages/api/request';

const { TextArea } = Input;
const AddReview = (props) => {
    const { isOpen, isClose, orderId } = props;
    const [visible, setvisible,] = useState(false)
    const [loading, setIsLoading] = useState(true)
    const [data, setData] = useState<OrderDetailResponse>();
    const [shopRateValue, setShopRateValue] = useState<number>(0);
    const [remarkValue, setRemarkValue] = useState<string>('');
    const [goodRateValue, setGoodRateValue] = useState<{
        string: {
            "rate": number,
            "userOrderDetailId": number
        }
    }>();
    const [goodsRateUp, setGoodsRateUp] = useState(false)
    const [goodsRateDown, setGoodsRateDown] = useState(false)



    useEffect(() => {
        setvisible(isOpen);
    }, [isOpen])

    const handleOk = async (e) => {
        console.log(e);
        try {
            const sumbmit = {
                id: data.id,
                rate: shopRateValue,
                review: remarkValue,
                goodsList: Object.values(goodRateValue)
            }
            console.log(sumbmit)

            // await APIOrderEvaluateSave(sumbmit)
            setvisible(false);
            isClose("ok");
        } catch (err) {
            console.log(err)
        }
    }
    const handleCancel = (e) => {
        console.log(e);
        setvisible(false);
        isClose("cancel");
    }
    const handleChange = (value, type, good?: any) => {
        if (type === 'shopRate') {
            setShopRateValue(value)
        } else if (type === 'remark') {
            setRemarkValue(value.target.value)
        } else if (type === 'goodsRateUp') {
            const result = {
                ...goodRateValue,
                [good?.id]: {
                    rate: value,
                    userOrderDetailId: good?.userOrderDetailId
                }
            }
            setGoodRateValue(result)

            console.log(result)
        } else if (type === 'goodsRateDown') {
            const result = {
                ...goodRateValue,
                [good?.id]: {
                    rate: value,
                    userOrderDetailId: good?.userOrderDetailId
                }
            }
            setGoodRateValue(result)

            console.log(result)
        }
    }



    useEffect(() => {
        setIsLoading(true)
        async function fetchDetails() {
            const { data } = await APIOrderDetail({ id: orderId });
            setData(data);
            setIsLoading(false)
        }
        if (orderId !== 0) {
            fetchDetails();
        }
    }, [orderId])

    return (
        <div>
            <Modal
                visible={visible}
                onCancel={handleCancel}
                footer={null}
            >
                <Spin spinning={loading}>
                    <div className="model-content">
                        <header>Add a Review</header>
                        <div className="model-content-rate">
                            <h1>{data?.shop.name}</h1>
                            <Rate style={{ fontSize: "2rem" }} onChange={(value) => { handleChange(value, 'shopRate') }} />
                        </div>
                        <ul>
                            {
                                data?.goodsList.map((item) => {
                                    return (
                                        <li key={item.id}>
                                            <p>{item.title}</p>
                                            <div style={{ width: "20%", "justifyContent": "flex-end" }}>
                                                <span>
                                                    <Rate
                                                        count={1}
                                                        style={{ fontSize: "2rem" }}
                                                        onChange={(value) => { handleChange(value, 'goodsRateUp', item) }} />
                                                </span>
                                                <span>
                                                    <Rate
                                                        count={1}
                                                        style={{ fontSize: "2rem" }}
                                                        onChange={(value) => { handleChange(value, 'goodsRateDown', item) }} />
                                                </span>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <div>
                            <TextArea rows={6} placeholder="Write your review" onChange={(value) => { handleChange(value, 'remark') }} />
                        </div>
                        <div className="model-content-action">
                            <Button shape="round" style={{ "marginRight": "0.5rem" }} onClick={handleCancel}>Cancel</Button>
                            <Button shape="round" type="primary" onClick={handleOk}>Send</Button>
                        </div>
                    </div>
                </Spin>
            </Modal>
        </div>
    )
}

export default AddReview
