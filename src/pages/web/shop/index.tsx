/*
 * @Author: your name
 * @Date: 2021-03-29 09:25:46
 * @LastEditTime: 2021-04-02 19:26:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/web/shop/index.tsx
 */
import WebFooter from '@/pages/components/header/webFooter'
import WebHeader from '@/pages/components/header/webHeader'
import { Button, Rate, Input, Card, Divider } from 'antd'
import Icon, { ArrowLeftOutlined, EnvironmentOutlined, FieldTimeOutlined, SearchOutlined, CalendarOutlined } from '@ant-design/icons';
import iconchat from '@/assets/images/common/icon/icon-chat.svg'
import goodPlaceholder from '@/assets/images/common/icon/good-placeholder.svg';
import tableSvg from '@/assets/images/common/icon/table.svg'



import React, { useState } from 'react'
import style from '@/styles/theme/icon.less'
import './index.less'
import MessageModal from '@/pages/components/antd/modal/messageModal';
import AddReview from '@/pages/components/antd/modal/formModal';

const { Search } = Input;
const { Meta } = Card;
const desc = ['3.5', 'bad', 'normal', 'good', 'wonderful'];
const Shop = () => {
    const [rateValue, setrateValue] = useState(1)
    const [isOpen, setisOpen] = useState(false)
    const [issend, setissend] = useState(false)
    const suffix = (
        <SearchOutlined
            className="shop-theme-color"
        />
    );

    const onSearch = value => console.log(value);
    const handleChange = value => {
        setrateValue(value);
    };
    const addReviewClose = (type: string) => {
        setisOpen(false);
        if (type === "ok") return setissend(true);
        return setissend(false);
    }
    const sendSuccessClose = () => {
        setissend(false);
    }
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
                        <p className="shop-wrap-shopDesc-book" ><span onClick={() => setisOpen(true)}>Book a table</span></p>
                        <h1>Jungle Pizza</h1>
                        <div>
                            <span style={{ "display": "flex", "alignItems": "center" }}>
                                <Rate
                                    tooltips={desc}
                                    onChange={handleChange}
                                    value={rateValue}
                                    className="shop-theme-color"
                                />
                                {rateValue ? <span className="ant-rate-text shop-rate">{desc[rateValue - 1]}</span> : ''}
                            </span>
                            <span className="shop-reviews">
                                Reviews: 145
                            </span>
                        </div>
                        <ul>
                            <li><FieldTimeOutlined className="shop-icon" />09:00 - 21:00</li>
                            <li><EnvironmentOutlined className="shop-icon" />5 Castle St, Centre, Cork</li>
                            <li><Icon component={iconchat} className={`${style.iconFill} shop-icon`} />Online Chart</li>
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
                                style={{ "width": "45%", "paddingLeft": "2rem", "paddingRight": "2rem" }}
                                placeholder="Search"
                                size="large"
                                suffix={suffix}
                                onChange={onSearch}
                            />
                        </div>
                    </div>
                </div>
                <div className="shop-wrap-shopCategoriesList" style={{ "paddingTop": "40rem" }}>
                    <div>
                        <h1>Pizza</h1>
                        <div className="shop-wrap-shopCategoriesList-box">
                            <div>
                                <div>
                                    {/* <img width="100%" alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" /> */}
                                    <Icon
                                        component={goodPlaceholder}
                                        className={` ${style.iconFill}`}
                                        style={{ fontSize: "12rem" }}
                                    />
                                </div>
                                <div>
                                    <h3 className="intwoline">Design your Own 14’’ pizza Design your Own 14’’ pizza</h3>
                                    <h6 className="inaline">Starts from <span>€ 3 / portion</span>Design your Own 14’’ pizza</h6>
                                    <p className="inthreeline">Tomato sauce, mozzarella, parmesan, eggs, and bacon.Tomato sauce, mozzarella, parmesan, eggs, and bacon.</p>
                                    <Button className="shop-wrap-shopCategoriesList-box-button" type="primary" shape="round" block>Order</Button>
                                </div>
                            </div>
                            {/* 商品盒子 */}
                            <div>
                                <div>
                                    {/* <img width="100%" alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" /> */}
                                    <Icon
                                        component={goodPlaceholder}
                                        className={` ${style.iconFill}`}
                                        style={{ fontSize: "12rem" }}
                                    />
                                </div>
                                <div>
                                    <h3 className="intwoline">Design your Own 14’’ pizza</h3>
                                    <h6 className="inaline">Starts from <span>€ 3 / portion</span></h6>
                                    <Button className="shop-wrap-shopCategoriesList-box-button" type="primary" shape="round" block>Order</Button>
                                </div>
                            </div>
                            <div>
                                <div>
                                    {/* <img width="100%" alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" /> */}
                                    <Icon
                                        component={goodPlaceholder}
                                        className={` ${style.iconFill}`}
                                        style={{ fontSize: "12rem" }}
                                    />
                                </div>
                                <div>
                                    <h3 className="intwoline">Design your Own 14’’ pizza</h3>
                                    <h6 className="inaline">Starts from <span>€ 3 / portion</span></h6>
                                    <p className="inthreeline">Tomato sauce, mozzarella, parmesan, eggs, and bacon."</p>
                                    <Button className="shop-wrap-shopCategoriesList-box-button" type="primary" shape="round" block>Order</Button>
                                </div>
                            </div>
                            <div>
                                <div>
                                    {/* <img width="100%" alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" /> */}
                                    <Icon
                                        component={goodPlaceholder}
                                        className={` ${style.iconFill}`}
                                        style={{ fontSize: "12rem" }}
                                    />
                                </div>
                                <div>
                                    <h3 className="intwoline">Design your Own 14’’ pizza</h3>
                                    <h6 className="inaline">Starts from <span>€ 3 / portion</span></h6>
                                    <p className="inthreeline">Tomato sauce, mozzarella, parmesan, eggs, and bacon."</p>
                                    <Button className="shop-wrap-shopCategoriesList-box-button" type="primary" shape="round" block>Order</Button>
                                </div>
                            </div>
                            <div>
                                <div>
                                    {/* <img width="100%" alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" /> */}
                                    <Icon
                                        component={goodPlaceholder}
                                        className={` ${style.iconFill}`}
                                        style={{ fontSize: "12rem" }}
                                    />
                                </div>
                                <div>
                                    <h3 className="intwoline">Design your Own 14’’ pizza</h3>
                                    <h6 className="inaline">Starts from <span>€ 3 / portion</span></h6>
                                    <Button className="shop-wrap-shopCategoriesList-box-button" type="primary" shape="round" block>Order</Button>
                                </div>
                            </div>
                            <div>
                                <div>
                                    {/* <img width="100%" alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" /> */}
                                    <Icon
                                        component={goodPlaceholder}
                                        className={` ${style.iconFill}`}
                                        style={{ fontSize: "12rem" }}
                                    />
                                </div>
                                <div>
                                    <h3 className="intwoline">Design your Own 14’’ pizza</h3>
                                    <h6 className="inaline">Starts from <span>€ 3 / portion</span></h6>
                                    <Button className="shop-wrap-shopCategoriesList-box-button" type="primary" shape="round" block>Order</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 分类盒子 */}
                <div className="shop-wrap-shopCategoriesList">
                    <div>
                        <h1>Pasta</h1>
                        <div className="shop-wrap-shopCategoriesList-box">
                            <div>
                                <div>
                                    {/* <img width="100%" alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" /> */}
                                    <Icon
                                        component={goodPlaceholder}
                                        className={` ${style.iconFill}`}
                                        style={{ fontSize: "12rem" }}
                                    />
                                </div>
                                <div>
                                    <h3 className="intwoline">Design your Own 14’’ pizza Design your Own 14’’ pizza</h3>
                                    <h6 className="inaline">Starts from <span>€ 3 / portion</span>Design your Own 14’’ pizza</h6>
                                    <p className="inthreeline">Tomato sauce, mozzarella, parmesan, eggs, and bacon.Tomato sauce, mozzarella, parmesan, eggs, and bacon.</p>
                                    <Button className="shop-wrap-shopCategoriesList-box-button" type="primary" shape="round" block>Order</Button>
                                </div>
                            </div>
                            <div>
                                <div>
                                    {/* <img width="100%" alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" /> */}
                                    <Icon
                                        component={goodPlaceholder}
                                        className={` ${style.iconFill}`}
                                        style={{ fontSize: "12rem" }}
                                    />
                                </div>
                                <div>
                                    <h3 className="intwoline">Design your Own 14’’ pizza</h3>
                                    <h6 className="inaline">Starts from <span>€ 3 / portion</span></h6>
                                    <Button className="shop-wrap-shopCategoriesList-box-button" type="primary" shape="round" block>Order</Button>
                                </div>
                            </div>
                            <div>
                                <div>
                                    {/* <img width="100%" alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" /> */}
                                    <Icon
                                        component={goodPlaceholder}
                                        className={` ${style.iconFill}`}
                                        style={{ fontSize: "12rem" }}
                                    />
                                </div>
                                <div>
                                    <h3 className="intwoline">Design your Own 14’’ pizza</h3>
                                    <h6 className="inaline">Starts from <span>€ 3 / portion</span></h6>
                                    <p className="inthreeline">Tomato sauce, mozzarella, parmesan, eggs, and bacon."</p>
                                    <Button className="shop-wrap-shopCategoriesList-box-button" type="primary" shape="round" block>Order</Button>
                                </div>
                            </div>
                            <div>
                                <div>
                                    {/* <img width="100%" alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" /> */}
                                    <Icon
                                        component={goodPlaceholder}
                                        className={` ${style.iconFill}`}
                                        style={{ fontSize: "12rem" }}
                                    />
                                </div>
                                <div>
                                    <h3 className="intwoline">Design your Own 14’’ pizza</h3>
                                    <h6 className="inaline">Starts from <span>€ 3 / portion</span></h6>
                                    <p className="inthreeline">Tomato sauce, mozzarella, parmesan, eggs, and bacon."</p>
                                    <Button className="shop-wrap-shopCategoriesList-box-button" type="primary" shape="round" block>Order</Button>
                                </div>
                            </div>
                            <div>
                                <div>
                                    {/* <img width="100%" alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" /> */}
                                    <Icon
                                        component={goodPlaceholder}
                                        className={` ${style.iconFill}`}
                                        style={{ fontSize: "12rem" }}
                                    />
                                </div>
                                <div>
                                    <h3 className="intwoline">Design your Own 14’’ pizza</h3>
                                    <h6 className="inaline">Starts from <span>€ 3 / portion</span></h6>
                                    <Button className="shop-wrap-shopCategoriesList-box-button" type="primary" shape="round" block>Order</Button>
                                </div>
                            </div>
                            <div>
                                <div>
                                    {/* <img width="100%" alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" /> */}
                                    <Icon
                                        component={goodPlaceholder}
                                        className={` ${style.iconFill}`}
                                        style={{ fontSize: "12rem" }}
                                    />
                                </div>
                                <div>
                                    <h3 className="intwoline">Design your Own 14’’ pizza</h3>
                                    <h6 className="inaline">Starts from <span>€ 3 / portion</span></h6>
                                    <Button className="shop-wrap-shopCategoriesList-box-button" type="primary" shape="round" block>Order</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <WebFooter />
            <AddReview
                isOpen={isOpen}
                isClose={addReviewClose}
            />
            <MessageModal
                isOpen={issend}
                isClose={sendSuccessClose}
                icon={<Icon component={tableSvg} style={{ fontSize: "18rem" }} />}
                content={
                    <>
                        Your table<br />booked successfully!
                        <p className="booktableSuccess-content"><CalendarOutlined /><span style={{ marginLeft: "1rem" }} >Add to Calendar</span></p>
                    </>
                }
            />
        </>
    )
}

export default Shop
