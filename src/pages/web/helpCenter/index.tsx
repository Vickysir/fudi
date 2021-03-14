/*
 * @Author: your name
 * @Date: 2021-03-04 14:13:42
 * @LastEditTime: 2021-03-05 11:11:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/web/helpCenter/index.tsx
 */
import { Button, Divider } from 'antd'
import React from 'react'
import iconphone from '@/assets/images/common/icon/icon-phone.svg'
import WebFooter from '@/pages/components/header/webFooter'
import WebHeader from '@/pages/components/header/webHeader'
import BaackTitle from '../components/baackTitle'
import './index.less'

const HelpCenter = () => {

    return (
        <>
            <WebHeader />
            <div>
                <BaackTitle titleContent="Help Center" />
                <ul className="login-wrap helpCenter">
                    <li>
                        <span>Ask your Question</span>
                        <Button
                            type="primary"
                            size="large"
                            shape="round"
                        >
                            Open Online Chat
                        </Button>
                    </li>
                    <li><Divider /></li>
                    <li>
                        <span>Or Call Us</span>
                        <p className="helpCenter-call">
                            <img src={iconphone} alt="iconphone" />
                            <span>+353 00 000 00 00</span>
                        </p>
                    </li>
                </ul>
            </div>
            <WebFooter />
        </>
    )
}

export default HelpCenter
