/*
 * @Author: your name
 * @Date: 2021-03-04 17:53:51
 * @LastEditTime: 2021-03-17 15:45:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/web/personalCenter/sendQ/index.tsx
 */
import React from 'react'
import { DeleteFilled } from '@ant-design/icons';
import './index.less'

const NotificationCenter = () => {
    return (
        <div className="notificationCenter-wrap">
            <div>
                <h3>New</h3>
                <div>
                    <div className="notificationCenter-wrap-img"></div>
                    <ul>
                        <li>
                            Today <span><DeleteFilled /></span>
                        </li>
                        <li>
                            <h3>Tropical Summer</h3>
                        </li>
                        <li>
                            <p>Fresh discount for the hot summer!All lemonades with -50% discount.</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NotificationCenter