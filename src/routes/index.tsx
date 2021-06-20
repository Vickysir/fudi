/*
 * @Author: your name
 * @Date: 2021-03-02 13:55:48
 * @LastEditTime: 2021-03-29 10:40:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/routes/index.tsx
 */
import React from "react";
import { HashRouter as Router, Redirect, Route } from 'react-router-dom'
import { CheckTokenRoute } from "@/comps/checkTokenRoute";
import Homepage from "@/pages/web";
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
import Web from "@/pages/web";




export function WebRoutes() {
    return <Router>
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route path="/home" component={Web} />
    </Router>
}




