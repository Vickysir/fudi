import React, { useState } from 'react'
import WebFooter from '@/pages/components/header/webFooter'
import WebHeader from '@/pages/components/header/webHeader'
import { ArrowLeftOutlined, PlusOutlined, MinusOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import SeasameSeeds from '@/assets/images/common/imgs/goodsDetails1-SeasameSeeds.svg'
import Soybeans from '@/assets/images/common/imgs/goodsDetails2-Soybeans.svg'
import Molluscs from '@/assets/images/common/imgs/goodsDetails3-Molluscs.svg'
import Crustaceans from '@/assets/images/common/imgs/goodsDetails4-Crustaceans.svg'
import './index.less'
import { Button, Divider, message } from 'antd';
import { withRouter } from 'react-router';

const GoodsDetails = (props) => {
    const { history } = props;
    const [basicPrice, setBasicPrice] = useState(5)
    const [count, setCount] = useState(1)
    const [totalPrice, setTotalPrice] = useState(basicPrice + 0)
    const [sizePrice, setSizePrice] = useState(0)
    const [toppings1, setToppings1] = useState({ "price": 2, count: 0, label: "toppings1" })
    const [toppings2, setToppings2] = useState({ "price": 3, count: 0, label: "toppings2" })
    const [toppings3, setToppings3] = useState({ "price": 2, count: 0, label: "toppings3" })
    const [toppings4, setToppings4] = useState({ "price": 3, count: 0, label: "toppings4" })

    const handleChangeSize = (value) => {
        const toppings1Price = toppings1.price * toppings1.count;
        const toppings2Price = toppings2.price * toppings2.count;
        const toppings3Price = toppings3.price * toppings3.count;
        const toppings4Price = toppings4.price * toppings4.count;
        const total = (basicPrice + value + toppings1Price + toppings2Price + toppings3Price + toppings4Price) * count
        setSizePrice(value);
        setTotalPrice(total)
    }
    const handleChangTopping = (action, type) => {
        let toppingsCount;
        let total;
        if (action === "plus") {
            toppingsCount = type.count + 1;
        } else if (action === "minus") {
            if (type.count === 0) {
                message.error("The quantity is already zero")
                return
            }
            toppingsCount = type.count - 1;
        }
        switch (type.label) {
            case "toppings1": {
                setToppings1({ ...toppings1, "count": toppingsCount })
                const toppings2Price = toppings2.price * toppings2.count;
                const toppings3Price = toppings3.price * toppings3.count;
                const toppings4Price = toppings4.price * toppings4.count;
                total = (basicPrice + sizePrice + type.price * toppingsCount + toppings2Price + toppings3Price + toppings4Price) * count;
                break;
            }
            case "toppings2": {
                setToppings2({ ...toppings2, "count": toppingsCount })
                const toppings1Price = toppings1.price * toppings1.count;
                const toppings3Price = toppings3.price * toppings3.count;
                const toppings4Price = toppings4.price * toppings4.count;
                total = (basicPrice + sizePrice + type.price * toppingsCount + toppings1Price + toppings3Price + toppings4Price) * count;
                break;
            }
            case "toppings3": {
                setToppings3({ ...toppings3, "count": toppingsCount })
                const toppings1Price = toppings1.price * toppings1.count;
                const toppings2Price = toppings2.price * toppings2.count;
                const toppings4Price = toppings4.price * toppings4.count;
                total = (basicPrice + sizePrice + type.price * toppingsCount + toppings1Price + toppings2Price + toppings4Price) * count;
                break;
            }
            case "toppings4": {
                setToppings4({ ...toppings4, "count": toppingsCount })
                const toppings1Price = toppings1.price * toppings1.count;
                const toppings2Price = toppings2.price * toppings2.count;
                const toppings3Price = toppings3.price * toppings3.count;
                total = (basicPrice + sizePrice + type.price * toppingsCount + toppings1Price + toppings2Price + toppings3Price) * count;
                break;
            }
        }
        setTotalPrice(total)
    }
    const handleChangeGoodsCount = (action) => {
        let goodCount;
        if (action === "plus") {
            goodCount = count + 1;
        } else if (action === "minus") {
            if (count === 0) {
                message.error("The quantity is already zero")
                return
            }
            goodCount = count - 1;
        }
        const toppings1Price = toppings1.price * toppings1.count;
        const toppings2Price = toppings2.price * toppings2.count;
        const toppings3Price = toppings3.price * toppings3.count;
        const toppings4Price = toppings4.price * toppings4.count;
        const total = (basicPrice + sizePrice + toppings1Price + toppings2Price + toppings3Price + toppings4Price) * goodCount
        setCount(goodCount);
        setTotalPrice(total)
    }
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
                            onClick={() => { history.go(-1) }}
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
                        <h3><span>Margherita</span> <span>€ {basicPrice} / portion</span></h3>
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
                            <Button className="goodsDetails-wrap-product-size-style" onClick={() => { handleChangeSize(0) }} type={sizePrice === 0 ? "primary" : null}>8” - Small</Button>
                            <Button className="goodsDetails-wrap-product-size-style" onClick={() => { handleChangeSize(2) }} type={sizePrice === 2 ? "primary" : null}>10” - Regular  + € 2</Button>
                            <Button className="goodsDetails-wrap-product-size-style" onClick={() => { handleChangeSize(5) }} type={sizePrice === 5 ? "primary" : null}>12” - Big  + € 5</Button>
                            <Button className="goodsDetails-wrap-product-size-style" onClick={() => { handleChangeSize(6) }} type={sizePrice === 6 ? "primary" : null}>14” - Giant  + € 6</Button>
                            <Button className="goodsDetails-wrap-product-size-style" onClick={() => { handleChangeSize(7) }} type={sizePrice === 7 ? "primary" : null}>14” - Giant  + € 7</Button>
                            <Button className="goodsDetails-wrap-product-size-style" onClick={() => { handleChangeSize(8) }} type={sizePrice === 8 ? "primary" : null}>14” - Giant  + € 8</Button>
                        </div>
                    </div>
                    <Divider />
                    <div className="goodsDetails-wrap-product-toppings">
                        <h3>Toppings</h3>
                        <ul>
                            <li>
                                <div className="toppings-title"><h5>Extra cheese</h5><span>+ € {toppings1.price} </span></div>
                                <div>
                                    <PlusOutlined onClick={() => handleChangTopping("plus", toppings1)} />
                                    <span className={toppings2.count > 0 && "active-color"}>{toppings1.count}</span>
                                    <MinusOutlined onClick={() => handleChangTopping("minus", toppings1)} />
                                </div>
                            </li>
                            <li>
                                <div className="toppings-title"><h5>Sundried Tomatoes</h5><span>+ € {toppings2.price} </span></div>
                                <div>
                                    <PlusOutlined onClick={() => handleChangTopping("plus", toppings2)} />
                                    <span className={toppings2.count > 0 && "active-color"}>{toppings2.count}</span>
                                    <MinusOutlined onClick={() => handleChangTopping("minus", toppings2)} />
                                </div>
                            </li>
                            <li>
                                <div className="toppings-title"><h5>Olives</h5><span>+ € {toppings3.price} </span></div>
                                <div>
                                    <PlusOutlined onClick={() => handleChangTopping("plus", toppings3)} />
                                    <span className={toppings3.count > 0 && "active-color"}>{toppings3.count}</span>
                                    <MinusOutlined onClick={() => handleChangTopping("minus", toppings3)} />
                                </div>
                            </li>
                            <li>
                                <div className="toppings-title"><h5>Sweetcorn</h5><span>+ € {toppings4.price} </span></div>
                                <div>
                                    <PlusOutlined onClick={() => handleChangTopping("plus", toppings4)} />
                                    <span className={toppings4.count > 0 && "active-color"}>{toppings4.count}</span>
                                    <MinusOutlined onClick={() => handleChangTopping("minus", toppings4)} />

                                </div>
                            </li>
                        </ul>
                    </div>
                    <Divider />
                    <div className="goodsDetails-wrap-product-total">
                        <div>
                            <h3>Total <span>€ {totalPrice}</span></h3>
                        </div>
                        <div>
                            <PlusCircleOutlined onClick={() => handleChangeGoodsCount("plus")} />
                            <span>{count}</span>
                            <MinusCircleOutlined onClick={() => handleChangeGoodsCount("minus")} />
                        </div>
                    </div>
                    <Button type="primary" shape="round" block size="large">Add to Order</Button>
                </div>
            </div>
            <WebFooter />
        </>
    )
}

export default withRouter(GoodsDetails)
