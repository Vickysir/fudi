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

const HelpCenter = () => {
    return (
        <div>
            <h1>Frequently Asked Questions</h1>
            <Button type="primary">Back</Button>
            <ul>
                <li>
                    <span>Ask your Question</span>
                    <Button type="primary">Open Online Chat</Button>
                </li>
                <li><Divider type="vertical" /></li>
                <li>
                    <span>Or Call Us</span>
                    <p>
                        <img src={iconphone} alt="iconphone" />
                        +353 00 000 00 00
                    </p>
                </li>
            </ul>
        </div>
    )
}

export default HelpCenter
