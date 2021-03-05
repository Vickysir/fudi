/*
 * @Author: your name
 * @Date: 2021-03-02 13:55:48
 * @LastEditTime: 2021-03-04 17:23:46
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
import Setupphone from "@/pages/web/regist/setupphone";
import FAQ from "@/pages/web/FAQ";
import HelpCenter from "@/pages/web/helpCenter";
import PersonalCenter from "@/pages/web/personalCenter";



export function WebRoutes() {
    return <Router>
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route path="/home" component={Homepage} />
        {/* <CheckTokenRoute path="/home" component={Web} /> */}
        <Route path="/login" component={Login} />
        <Route path="/changepassword" component={Changepassword} />
        <Route path="/restpassword" component={Restpassword} />
        <Route path="/regist" component={Regist} />
        <Route path="/setupphone" component={Setupphone} />
        <Route path="/faq" component={FAQ} />
        <Route path="/helpCenter" component={HelpCenter} />
        <Route path="/personalCenter" component={PersonalCenter} />
    </Router>
}




