import React from 'react'
import WebFooter from '@/pages/components/header/webFooter'
import WebHeader from '@/pages/components/header/webHeader'
import { ArrowLeftOutlined, PlusOutlined, MinusOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import SeasameSeeds from '@/assets/images/common/imgs/goodsDetails1-SeasameSeeds.svg'
import Soybeans from '@/assets/images/common/imgs/goodsDetails2-Soybeans.svg'
import Molluscs from '@/assets/images/common/imgs/goodsDetails3-Molluscs.svg'
import Crustaceans from '@/assets/images/common/imgs/goodsDetails4-Crustaceans.svg'
import './index.less'
import { Button, Divider } from 'antd';

const GoodsDetails = () => {
    return (
        <>
            <WebHeader />
            <div className="goodsDetails-wrap">
                <div className="goodsDetails-wrap-banner">
                    <div>
                        <Button
                            // className="shop-wrap-banner-button"
                            type="primary"
                            shape="round"
                        >
                            <ArrowLeftOutlined />Back to All Dishes
                        </Button>
                    </div>
                    <div>
                        {/* goods image */}
                    </div>
                </div>
                <div className="goodsDetails-wrap-product">
                    <div className="goodsDetails-wrap-product-title">
                        <h3><span>Margherita</span> <span>€ 5 / portion</span></h3>
                        <p>Pizza with tomato sauce and fresh mozzarella cheese.</p>
                        <div>
                            <img style={{ marginRight: "1rem" }} src={SeasameSeeds} alt="" />
                            <img style={{ marginRight: "1rem" }} src={Soybeans} alt="" />
                            <img style={{ marginRight: "1rem" }} src={Molluscs} alt="" />
                            <img style={{ marginRight: "1rem" }} src={Crustaceans} alt="" />
                        </div>
                    </div>
                    <Divider />
                    <div className="goodsDetails-wrap-product-size">
                        <h3>Size</h3>
                        <div>
                            <Button className="goodsDetails-wrap-product-size-style" >8” - Small</Button>
                            <Button className="goodsDetails-wrap-product-size-style" >12” - Big  + € 5</Button>
                            <Button className="goodsDetails-wrap-product-size-style" type="primary">10” - Regular  + € 2</Button>
                            <Button className="goodsDetails-wrap-product-size-style" >14” - Giant  + € 10</Button>
                            <Button className="goodsDetails-wrap-product-size-style" >14” - Giant  + € 10</Button>
                            <Button className="goodsDetails-wrap-product-size-style" >14” - Giant  + € 10</Button>
                        </div>
                    </div>
                    <Divider />
                    <div className="goodsDetails-wrap-product-toppings">
                        <h3>Toppings</h3>
                        <ul>
                            <li>
                                <div className="toppings-title"><h5>Extra cheese</h5><span>+ € 2 </span></div>
                                <div><PlusOutlined /><span className="active-color">2</span><MinusOutlined /></div>
                            </li>
                            <li>
                                <div className="toppings-title"><h5>Sundried Tomatoes</h5><span>+ € 2 </span></div>
                                <div><PlusOutlined /><span>0</span><MinusOutlined /></div>
                            </li>
                            <li>
                                <div className="toppings-title"><h5>Olives</h5><span>+ € 2 </span></div>
                                <div><PlusOutlined /><span>0</span><MinusOutlined /></div>
                            </li>
                            <li>
                                <div className="toppings-title"><h5>Sweetcorn</h5><span>+ € 2 </span></div>
                                <div><PlusOutlined /><span>0</span><MinusOutlined /></div>
                            </li>
                        </ul>
                    </div>
                    <Divider />
                    <div className="goodsDetails-wrap-product-total">
                        <div>
                            <h3>Total <span>€ 20</span></h3>
                        </div>
                        <div>
                            <PlusCircleOutlined />
                            <span>1</span>
                            <MinusCircleOutlined />
                        </div>
                    </div>
                    <Button type="primary" shape="round" block size="large">Add to Order</Button>
                </div>
            </div>
            <WebFooter />
        </>
    )
}

export default GoodsDetails
