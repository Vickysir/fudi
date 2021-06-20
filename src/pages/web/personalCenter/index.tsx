/*
 * @Author: your name
 * @Date: 2021-03-04 17:17:52
 * @LastEditTime: 2021-04-02 09:30:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/web/personalCenter/index.tsx
 */
import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'antd'
import { ArrowLeftOutlined, } from '@ant-design/icons';
import { HashRouter as Router, Route, withRouter } from 'react-router-dom'
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
import './index.less'
import { APISettingPageInfo } from '@/pages/api/request';


const PersonalCenter = (props) => {
    const { history, location } = props;
    const childRef = useRef(null);
    const [userInfo, setuserInfo] = useState(null);
    useEffect(() => {
        reload();
    }, [])
    useEffect(() => {
        if (location.pathname = "/home/personalCenter/index") {
            updateChildState()
        }
    }, [location.search])

    function goTo() {
        history.push("/home")
    }

    const updateChildState = () => {
        // changeVal就是子组件暴露给父组件的方法
        childRef.current.changeVal({ key: "1" });
    }

    const reload = () => {
        APISettingPageInfo()
            .then((res) => {
                const { data } = res;
                setuserInfo(data);
            }).catch((err) => {
                console.log(`APISettingPageInfo err`, err)
            })
    }

    return (
        <>
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
                        <LeftMenu cRef={childRef} userInfo={userInfo} />
                    </div>
                    <div>
                        <Router>
                            <Route path="/home/personalCenter/myOrders" component={MyOrders} />
                            <Route path="/home/personalCenter/vouchers" component={Vouchers} />
                            <Route path="/home/personalCenter/changepwd" component={Changepwd} />
                            <Route path="/home/personalCenter/invitation" component={Invitation} />
                            <Route path="/home/personalCenter/myInfor" component={MyInfor} />
                            <Route path="/home/personalCenter/notification" component={NotificationCenter} />
                            <Route path="/home/personalCenter/sendQ" component={SendQ} />
                        </Router>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withRouter(PersonalCenter)
