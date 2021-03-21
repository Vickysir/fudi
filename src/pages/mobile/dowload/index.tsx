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
import phoneframe from '@/assets/images/fudi/phone-frame.png'
import phonescreen from '@/assets/images/fudi/phone-screen.png'
import './index.less'

const MobileDowmloadmarket = () => {
    return (
        <div className="mobile-dowmloadmarket">
            <ul>
                <li>
                    <h3>Download Our App</h3>
                </li>
                <li>
                    <img src={applestore} alt="app store" />
                </li>
                <li>
                    <img src={googlestore} alt="google store" />
                </li>
            </ul>
            <div className="mobile-dowmloadmarket-phone">
                <img src={phoneframe} alt="phone-frame" />
                <img src={phonescreen} alt="phone-screen" />
            </div>
        </div>
    )
}

export default MobileDowmloadmarket
