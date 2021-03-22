/*
 * @Author: your name
 * @Date: 2021-03-02 09:43:16
 * @LastEditTime: 2021-03-22 10:47:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/components/header/webHeader/index.tsx
 */
import React from 'react'
import imgphone from '@/assets/images/common/imgs/img-phone.svg'
import iconchat from '@/assets/images/common/icon/icon-chat.svg'
import iconnott from '@/assets/images/common/icon/icon-nott.svg'
import iconorder from '@/assets/images/common/icon/icon-order.svg'
import logoOne from '@/assets/images/fudi/logoOne.svg'
import { Avatar, Badge } from 'antd';
import Icon from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom'
import style from '@/styles/theme/icon.less'
import './index.less'


const WebHeader = (props) => {
    const { history } = props;
    function goTo() {
        history.push("/personalCenter/index?id=1")
    }
    return (
        <div className="webHeader">
            <ul className="webHeader-tel">
                <li>
                    <img src={imgphone} alt="imgphone" />
                    <span>+353 00 000 00 00</span>
                </li>
                <li>
                    <Icon component={iconchat} className={style.iconFill} />
                    <span className="chat">Online Chat</span>
                </li>
            </ul>
            <div className="webHeader-logo">
                <Link to="/home">
                    <img src={logoOne} alt="logo" />
                </Link>
            </div>
            {/* <ul className="webHeader-menu">
                <li>
                    <Badge count={5}>
                        <Icon component={iconorder} className={style.iconFill} style={{ fontSize: "2.5rem" }} />
                    </Badge>
                </li>
                <li>
                    <Badge count={5}>
                        <Icon component={iconnott} className={style.iconFill} style={{ fontSize: "2.5rem" }} />
                    </Badge>
                </li>
                <li onClick={goTo}>
                    <Avatar size="large" style={{ backgroundColor: '#fde3cf', "cursor": "pointer" }} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                </li>
            </ul> */}
        </div>
    )
}

export default withRouter(WebHeader)
