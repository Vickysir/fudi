/*
 * @Author: your name
 * @Date: 2021-03-02 09:43:16
 * @LastEditTime: 2021-04-01 11:07:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/components/header/webFooter/index.tsx
 */
import React, { useEffect, useState } from 'react'
import iconphone from './images/icon-phone.svg'
import logo from '@/assets/images/fudi/logoWhite.svg'
import './index.less'
import { useAppStore } from '@/__internal'

const MobileFooter = () => {
    const commonInfo = useAppStore("commonInfo");

    return (
        <>
            <div className="mobileFooter">
                <div>
                    <img src={logo} alt="logo" />
                </div>
            </div>
            {
                commonInfo?.websitePhone ?
                    <div className="mobileFooter-tel"><img src={iconphone} alt="iconphone" /><span>{commonInfo.websitePhone}</span></div>
                    : <div></div>
            }
            <div className="mobileFooter-copyright"> © 2020 Fudi&more. All rights reserved</div>
        </>
    )
}

export default MobileFooter
