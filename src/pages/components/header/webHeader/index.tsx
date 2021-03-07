/*
 * @Author: your name
 * @Date: 2021-03-02 09:43:16
 * @LastEditTime: 2021-03-05 11:12:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/components/header/webHeader/index.tsx
 */
import React from 'react'
import iconphone from '@/assets/images/common/icon/icon-phone.svg'
import iconchat from '@/assets/images/common/icon/icon-chat.svg'
import iconnott from '@/assets/images/common/icon/icon-nott.svg'
import iconorder from '@/assets/images/common/icon/icon-order.svg'
import logo from './images/logo.svg'
import { Avatar, Badge } from 'antd';
import { withRouter } from 'react-router-dom'
import './index.min.css'


const WebHeader = (props) => {
    const { history } = props;
    function goTo() {
        history.push("/personalCenter")
    }
    return (
        <div className="webHeader">
            <ul className="webHeader-tel">
                <li><img src={iconphone} alt="iconphone" /><span>+353 00 000 00 00</span></li>
                <li><img src={iconchat} alt="iconchat" /><span className="chat">Online Chat</span></li>
            </ul>
            <img src={logo} alt="logo" />
            <ul className="webHeader-menu">
                <li>
                    <Badge count={5}>
                        <img src={iconorder} alt="iconorder" />
                    </Badge>
                </li>
                <li>
                    <Badge count={5}>
                        <img src={iconnott} alt="iconnott" />
                    </Badge>
                </li>
                <li onClick={goTo}>
                    <Avatar size="large" style={{ backgroundColor: '#fde3cf', "cursor": "pointer" }} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                </li>
            </ul>
        </div>
    )
}

export default withRouter(WebHeader)
