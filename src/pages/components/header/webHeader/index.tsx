/*
 * @Author: your name
 * @Date: 2021-03-02 09:43:16
 * @LastEditTime: 2021-04-01 11:06:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/components/header/webHeader/index.tsx
 */
import React, { useEffect, useState } from 'react'
import imgphone from '@/assets/images/common/imgs/img-phone.svg'
import iconchat from '@/assets/images/common/icon/icon-chat.svg'
import iconnott from '@/assets/images/common/icon/icon-nott.svg'
import iconorder from '@/assets/images/common/icon/icon-order.svg'
import logoOne from '@/assets/images/fudi/logoOne.svg'
import { Avatar, Badge, Button } from 'antd';
import Icon from '@ant-design/icons';
import { LoginOutlined, } from '@ant-design/icons';
import { Link, RouteChildrenProps, withRouter } from 'react-router-dom'
import style from '@/styles/theme/icon.less'
import './index.less'
import { useAppStore } from '@/__internal'
import { openOnlineChat } from '@/utils'
import { APIGetCartList, APIRemoveCartList, APIUpdateCartList } from '@/pages/api/request'
import CartList from '../../antd/popconfirm/CartList'

interface Props extends RouteChildrenProps {
}
const WebHeader = (props: Props) => {
    const { history } = props;
    const { pathname } = history.location;
    const commonInfo = useAppStore("commonInfo");
    const authInfo = useAppStore("authInfo");
    const token = authInfo?.token;
    const isLogin = token && authInfo?.nickname;

    websitePhone: "353858275002"
    function handleClick() {
        openOnlineChat(commonInfo?.websitePhone)
    }
    function goTo() {
        history.push("/personalCenter/index?id=1")
    }

    useEffect(() => {
        async function fetchData() {
            await APIGetCartList({ shopId: 1 });
            // await APIUpdateCartList({ shopId: 1, id: 576123, quantity: 10 });
            // await APIRemoveCartList({})
        }
        fetchData();
    }, [])
    return (
        <>
            <div className="webHeader">
                {
                    commonInfo?.websitePhone ?
                        <ul className="webHeader-tel">
                            <li>
                                <img src={imgphone} alt="imgphone" />
                                <span>{commonInfo.websitePhone}</span>
                            </li>
                            <li onClick={handleClick}>
                                <Icon component={iconchat} className={style.iconFill} />
                                <span className="chat">Online Chat</span>
                            </li>
                        </ul>
                        : <ul></ul>
                }
                <div className="webHeader-logo">
                    <Link to="/home">
                        <img src={logoOne} alt="logo" />
                    </Link>
                </div>
                <ul className="webHeader-menu">
                    {
                        !isLogin &&
                        <li>
                            {
                                pathname === "/login" ?
                                    <Link to="/home">
                                        <Button type="primary" shape="round">Home</Button>
                                    </Link>
                                    :
                                    <Link to="/login">
                                        <Button type="primary" shape="round">Login</Button>
                                    </Link>
                            }
                        </li>
                    }
                    {
                        isLogin &&
                        <>
                            <li>
                                <CartList
                                    Children={(
                                        <Badge count={5}>
                                            <Icon component={iconorder} className={style.iconFill} style={{ fontSize: "2.5rem" }} />
                                        </Badge>
                                    )}>
                                </CartList>
                            </li>
                            <li>
                                <Badge count={5}>
                                    <Icon component={iconnott} className={style.iconFill} style={{ fontSize: "2.5rem" }} />
                                </Badge>
                            </li>
                            <li onClick={goTo}>
                                <Avatar size="large" style={{ backgroundColor: '#fde3cf', "cursor": "pointer" }} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            </li>
                        </>
                    }

                </ul>
            </div>
        </>

    )
}

export default withRouter(WebHeader)
function updateCartList() {
    throw new Error('Function not implemented.')
}

