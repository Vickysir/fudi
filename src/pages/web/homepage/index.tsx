/*
 * @Author: your name
 * @Date: 2021-03-02 13:43:37
 * @LastEditTime: 2021-04-01 11:10:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /GitHub/fudi/src/pages/web/homepage/index.tsx
 */
import React, { useEffect, useState } from 'react'
import WebFooter from '@/pages/components/header/webFooter'
import WebHeader from '@/pages/components/header/webHeader'
import homeBanner from '@/assets/images/fudi/home-banner.png';
import product1 from '@/assets/images/fudi/product1_.png';
import product2 from '@/assets/images/fudi/product2_.png';
import product3 from '@/assets/images/fudi/product3_.png';
import product4 from '@/assets/images/fudi/product4_.png';
import product5 from '@/assets/images/fudi/product5_.png';
import product6 from '@/assets/images/fudi/product6_.png';
import star from '@/assets/images/common/icon/star.svg';
import shield from '@/assets/images/common/icon/shield.svg';
import gift from '@/assets/images/common/icon/gift.svg';
import ellipse from '@/assets/images/common/icon/ellipse.svg';
import Dowmloadmarket from './dowload';

import { Button, Card, Col, message, Row } from 'antd';
import Icon, { DeleteOutlined } from '@ant-design/icons';

import style from '@/styles/theme/icon.less'
import "./index.less"
import { APIShopServicePhone, APIUserAddressList } from '@/pages/api/request';
import { useAppStore } from '@/__internal';
import RoundInput from '@/pages/components/antd/input';
import RoundSelect from '@/pages/components/antd/select';
import RoundButton from '@/pages/components/antd/button';
import { DELIVERYTYPE_DELIVERY } from '@/utils/constant';
import MessageModal from '@/pages/components/antd/modal/messageModal';
import { AutoCompeteSelect } from '@/pages/components/antd/select/autoCompeteSelect';


