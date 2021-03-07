/*
 * @Author: your name
 * @Date: 2021-03-04 17:17:52
 * @LastEditTime: 2021-03-05 10:10:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/web/personalCenter/index.tsx
 */
import React, { useEffect } from 'react'
import { Button } from 'antd'
import { ArrowLeftOutlined, } from '@ant-design/icons';
import { HashRouter as Router, Route } from 'react-router-dom'
import Vouchers from './vouchers'
import Changepwd from './changepwd'
import Invitation from './invitation'
import MyInfor from './myInfor'
import MyOrders from './myOrders'
import SendQ from './sendQ'
import NotificationCenter from './notification'
import LeftMenu from './leftMenu'
import WebHeader from '../../components/header/webHeader'
import WebFooter from '../../components/header/webFooter'
import './index.min.css'


const PersonalCenter = (props) => {
    const { history } = props;
    useEffect(() => {
        history.push("/personalCenter/myOrders")
    }, [])
    function goTo() {
        history.push("/home")
    }
    return (
        <>
            <WebHeader />
            <div className="personalCenter-wrap">
                <Button
                    type="primary"
                    shape="round"
                    style={{ "margin": "4.167rem 0" }}
                    onClick={goTo}
                >
                    <ArrowLeftOutlined />Back to All Dishes
                </Button>
                <div className="personalCenter-wrap-box">
                    <div>
                        <LeftMenu />
                    </div>
                    <div>
                        <Router>
                            <Route path="/personalCenter/myOrders" component={MyOrders} />
                            <Route path="/personalCenter/vouchers" component={Vouchers} />
                            <Route path="/personalCenter/changepwd" component={Changepwd} />
                            <Route path="/personalCenter/invitation" component={Invitation} />
                            <Route path="/personalCenter/myInfor" component={MyInfor} />
                            <Route path="/personalCenter/notification" component={NotificationCenter} />
                            <Route path="/personalCenter/sendQ" component={SendQ} />
                        </Router>
                    </div>
                </div>
            </div>
            <WebFooter />
        </>
    )
}

export default PersonalCenter
