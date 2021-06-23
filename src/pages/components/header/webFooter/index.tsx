/*
 * @Author: your name
 * @Date: 2021-03-02 09:43:16
 * @LastEditTime: 2021-04-01 11:07:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/components/header/webFooter/index.tsx
 */
import React, { useEffect, useState } from 'react'
import iconphone from './images/icon-phone.svg'
import iconchat from './images/icon-chat.svg'
import logo from '@/assets/images/fudi/logoWhite.svg'
import { Avatar, Badge } from 'antd';
import { Link } from 'react-router-dom';
import './index.less'
import { useAppStore } from '@/__internal';
import { openOnlineChat } from '@/utils';
import { websitePhone } from '@/utils/constant';

const WebFooter = () => {
    const commonInfo = useAppStore("commonInfo");

    function handleClick() {
        openOnlineChat(commonInfo?.websitePhone)
    }
    return (
        <>
            <div className="webFooter">
                <ul className="webFooter-tel">
                    <li><img src={iconphone} alt="iconphone" /><span>{commonInfo?.websitePhone ? commonInfo.websitePhone : websitePhone}</span></li>
                    <li onClick={handleClick}><img src={iconchat} alt="iconchat" /><span>Online Chat</span></li>
                </ul>
                <img src={logo} alt="logo" />
                <ul className="webFooter-menu">
                    <li>
                        <Link to="/home/faq" style={{ color: "rgba(255, 255, 255, 0.8)" }}>FAQ</Link>
                    </li>
                    <li>
                        <Link to="/home/helpCenter" style={{ color: "rgba(255, 255, 255, 0.8)" }}>Help Center</Link>
                    </li>
                    <li>
                        Terms and Conditions
                    </li>
                </ul>
            </div>

            <div className="webFooter-copyright"> © 2020 Fudi&more. All rights reserved</div>
        </>
    )
}

export default WebFooter
