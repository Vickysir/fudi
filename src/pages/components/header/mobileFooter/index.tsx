/*
 * @Author: your name
 * @Date: 2021-03-02 09:43:16
 * @LastEditTime: 2021-03-04 14:32:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/components/header/webFooter/index.tsx
 */
import React from 'react'
import iconphone from './images/icon-phone.svg'
import logo from '@/assets/images/fudi/logoWhite.svg'
import './index.less'

const MobileFooter = () => {
    return (
        <>
            <div className="mobileFooter">
                <div>
                    <img src={logo} alt="logo" />
                </div>
            </div>
            <div className="mobileFooter-tel"><img src={iconphone} alt="iconphone" /><span>+353 00 000 00 00</span></div>
            <div className="mobileFooter-copyright"> © 2020 Fudi&more. All rights reserved</div>
        </>
    )
}

export default MobileFooter
