import React, { useState } from 'react'
import MobileHeader from '../components/header/mobileHeader'
import MobileFooter from '../components/header/mobileFooter'
import homeBanner from '@/assets/images/fudi/home-banner.png';
import product1 from '@/assets/images/fudi/product1__.png';
import product2 from '@/assets/images/fudi/product2__.png';
import product3 from '@/assets/images/fudi/product3__.png';
import product4 from '@/assets/images/fudi/product4__.png';
import product5 from '@/assets/images/fudi/product5__.png';
import product6 from '@/assets/images/fudi/product6__.png';
import star from '@/assets/images/common/icon/star.svg';
import shield from '@/assets/images/common/icon/shield.svg';
import gift from '@/assets/images/common/icon/gift.svg';
import ellipse from '@/assets/images/common/icon/ellipse.svg';
import MobileDowmloadmarket from './dowload';
import Advertising from './advertising';
import Icon from '@ant-design/icons';
import style from '@/styles/theme/icon.less'

import './index.less'


const Mobile = () => {
    const [headerstyle, setHeaderstyle] = useState({})
    const setStyle = (params) => {
        setHeaderstyle(params)
    }
    return (
        <div className="mobile-homepage-banner">
            <Advertising setStyle={setStyle} />
            <MobileHeader style={headerstyle} />
            <div className="mobile-homepage-banner">
                <img src={homeBanner} alt="banner" />
                <p>Are You Hungry?</p>
                <h3>Don’t Wait. Order Now.</h3>
            </div>
            <div className="mobile-homepage-recommended">
                <h1>Taste the best food!</h1>
                <div className="mobile-homepage-recommended-img">
                    <img alt="product1" src={product1} />
                    <h3>Comfortable</h3>
                </div>
                <div className="mobile-homepage-recommended-img">
                    <img alt="product2" src={product2} />
                    <h3>Salads</h3>
                </div>
                <div className="mobile-homepage-recommended-img">
                    <img alt="product3" src={product3} />
                    <h3>Fast Delivery</h3>
                </div>
                <div className="mobile-homepage-recommended-img">
                    <img alt="product4" src={product4} />
                    <h3>Special Offers</h3>
                </div>
                <div className="mobile-homepage-recommended-img">
                    <img alt="product5" src={product5} />
                    <h3>Delicious</h3>
                </div>
                <div className="mobile-homepage-recommended-img">
                    <img alt="product6" src={product6} />
                    <h3>Exclusive Recipes</h3>
                </div>
            </div>
            <div className="mobile-homepage-desc">
                <h1><span>Fudi&More</span> is your <br /> perfect choice!</h1>
                <div className="mobile-homepage-desc-card">
                    <h3>Bonuses</h3>
                    <p>The best restaurants to choose from</p>
                    <p>Pay cash or online</p>
                    <p> Order anytime and anywhere</p>
                    <Icon component={ellipse} className={`mobile-homepage-desc-card-img1 ${style.iconFill}`} style={{ fontSize: "6rem" }} />
                    <Icon component={gift} className={`mobile-homepage-desc-card-img2 ${style.homePageIconFill}`} style={{ fontSize: "3rem" }} />
                </div>
                <div className="mobile-homepage-desc-card">
                    <h3>Bonuses</h3>
                    <p>The best restaurants to choose from</p>
                    <p>Pay cash or online</p>
                    <p> Order anytime and anywhere</p>
                    <Icon component={ellipse} className={`mobile-homepage-desc-card-img1 ${style.iconFill}`} style={{ fontSize: "6rem" }} />
                    <Icon component={shield} className={`mobile-homepage-desc-card-img2 ${style.homePageIconFill}`} style={{ fontSize: "3rem" }} />
                </div>
                <div className="mobile-homepage-desc-card">
                    <h3>Bonuses</h3>
                    <p>The best restaurants to choose from</p>
                    <p>Pay cash or online</p>
                    <p> Order anytime and anywhere</p>
                    <Icon component={ellipse} className={`mobile-homepage-desc-card-img1 ${style.iconFill}`} style={{ fontSize: "6rem" }} />
                    <Icon component={star} className={`mobile-homepage-desc-card-img2 ${style.homePageIconFill}`} style={{ fontSize: "3rem" }} />
                </div>
                <MobileDowmloadmarket />
            </div>
            <MobileFooter />
        </div>
    )
}

export default Mobile
