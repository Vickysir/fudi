/*
 * @Author: your name
 * @Date: 2021-03-02 09:43:16
 * @LastEditTime: 2021-03-04 14:32:35
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

const WebFooter = () => {
    const commonInfo = useAppStore("commonInfo");
    const [storeInfo, setStoreInfo] = useState(null)

    function handleClick() {
        openOnlineChat(commonInfo?.shopServicePhone)
    }
    useEffect(() => {
        setStoreInfo(commonInfo);
    }, [commonInfo])
    return (
        <>
            <div className="webFooter">
                {
                    storeInfo?.shopServicePhone ?
                        <ul className="webFooter-tel">
                            <li><img src={iconphone} alt="iconphone" /><span>{storeInfo.shopServicePhone}</span></li>
                            <li onClick={handleClick}><img src={iconchat} alt="iconchat" /><span>Online Chat</span></li>
                        </ul>
                        : <ul></ul>
                }
                <img src={logo} alt="logo" />
                <ul className="webFooter-menu">
                    <li>
                        <Link to="/faq" style={{ color: "rgba(255, 255, 255, 0.8)" }}>FAQ</Link>
                    </li>
                    <li>
                        <Link to="/helpCenter" style={{ color: "rgba(255, 255, 255, 0.8)" }}>Help Center</Link>
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
