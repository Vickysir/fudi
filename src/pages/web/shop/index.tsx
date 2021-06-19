/*
 * @Author: your name
 * @Date: 2021-03-29 09:25:46
 * @LastEditTime: 2021-05-06 19:18:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/web/shop/index.tsx
 */
import WebFooter from '@/pages/components/header/webFooter'
import WebHeader from '@/pages/components/header/webHeader'
import { Button, Rate, Input, Card, Tabs, BackTop, Tooltip, message, Spin } from 'antd'
import Icon, { ArrowLeftOutlined, EnvironmentOutlined, FieldTimeOutlined, SearchOutlined, CalendarOutlined } from '@ant-design/icons';
import iconchat from '@/assets/images/common/icon/icon-chat.svg'
import goodPlaceholder from '@/assets/images/common/icon/good-placeholder.svg';
import tableSvg from '@/assets/images/common/icon/table.svg'
import homeBanner from '@/assets/images/fudi/home-banner.png';



import React, { useEffect, useState } from 'react'
import style from '@/styles/theme/icon.less'
import './index.less'
import MessageModal from '@/pages/components/antd/modal/messageModal';
import AddReview from '@/pages/components/antd/modal/formModal';
import { Link, withRouter } from 'react-router-dom';
import V_Map from '@/pages/components/map';
import { APIGoodsSearch, APIShopDetail, APIShopGoodsListAll } from '@/pages/api/request';
import { isLogin, openOnlineChat } from '@/utils';
import { ShopDetailResponse, ShopGoodsListAllResponseArray } from '@/pages/api/types';
import { defaultStorage } from '@/utils/uploadUseS3';
import { useAppStore } from '@/__internal';


const { Search } = Input;
const { Meta } = Card;
const { TabPane } = Tabs;
const desc = ['1.0', '2.0', '3.0', '4.0', '5.0'];

