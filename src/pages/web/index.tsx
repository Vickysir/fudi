import React from 'react'
import { HashRouter as Router, Redirect, Route } from 'react-router-dom'

import WebFooter from '@/pages/components/header/webFooter'
import WebHeader from '@/pages/components/header/webHeader'
import Homepage from "@/pages/web/homepage";
import Login from "@/pages/web/login";
import Changepassword from "@/pages/web/login/changepwd";
import Restpassword from "@/pages/web/login/resetpwd";
import Regist from "@/pages/web/regist";
import PhoneVerification from "@/pages/web/regist/setupphone/verification";
import Setupphone from "@/pages/web/regist/setupphone";
import FAQ from "@/pages/web/FAQ";
import HelpCenter from "@/pages/web/helpCenter";
import PersonalCenter from "@/pages/web/personalCenter";
import Shop from "@/pages/web/shop";
import GoodsDetails from "@/pages/web/goods";
import OrderComfirm from "@/pages/web/orderComfirm";

const Web = () => {
    return (
        <>
            <WebHeader />
            <div>
                <Router>
                    <Route exact path="/" component={Homepage} />
                    <Route exact path="/home" component={Homepage} />
                    <Route path="/home/login" component={Login} />
                    <Route path="/home/restpassword" component={Restpassword} />
                    <Route path="/home/changepassword" component={Changepassword} />
                    <Route path="/home/regist" component={Regist} />
                    <Route exact path="/home/setupphone" component={Setupphone} />
                    <Route path="/home/setupphone/verification" component={PhoneVerification} />
                    <Route path="/home/faq" component={FAQ} />
                    <Route path="/home/helpCenter" component={HelpCenter} />
                    <Route path="/home/personalCenter" component={PersonalCenter} />
                    <Route path="/home/shop/:id" component={Shop} />
                    <Route path="/home/goodsdetails/:id/:shopId" component={GoodsDetails} />
                    <Route path="/home/orderConfirm" component={OrderComfirm} />
                </Router>
            </div>
            <WebFooter />
        </>
    )
}

export default Web