const Homepage = () => {
    const commonInfo = useAppStore("commonInfo");
    const [orderType, setOrderType] = useState("0")
    const [deliveryIsOpen, setDeliveryIsOpen] = useState(false)
    const [deliveryList, setDeliveryList] = useState([])
    const [selectShopId, setSelectShopId] = useState(null)


    useEffect(() => {
        if (commonInfo?.shopId) {
            APIShopServicePhone(commonInfo.shopId)
                .then((res) => {
                    const { data } = res;
                    APP_STORE.commonInfo = {
                        ...APP_STORE.commonInfo,
                        shopServicePhone: data.phone
                    }
                }).catch((err) => {
                    console.log(`ShopServicePhone err`, err)
                })
        }

    }, [])
    const handleSelectChange = (value) => {
        console.log(`selected `, value);
        setOrderType(value.key)

    }
    const handleAutoCompeteSelectOnChange = (value) => {
        console.log(`selected `, value);
    }
    const handleSearch = (type) => {
        const orderType = null
        switch (type) {
            case "1":
                {

                }
                break;

            default:  //"Delivery"
                {

                }
                break;
        }
    }

    return (
        <>
            <WebHeader />
            <div className="homepage-banner">
                <img src={homeBanner} alt="banner" />
                <p>Are You Hungry?</p>
                <h3>Don’t Wait. Order Now.</h3>
                <div className="homepage-banner-search">
                    <div style={{ width: "70%" }} >
                        {/* <RoundInput /> */}
                        <AutoCompeteSelect
                            placeholder="Place Input..."
                            style={{ width: "100%" }}
                            handleAutoCompeteSelectOnChange={handleAutoCompeteSelectOnChange}
                        />
                        {
                            orderType === `${DELIVERYTYPE_DELIVERY}` ?
                                <p onClick={
                                    async () => {
                                        try {
                                            const { data } = await APIUserAddressList();
                                            if (data.length === 0) {
                                                return message.info("You don't have previous addresses")
                                            }
                                            setDeliveryIsOpen(true)
                                            setDeliveryList(data)
                                        } catch (err) {
                                            console.log(`err`, err)
                                        }
                                    }
                                }>Previous Addresses</p>
                                : null
                        }

                    </div>
                    <RoundSelect
                        style={{ width: "15rem" }}
                        type="orderType"
                        defaultValue={{ "key": "0", "value": "0", "label": "Delivery" }}
                        onChange={handleSelectChange}
                    />
                    <RoundButton
                        type="primary"
                        onClick={handleSearch}>Search</RoundButton>
                </div>
            </div>
            <div>
                <div className="homepage-recommended">
                    <h1>Taste the best food!</h1>
                    <Row>
                        <div className="homepage-recommended-img width60">
                            <img alt="product1" src={product1} />
                            <div>Pizza</div>
                        </div>
                        <div className="homepage-recommended-img width40">
                            <img alt="product2" src={product2} />
                            <div>Healthy</div>
                        </div>
                    </Row>
                    <Row>
                        <div className="homepage-recommended-img width40">
                            <img alt="product3" src={product3} />
                            <div>Fast Delivery</div>
                        </div>
                        <div className="homepage-recommended-img width60">
                            <img alt="product4" src={product4} />
                            <div>Special Offers</div>
                        </div>
                    </Row>
                    <Row>
                        <div className="homepage-recommended-img width60">
                            <img alt="product4" src={product5} />
                            <div>Delicious</div>
                        </div>
                        <div className="homepage-recommended-img width40">
                            <img alt="product3" src={product6} />
                            <div>Exclusive Recipes</div>
                        </div>
                    </Row>
                </div>
                <div className="homepage-desc">
                    <h1><span>Fudi&More</span> is your perfect choice!</h1>
                    <Row gutter={24} justify="space-around">
                        <Col span={8}>
                            <Card hoverable>
                                <div className="homepage-desc-card">
                                    <h3>Bonuses</h3>
                                    <p>The best restaurants to choose from</p>
                                    <p>Pay cash or online</p>
                                    <p> Order anytime and anywhere</p>
                                    <Icon component={ellipse} className={`homepage-desc-card-img1 ${style.iconFill}`} style={{ fontSize: "10rem" }} />
                                    <Icon component={gift} className={`homepage-desc-card-img2 ${style.homePageIconFill}`} />
                                </div>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card hoverable>
                                <div className="homepage-desc-card">
                                    <h3>Guarantee</h3>
                                    <p>The best restaurants to choose from </p>
                                    <p>Pay cash or online </p>
                                    <p> Order anytime and anywhere</p>
                                    <Icon component={ellipse} className={`homepage-desc-card-img1 ${style.iconFill}`} style={{ fontSize: "10rem" }} />
                                    <Icon component={shield} className={`homepage-desc-card-img2 ${style.homePageIconFill}`} />
                                </div>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card hoverable >
                                <div className="homepage-desc-card">
                                    <h3>Benefits</h3>
                                    <p>The best restaurants to choose from</p>
                                    <p>Pay cash or online</p>
                                    <p> Order anytime and anywhere</p>
                                    <Icon component={ellipse} className={`homepage-desc-card-img1 ${style.iconFill}`} style={{ fontSize: "10rem" }} />
                                    <Icon component={star} className={`homepage-desc-card-img2 ${style.homePageIconFill}`} />
                                </div>
                            </Card>
                        </Col>
                    </Row>
                    <Dowmloadmarket />
                </div>
            </div>
            <WebFooter />
            <MessageModal
                isOpen={deliveryIsOpen}
                isClose={() => { setDeliveryIsOpen(false) }}
                content={
                    <>
                        Previous Addresses
                        {
                            deliveryList.map((item, index) => {
                                return (
                                    <p className={item.shopId === selectShopId ? "previousAddresses-content previousAddresses-content-active" : "previousAddresses-content"} key={index} onClick={() => { setSelectShopId(item.shopId) }}>
                                        {item.detail}
                                        {/* <span><DeleteOutlined /></span> */}
                                    </p>
                                )
                            })
                        }

                        <Button type="primary" shape="round" block onClick={() => { alert(selectShopId) }}>Continue</Button>
                    </>
                }
            />
        </>
    )
}

export default Homepage

