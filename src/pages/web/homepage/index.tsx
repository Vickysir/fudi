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
import { APISaveAddress, APIShopInRange, APIShopServicePhone, APITranslatePlaceIdToLocation, APIUserAddressList } from '@/pages/api/request';
import { useAppStore } from '@/__internal';
import RoundInput from '@/pages/components/antd/input';
import RoundSelect from '@/pages/components/antd/select';
import RoundButton from '@/pages/components/antd/button';
import { DELIVERYTYPE_COLLECTION, DELIVERYTYPE_DELIVERY } from '@/utils/constant';
import MessageModal from '@/pages/components/antd/modal/messageModal';
import { AutoCompeteSelect } from '@/pages/components/antd/select/autoCompeteSelect';
import { withRouter } from 'react-router-dom';
import RoundSearchSelect from '@/pages/components/antd/select/searchSelect';
import { AddressListPostResponseArray, SaveAddressPost } from '@/pages/api/types';


const Homepage = (props) => {
    const { history } = props;
    const commonInfo = useAppStore("commonInfo");
    const [orderType, setOrderType] = useState("0")
    const [deliveryIsOpen, setDeliveryIsOpen] = useState(false)
    const [deliveryList, setDeliveryList] = useState([])
    const [selectShopId, setSelectShopId] = useState<AddressListPostResponseArray>()
    const [autoCompeteSelectValue, setAutoCompeteSelectValue] = useState(undefined)
    const [houseNumberValue, setHouseNumberValue] = useState(undefined)
    const [zipCodeValue, setZipCodeValue] = useState(undefined)

    // 该接口要知道shopId ，去请求获取 ShopServicePhone
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
        // 更新header
        APP_STORE.commonInfo = {
            ...APP_STORE.commonInfo,
            refreshCart: new Date().getTime()
        };
    }, [])
    const handleSelectChange = (value) => {
        console.log(`selected `, value);
        setOrderType(value.key)
    }
    const handleInputChange = (e, type) => {
        const value = e.target.value;
        switch (type) {
            case 'houseNumber':
                setHouseNumberValue(value);
                break;
            case 'zipCode':
                setZipCodeValue(value);
                break;
            default:
                break;
        }
        console.log(`selected `, value, type);
    }
    const handleAutoCompeteSelectOnChange = (value) => {
        setAutoCompeteSelectValue(value);
    }
    const handleSearch = async () => {
        if (!autoCompeteSelectValue) return message.error("Place select address")

        switch (Number(orderType)) {
            //"Collect"
            case DELIVERYTYPE_COLLECTION: {
                APP_STORE.commonInfo = {
                    ...APP_STORE.commonInfo,
                    orderType: DELIVERYTYPE_COLLECTION,
                    shopId: autoCompeteSelectValue,
                    refreshCart: new Date().getTime()
                };
                history.push(`/home/shop/${autoCompeteSelectValue}`)
                break;
            }

            //"Delivery"
            default:
                {
                    if (!houseNumberValue) return message.error("Place select houseNumber")
                    if (!zipCodeValue) return message.error("Place select zipCode")
                    APITranslatePlaceIdToLocation(autoCompeteSelectValue)
                        .then(function (response) {
                            return response.json();
                        })
                        .then(async function (json) {
                            try {
                                const { location } = json.results[0].geometry;
                                const detail = json.results[0].formatted_address;
                                const { data } = await APIShopInRange({ latitude: location.lat, longitude: location.lng })
                                if (!data || data.length === 0) return message.error("The address is out of our delivery range. Please input again.")
                                //save houseNumber and zipCode 
                                // TODO 接口有问题需要验证登录，补充联系人和手机信息
                                const params = { "zipCode": zipCodeValue, "consignee": "Fudi&more", "phone": "13656690321", "sex": 0, "houseNumber": houseNumberValue, "detail": detail, "region": "", latitude: location.lat, longitude: location.lng }
                                await APISaveAddress(params);

                                //再获取一遍list ，get deliveryAddressId  存起来
                                const deliveryAddressId = await handleFindAddressId(params);
                                APP_STORE.commonInfo = {
                                    ...APP_STORE.commonInfo,
                                    orderType: DELIVERYTYPE_DELIVERY,
                                    shopId: data.id,
                                    refreshCart: new Date().getTime(),
                                    deliveryAddress: autoCompeteSelectValue,
                                    deliveryAddressId,
                                    deliveryHouseNumber: houseNumberValue,
                                    deliveryZipCode: zipCodeValue,
                                };
                                history.push(`/home/shop/${data.id}`)
                            } catch (err) {
                                console.log(`APITranslatePlaceIdToLocation err`, err)
                            }
                        });

                }
                break;
        }
    }
    const initGoogleTranslateServer = (params) => {
        const google = window.google;
        const translateToLocation = (result, status) => {
            if (status != google.maps.GeocoderStatus.OK || !result) {
                alert(status);
                return;
            }
            console.log(`result`, result)

        }
        const translate = new google.maps.Geocoder();
        translate.geocode({ placeId: params }, translateToLocation)
    }
    const handleFindAddressId = async (el: SaveAddressPost) => {
        try {
            const { data } = await APIUserAddressList();
            const ids = data.map((item, index) => {
                if (item.longitude === el.longitude
                    && item.latitude === el.latitude
                    && item.houseNumber === el.houseNumber
                    && item.zipCode === el.zipCode
                    && item.detail === el.detail
                ) {
                    return item.id
                }
            })
            if (ids.length === 1) {
                return ids[0]

            } else {
                message.error('Sorry,save address error')
                throw `FindAddressId error:${ids}`;
            }

        } catch (err) {
            console.log(`APIUserAddressList err`, err)
        }

    }
    return (
        <>
            <div className="homepage-banner">
                <img src={homeBanner} alt="banner" />
                <p>Are You Hungry?</p>
                <h3>Don’t Wait. Order Now.</h3>
                <div className="homepage-banner-search">
                    <div style={{ width: "75%" }} >
                        {
                            orderType === `${DELIVERYTYPE_DELIVERY}` ?

                                (
                                    <div style={{ display: "flex", alignContent: "center", justifyContent: "space-between" }}>
                                        <div style={{ width: "60%" }}>
                                            <AutoCompeteSelect
                                                placeholder="Place input delivery address ..."
                                                style={{ width: "100%" }}
                                                handleAutoCompeteSelectOnChange={handleAutoCompeteSelectOnChange}
                                                orderType={orderType}
                                            />
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
                                        </div>
                                        <div style={{ width: "20%" }}><RoundInput placeholder="houseNumber" value={houseNumberValue} onChange={(e) => { handleInputChange(e, "houseNumber") }} /></div>
                                        <div style={{ width: "15%" }}><RoundInput placeholder="zipCode" value={zipCodeValue} onChange={(e) => { handleInputChange(e, "zipCode") }} /></div>
                                    </div>
                                )
                                :
                                <RoundSearchSelect
                                    style={{ width: "100%" }}
                                    type="collect"
                                    // needDefaultValue={true}
                                    placeholder="Place select collect address ..."
                                    onChange={handleAutoCompeteSelectOnChange}
                                />
                        }
                    </div>
                    <RoundSelect
                        style={{ width: "10rem" }}
                        type="orderType"
                        needDefaultValue={true}
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
            <MessageModal
                isOpen={deliveryIsOpen}
                isClose={() => { setDeliveryIsOpen(false) }}
                content={
                    <>
                        Previous Addresses
                        {
                            deliveryList.map((item, index) => {
                                return (
                                    <p className={item.id === selectShopId?.id ? "previousAddresses-content previousAddresses-content-active" : "previousAddresses-content"} key={index} onClick={() => { setSelectShopId(item) }}>
                                        {item.detail}
                                        {/* <span><DeleteOutlined /></span> */}
                                    </p>
                                )
                            })
                        }

                        <Button type="primary" shape="round" block onClick={() => {
                            //save deliveryAddressId houseNumber and zipCode 
                            APP_STORE.commonInfo = {
                                ...APP_STORE.commonInfo,
                                orderType: DELIVERYTYPE_DELIVERY,
                                shopId: selectShopId.shopId,
                                refreshCart: new Date().getTime(),
                                deliveryAddress: selectShopId.detail,
                                deliveryAddressId: selectShopId.id,
                                deliveryHouseNumber: selectShopId.houseNumber,
                                deliveryZipCode: selectShopId.zipCode,
                            };
                            history.push(`/home/shop/${selectShopId.shopId}`)
                        }}>Continue</Button>
                    </>
                }
            />
        </>
    )
}

export default withRouter(Homepage)

