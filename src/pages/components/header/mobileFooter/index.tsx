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
import logo from '@/assets/images/fudi/logoWhite.svg'
import './index.less'
import { useAppStore } from '@/__internal'

const MobileFooter = () => {
    const commonInfo = useAppStore("commonInfo");
    const [storeInfo, setStoreInfo] = useState(null)

    useEffect(() => {
        setStoreInfo(commonInfo);
    }, [commonInfo])
    return (
        <>
            <div className="mobileFooter">
                <div>
                    <img src={logo} alt="logo" />
                </div>
            </div>
            {
                storeInfo?.shopServicePhone ?
                    <div className="mobileFooter-tel"><img src={iconphone} alt="iconphone" /><span>{storeInfo.shopServicePhone}</span></div>
                    : <div></div>
            }
            <div className="mobileFooter-copyright"> © 2020 Fudi&more. All rights reserved</div>
        </>
    )
}

export default MobileFooter
