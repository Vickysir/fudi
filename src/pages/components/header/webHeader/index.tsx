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
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import style from '@/styles/theme/icon.less'
import './index.less'
import { useAppStore } from '@/__internal'
import { openOnlineChat } from '@/utils'
import { APIGetCartList, APIRemoveCartList, APISettingPageInfo, APIUpdateCartList } from '@/pages/api/request'
import CartList from '../../antd/popconfirm/CartList'
import NotifacationList from '../../antd/popconfirm/NotifacationList'
import { defaultStorage } from '@/utils/uploadUseS3'
import { websitePhone } from '@/utils/constant'

interface Props extends RouteComponentProps {
    refreshCart?: number
}
const WebHeader = (props: Props) => {
    const { history, refreshCart } = props;
    const { pathname } = history.location;
    const [cartdata, setCartdata] = useState<any>([]);
    const [headImg, setHeadImg] = useState("https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png");
    const commonInfo = useAppStore("commonInfo");
    const authInfo = useAppStore("authInfo");
    const token = authInfo?.token;
    const isLogin = token && authInfo?.nickname && authInfo.phone;
    function handleClick() {
        openOnlineChat(commonInfo?.websitePhone)
    }
    function goTo() {
        history.push("/home/personalCenter/index?id=1")
    }

    const fetchData = async () => {

        const { data } = await APIGetCartList({ shopId: commonInfo.shopId });
        setCartdata(data);
    }
    useEffect(() => {
        if (commonInfo?.shopId) {
            fetchData();
        }
        if (isLogin) {
            APISettingPageInfo()
                .then((res) => {
                    const { data } = res;
                    if (data?.head) {
                        setHeadImg(`${defaultStorage.S3header}${data.head}`)
                    }
                }).catch((err) => {
                    console.log(`APISettingPageInfo err`, err)
                })
        }
    }, [commonInfo?.refreshCart])

    return (
        <>
            <div className="webHeader">
                <ul className="webHeader-tel">
                    <li>
                        <img src={imgphone} alt="imgphone" />
                        <span>{commonInfo?.websitePhone ? commonInfo.websitePhone : websitePhone}</span>
                    </li>
                    <li onClick={handleClick}>
                        <Icon component={iconchat} className={style.iconFill} />
                        <span className="chat">Online Chat</span>
                    </li>
                </ul>
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
                                    <Link to="/home/login">
                                        <Button type="primary" shape="round">Login</Button>
                                    </Link>
                            }
                        </li>
                    }
                    {
                        isLogin &&
                        <>
                            <li>
                                {
                                    commonInfo?.shopId && (
                                        <CartList
                                            Children={(
                                                <Badge count={cartdata?.length}>
                                                    <Icon component={iconorder} className={style.iconFill} style={{ fontSize: "2.5rem" }} />
                                                </Badge>
                                            )}>
                                        </CartList>
                                    )
                                }
                            </li>
                            {/* <li>
                                <NotifacationList
                                    refreshHeader={fetchData}
                                    Children={(
                                        <Badge count={2}>
                                            <Icon component={iconnott} className={style.iconFill} style={{ fontSize: "2.5rem" }} />
                                        </Badge>
                                    )}>
                                </NotifacationList>
                            </li> */}
                            <li onClick={goTo}>
                                <Avatar size="large" style={{ backgroundColor: '#fde3cf', "cursor": "pointer" }} src={headImg} />
                            </li>
                        </>
                    }

                </ul>
            </div>
        </>

    )
}

export default withRouter(WebHeader)


