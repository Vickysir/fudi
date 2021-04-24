/*
 * @Author: your name
 * @Date: 2021-03-04 09:51:40
 * @LastEditTime: 2021-03-04 10:14:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/web/homepage/dowload/index.tsx
 */
import React from 'react'
import googlestore from '@/assets/images/common/googlestore.png'
import applestore from '@/assets/images/common/applestore.png'
import phonerender from '@/assets/images/fudi/phone-render.png'

import './index.less'
import { openAppStore } from '@/utils'

const Dowmloadmarket = () => {
    return (
        <div className="dowmloadmarket">
            <ul>
                <li>
                    <h3 className="inaline">Download Our App</h3>
                    <p className="inaline">A better then ever food delivery</p>
                    <p className="inaline">experience starts now!</p>
                </li>
                <li>
                    <img src={applestore} alt="app store" onClick={() => openAppStore("IOS")} />
                    <img src={googlestore} alt="google store" onClick={() => openAppStore("Android")} />
                </li>
            </ul>
            <div className="dowmloadmarket-phone">
                <img src={phonerender} alt="phone-frame" />
            </div>
        </div>
    )
}

export default Dowmloadmarket