const Shop = (props) => {
    const { history, match: { params } } = props;
    const [rateValue, setrateValue] = useState(0)
    const [isOpen, setisOpen] = useState(false)
    const [issend, setissend] = useState(false)
    const [shopData, setShopData] = useState<ShopDetailResponse>();
    const [goods, setGoods] = useState<ShopGoodsListAllResponseArray[]>();
    const [searchGoodsList, setSearchGoodsList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSearch, setIsSearch] = useState(false);
    const authInfo = useAppStore("authInfo");

    let timer = null;

    const suffix = (
        <div>
            <span style={{ marginRight: "0.5rem" }}>Search</span>
            <SearchOutlined
                className="shop-theme-color"
            />
        </div>
    );
    // 防抖
    function debounce(value: string) {
        clearTimeout(timer);
        timer = setTimeout(async function () {
            const { data } = await APIGoodsSearch({ "shopId": Number(params.id), "title": value });
            console.log(data.map((item) => item.goodsList).flat())
            setSearchGoodsList(data.map((item) => item.goodsList).flat());
            setLoading(false);
        }, 0);
    }
    const onSearch = value => {
        // const value = e.target.value;
        if (value) {
            debounce(value);
            setIsSearch(true);
            setLoading(true);
        } else {
            clearTimeout(timer);
            setIsSearch(false);
        }
    };
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
    const scrollToAnchor = (anchorName) => {
        if (anchorName) {
            let anchorElement = document.getElementById(anchorName);
            if (anchorElement) {
                anchorElement.scrollIntoView()
            }
        }
    }


    useEffect(() => {
        async function ftetchApi() {
            const { data: shopDetails } = await APIShopDetail({ "id": Number(params.id) });
            const { data: goods } = await APIShopGoodsListAll({ "shopId": Number(params.id) });

            setShopData(shopDetails);
            setGoods(goods);
            setLoading(false);
        }
        ftetchApi();
    }, [])


    return (
        <>
            <WebHeader />
            <Spin spinning={loading} size="large" tip="Loading...">
                <div className="shop-wrap">
                    <div className="shop-wrap-banner" style={{ background: shopData?.thumbnail ? `url(${defaultStorage.S3header}${shopData?.thumbnail})` : `url(${homeBanner})` }}>
                        <Button
                            className="shop-wrap-banner-button"
                            type="primary"
                            shape="round"
                            onClick={() => history.go(-1)}
                        >
                            <ArrowLeftOutlined />Back to Homepage
                    </Button>
                    </div>
                    <div className="shop-wrap-shopDesc">
                        <div className="shop-wrap-shopDesc-box">
                            <p className="shop-wrap-shopDesc-book" ><span onClick={() => {
                                if (!isLogin(authInfo)) {
                                    message.error("You are not logged in, you will be redirected to log in after 3s");
                                    setTimeout(() => {
                                        history.push("/login")
                                    }, 3000)
                                    return
                                }
                                setisOpen(true)
                            }}>Book a table</span></p>
                            <h1>{shopData?.name}</h1>
                            <div>
                                <span style={{ "display": "flex", "alignItems": "center" }}>
                                    <Rate
                                        disabled
                                        allowHalf
                                        onChange={handleChange}
                                        value={shopData?.rate}
                                        className="shop-theme-color"
                                    />
                                    <span className="ant-rate-text shop-rate" style={{ marginLeft: '1rem' }}>{shopData?.rate}</span>
                                </span>
                                {/* <span className="shop-reviews">
                                    Reviews: {shopData?.evaluate?.total || 0}
                                </span> */}
                            </div>
                            <ul>
                                <li><FieldTimeOutlined className="shop-icon" />{`${shopData?.startTimeFormat} - ${shopData?.endTimeFormat}`}</li>
                                <li style={{ width: "40%" }} className="inaline">
                                    <Tooltip title={shopData?.address} >
                                        <EnvironmentOutlined className="shop-icon" />{shopData?.address}
                                    </Tooltip>
                                </li>
                                <li
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                        if (shopData?.phone) {
                                            openOnlineChat(shopData?.phone)
                                        } else {
                                            message.error("The shop don't have phone number")
                                        }
                                    }}>
                                    <Icon component={iconchat} className={`${style.iconFill} shop-icon`} />Online Chart
                            </li>
                            </ul>
                        </div>
                        <div className="shop-wrap-shopDesc-search">
                            {
                                !isSearch ? (
                                    <div>
                                        {
                                            goods?.map((item) => {
                                                return (<Button style={{ margin: '1rem 0' }} size="large" shape="round" onClick={() => scrollToAnchor(item.name)}>{item.name}</Button>)
                                            })
                                        }
                                    </div>
                                ) : <div></div>
                            }
                            <div style={{ "width": "100%", "textAlign": "center" }}>
                                <Search
                                    style={{ "width": "60%", "paddingLeft": "2rem", "paddingRight": "2rem" }}
                                    placeholder=" Search ..."
                                    size="large"
                                    enterButton={suffix}
                                    allowClear
                                    onSearch={onSearch}
                                />
                            </div>
                        </div>
                    </div>
                    {
                        !isSearch && goods?.map((item, index) => {
                            return (
                                <div className="shop-wrap-shopCategoriesList" key={item.id}>
                                    <div>
                                        <h1 id={item.name}>{item.name}</h1>
                                        <Tabs size="large" defaultActiveKey="1" centered>
                                            {
                                                item.secondGoodsClassify.map((el, index) => {
                                                    return (
                                                        <TabPane tab={el.name} key={el.id}>
                                                            <div className="shop-wrap-shopCategoriesList-box">
                                                                {
                                                                    el.goodsList.map((v) => {
                                                                        return (
                                                                            <div key={v.id}>
                                                                                <div>
                                                                                    {
                                                                                        v?.thumbnail ?
                                                                                            <img width="100%" alt="example" src={defaultStorage.S3header + v.thumbnail} />
                                                                                            : <Icon
                                                                                                component={goodPlaceholder}
                                                                                                className={` ${style.iconFill}`}
                                                                                                style={{ fontSize: "12rem" }}
                                                                                            />
                                                                                    }
                                                                                </div>
                                                                                <div>
                                                                                    <h3 className="intwoline">{v.title}</h3>
                                                                                    <h6 className="inaline"><span className="originalPrice">€ {v.originalPrice}</span><span>€ {v.currentPrice} / portion</span></h6>
                                                                                    <p className="inthreeline">{v.title}</p>
                                                                                    <Button className="shop-wrap-shopCategoriesList-box-button" type="primary" shape="round" block><Link to={`/goodsDetails/${v.id}/${params.id}`}>Order</Link></Button>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        </TabPane>
                                                    )
                                                })
                                            }
                                        </Tabs>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {
                        isSearch && (
                            <div className="shop-wrap-shopCategoriesList" >
                                <div className="shop-wrap-shopCategoriesList-box">
                                    {
                                        searchGoodsList.map((v) => {
                                            console.log(`vVVVVVVVV`, v)
                                            return (
                                                <div key={v.id}>
                                                    <div>
                                                        {
                                                            v?.thumbnail ?
                                                                <img width="100%" alt="example" src={defaultStorage.S3header + v.thumbnail} />
                                                                : <Icon
                                                                    component={goodPlaceholder}
                                                                    className={` ${style.iconFill}`}
                                                                    style={{ fontSize: "12rem" }}
                                                                />
                                                        }
                                                    </div>
                                                    <div>
                                                        <h3 className="intwoline">{v.title}</h3>
                                                        <h6 className="inaline"><span className="originalPrice">€ {v.originalPrice}</span><span>€ {v.currentPrice} / portion</span></h6>
                                                        <p className="inthreeline">{v.title}</p>
                                                        <Button className="shop-wrap-shopCategoriesList-box-button" type="primary" shape="round" block><Link to={`/goodsDetails/${v.id}/${params.id}`}>Order</Link></Button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    }
                    {/* <div style={{ width: "100%", height: "1000px" }}>
                    <V_Map />
                </div> */}
                    <BackTop>
                        <div className="backUp">UP</div>
                    </BackTop>
                </div>
            </Spin>
            <WebFooter />
            <AddReview
                isOpen={isOpen}
                isClose={addReviewClose}
                shopId={Number(params.id)}
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

export default withRouter(Shop)
