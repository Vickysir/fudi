/*
 * @Author: your name
 * @Date: 2021-03-04 17:17:52
 * @LastEditTime: 2021-03-05 10:10:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/web/personalCenter/index.tsx
 */
import React from 'react'
import { Button } from 'antd'
import { HashRouter as Router, Route } from 'react-router-dom'
import Vouchers from './vouchers'
import Changepwd from './changepwd'
import Invitation from './invitation'
import MyInfor from './myInfor'
import MyOrders from './myOrders'
import SendQ from './sendQ'
import NotificationCenter from './notification'
import LeftMenu from './leftMenu'


const PersonalCenter = () => {
    return (
        <div>
            <Button type="primary">Back to All Dishes</Button>
            <div>
                <LeftMenu />
            </div>
            <div>
                <Router>
                    <Route path="/personalCenter/vouchers" component={Vouchers} />
                    <Route path="/personalCenter/changepwd" component={Changepwd} />
                    <Route path="/personalCenter/invitation" component={Invitation} />
                    <Route path="/personalCenter/myInfor" component={MyInfor} />
                    <Route path="/personalCenter/myOrders" component={MyOrders} />
                    <Route path="/personalCenter/notification" component={NotificationCenter} />
                    <Route path="/personalCenter/sendQ" component={SendQ} />
                </Router>
            </div>
        </div>
    )
}

export default PersonalCenter
