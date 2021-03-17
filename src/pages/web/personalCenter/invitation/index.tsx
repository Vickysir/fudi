/*
 * @Author: your name
 * @Date: 2021-03-04 17:53:51
 * @LastEditTime: 2021-03-17 10:28:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/web/personalCenter/sendQ/index.tsx
 */
import React from 'react'
import { Button } from 'antd'
import fb from '@/assets/images/common/login/fb.png'
import './index.less'

const Invitation = () => {
    return (
        <div className="invitation-wrap">
            <header>
                <h3>Get 50% OFF Your Order</h3>
                <p>Invite your friends to Fudi&More, and for each one who signs up we’ll give you both 50% discount off next order!</p>
            </header>
            <div className="invitation-wrap-code">
                <div>
                    Invite Code:
                    <span>652a</span>
                </div>
                <div>
                    <Button type="primary" shape="round">Share Code</Button>
                    <img src={fb} alt="icon" />
                </div>
            </div>
            <ul>
                <li>
                    <h3>Invitations</h3>
                    <p>5 Friends</p>
                </li>
                <li className="invitation-wrap-friends">
                    <div>
                        <img src={fb} alt="icon" />
                        <h3>Opi Watihana</h3>
                    </div>
                    <p className="complete">Complete</p>
                </li>
                <li className="invitation-wrap-friends">
                    <div>
                        <img src={fb} alt="icon" />
                        <h3>Opi Watihana</h3>
                    </div>
                    <p className="invited">Complete</p>
                </li>
            </ul>
        </div>
    )
}

export default Invitation