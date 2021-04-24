import { Button, Rate } from 'antd'
import React, { useEffect, useState } from 'react'
import appIcon from '@/assets/images/fudi/appicon.jpg';
import { openAppStore } from '@/utils';

import './index.less'

const Advertising = ({ setStyle }) => {
    const [client, setClient] = useState("")
    useEffect(() => {
        if (/webOS|iPhone|iPad|Mac|Macintosh|iPod/i.test(navigator.userAgent)) {
            console.log(`MAC OS :`, navigator.userAgent)
            setClient("IOS")
            setStyle({ "marginTop": "100px" })
        } else if (/Mobi|Android/i.test(navigator.userAgent)) {
            console.log(`Android :`, navigator.userAgent)
            setClient("Android")
            setStyle({ "marginTop": "100px" })
        } else {
            setClient("")
            setStyle({ "marginTop": "0" })

        }

    }, [client])
    const iosRender = () => {
        return (
            <div className="advertising-wrap">
                <img src={appIcon} alt="app" />
                <div>
                    <h2>fudi for iOS</h2>
                    <div>
                        <Rate allowHalf value={5} style={{ fontSize: 16 }} />
                        <span className="install-rate"> (126)</span>
                    </div>
                </div>
                <Button className="install-btn" onClick={() => openAppStore("IOS")}>
                    Install
                </Button>
            </div>
        )
    }
    const androidRender = () => {

        return (
            <div className="advertising-wrap">
                <img src={appIcon} alt="app" />
                <div>
                    <h2>fudi for Android</h2>
                    <div>
                        <Rate allowHalf value={3.1} style={{ fontSize: 16 }} />
                        <span className="install-rate"> (126)</span>
                    </div>
                </div>
                <Button className="install-btn" onClick={() => openAppStore("Android")}>
                    Install
                </Button>
            </div>
        )
    }
    return (
        <>
            {
                client ? client === "IOS" ? iosRender() : androidRender() : null
            }
        </>
    )

}

export default Advertising
