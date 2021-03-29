/*
 * @Author: your name
 * @Date: 2021-03-29 09:25:46
 * @LastEditTime: 2021-03-29 11:44:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/web/shop/index.tsx
 */
import WebFooter from '@/pages/components/header/webFooter'
import WebHeader from '@/pages/components/header/webHeader'
import { Button, Rate, Input, Card } from 'antd'
import Icon, { ArrowLeftOutlined, EnvironmentOutlined, FieldTimeOutlined, SearchOutlined } from '@ant-design/icons';
import iconchat from '@/assets/images/common/icon/icon-chat.svg'

import React, { useState } from 'react'
import style from '@/styles/theme/icon.less'
import './index.less'

const { Search } = Input;
const { Meta } = Card;
const desc = ['3.5', 'bad', 'normal', 'good', 'wonderful'];
const Shop = () => {
    const [rateValue, setrateValue] = useState(1)
    const suffix = (
        <SearchOutlined
            style={{
                fontSize: 16,
                color: '#1890ff',
            }}
        />
    );

    const onSearch = value => console.log(value);
    const handleChange = value => {
        setrateValue(value);
    };
    return (
        <>
            <WebHeader />
            <div className="shop-wrap">
                <div className="shop-wrap-banner">
                    <Button
                        className="shop-wrap-banner-button"
                        type="primary"
                        shape="round"
                    >
                        <ArrowLeftOutlined />Back to Homepage
                    </Button>
                    {/* <img src="" alt="banner" /> */}
                </div>
                <div className="shop-wrap-shopDesc">
                    <div className="shop-wrap-shopDesc-box">
                        <h1>Jungle Pizza</h1>
                        <div>
                            <span style={{ "display": "flex", "alignItems": "center" }}>
                                <Rate
                                    tooltips={desc}
                                    onChange={handleChange}
                                    value={rateValue}
                                />
                                {rateValue ? <span className="ant-rate-text shop-rate">{desc[rateValue - 1]}</span> : ''}
                            </span>
                            <span className="shop-reviews">
                                Reviews: 145
                            </span>
                        </div>
                        <ul>
                            <li><FieldTimeOutlined />09:00 - 21:00</li>
                            <li><EnvironmentOutlined />5 Castle St, Centre, Cork</li>
                            <li><Icon component={iconchat} className={style.iconFill} />Online Chart</li>
                        </ul>
                    </div>
                    <div className="shop-wrap-shopDesc-search">
                        <div>
                            <Button type="primary" size="large" shape="round">Pizza</Button>
                            <Button size="large" shape="round">Pasta</Button>
                            <Button size="large" shape="round">Salads</Button>
                            <Button size="large" shape="round">Drinks</Button>
                            <Button size="large" shape="round">Sauces</Button>
                        </div>
                        <div style={{ "width": "100%", "textAlign": "center" }}>
                            <Input
                                style={{ "width": "30%" }}
                                placeholder="input search text"
                                size="large"
                                suffix={suffix}
                                onChange={onSearch}
                            />
                        </div>
                    </div>
                </div>
                <div className="shop-wrap-shopCategoriesList">
                    <div>
                        <h1>Pizza</h1>
                        <div>
                            <Card
                                hoverable
                                style={{ width: 240 }}
                                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                            >
                                <Meta title="Design your Own 14’’ pizza" description="Starts from € 3 / portion" />
                                <Button type="primary" size="large" shape="round">Order</Button>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            <WebFooter />
        </>
    )
}

export default Shop
