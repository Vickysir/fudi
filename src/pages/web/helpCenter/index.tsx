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
import imgphone from '@/assets/images/common/imgs/img-phone.svg'
import WebFooter from '@/pages/components/header/webFooter'
import WebHeader from '@/pages/components/header/webHeader'
import BaackTitle from '../components/baackTitle'
import './index.less'
import { openOnlineChat } from '@/utils'
import { useAppStore } from '@/__internal'
import { websitePhone } from '@/utils/constant'

const HelpCenter = () => {
    const storeAtt = useAppStore("commonInfo");
    function handleClick() {
        openOnlineChat(storeAtt?.websitePhone)
    }
    return (
        <>
            <div>
                <BaackTitle titleContent="Help Center" />
                <ul className="login-wrap helpCenter">
                    <li>
                        <span>Ask your Question</span>
                        <Button
                            type="primary"
                            size="large"
                            shape="round"
                            onClick={handleClick}
                        >
                            Open Online Chat
                        </Button>
                    </li>
                    <li><Divider /></li>
                    <li>
                        <span>Or Call Us</span>
                        <p className="helpCenter-call">
                            <img src={imgphone} alt="imgphone" />
                            <span>{storeAtt?.websitePhone ? storeAtt.websitePhone : websitePhone}</span>
                        </p>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default HelpCenter
