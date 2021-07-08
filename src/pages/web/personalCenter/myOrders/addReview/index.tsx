import React, { useEffect, useState } from 'react'
import { Rate, Modal, Input, Button, Spin } from 'antd';
import { LikeOutlined, DislikeOutlined, } from '@ant-design/icons';
import { OrderDetailResponse, OrderEvaluateSavePost } from '@/pages/api/types';
import { APIOrderDetail, APIOrderEvaluateSave } from '@/pages/api/request';
import style from '@/styles/theme/icon.less'

import './index.less'


const { TextArea } = Input;
const AddReview = (props) => {
    const { isOpen, isClose, orderId } = props;
    const [visible, setvisible,] = useState(false)
    const [loading, setIsLoading] = useState(true)
    const [data, setData] = useState<OrderDetailResponse>();
    const [shopRateValue, setShopRateValue] = useState<number>(0);
    const [remarkValue, setRemarkValue] = useState<string>('');
    const [goodRateValue, setGoodRateValue] = useState<any>();

    useEffect(() => {
        setvisible(isOpen);
    }, [isOpen])

    const handleOk = async (e) => {
        try {
            const sumbmit: OrderEvaluateSavePost = {
                id: data.id,
                rate: shopRateValue,
                review: remarkValue,
                goodsList: Object.values(goodRateValue)
            }
            console.log(sumbmit)

            await APIOrderEvaluateSave(sumbmit)
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
    const handleChange = (value, type) => {
        if (type === 'shopRate') {
            setShopRateValue(value)
        } else if (type === 'remark') {
            setRemarkValue(value.target.value)
        }
    }
    const handleClickGoodRate = (item, value, otherValue) => {
        if (goodRateValue[item.id].rate === 0 || goodRateValue[item.id].rate === otherValue) {
            setGoodRateValue({
                ...goodRateValue,
                [item.id]: {
                    "rate": value,
                    "userOrderDetailId": item.userOrderDetailId
                }
            })
        } else {
            setGoodRateValue({
                ...goodRateValue,
                [item.id]: {
                    "rate": 0,
                    "userOrderDetailId": item.userOrderDetailId
                }
            })
        }
    }



    useEffect(() => {
        setIsLoading(true)
        async function fetchDetails() {
            const { data } = await APIOrderDetail({ id: orderId });
            setData(data);
            setIsLoading(false)
            // 初始化评分数据
            let rateList = {};
            data?.goodsList.map((item) => {
                rateList = {
                    ...rateList,
                    [item.id]: { rate: 0, userOrderDetailId: 0 }
                }
            })
            setGoodRateValue(rateList)
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
                                data?.goodsList.map((item, index) => {
                                    return (
                                        <li key={item.id}>
                                            <p>{item.title}</p>
                                            <div style={{ width: "20%", "justifyContent": "flex-end" }}>
                                                <LikeOutlined
                                                    className={goodRateValue && goodRateValue[item.id] && (goodRateValue[item.id]).rate === 1 ? style.themeColor : ""}
                                                    onClick={() => handleClickGoodRate(item, 1, -1)}
                                                />
                                                <DislikeOutlined
                                                    style={{ marginLeft: "1rem" }}
                                                    className={goodRateValue && goodRateValue[item.id] && (goodRateValue[item.id]).rate === -1 ? style.themeColor : ""}
                                                    onClick={() => handleClickGoodRate(item, -1, 1)}
                                                />
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
