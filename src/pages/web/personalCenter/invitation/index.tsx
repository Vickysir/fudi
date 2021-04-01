/*
 * @Author: your name
 * @Date: 2021-03-04 17:53:51
 * @LastEditTime: 2021-03-17 10:28:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/web/personalCenter/sendQ/index.tsx
 */
import React, { useEffect, useState } from 'react'
import { Button, Spin } from 'antd'
import fb from '@/assets/images/common/login/fb.png'
import './index.less'
import { APIPersonalCenterInvitation } from '@/pages/api/request'
import { PersonalCenterInvitationPost } from '@/pages/api/types'
import { invitateFriendsStaus, INVITATEFRIENDS_COMPLETE } from '@/utils/constant'

const Invitation = () => {
    const [code, setcode] = useState("")
    const [invitationList, setinvitationList] = useState([])
    useEffect(() => {
        APIPersonalCenterInvitation()
            .then((res) => {
                const { invitationCode, invitationList }: PersonalCenterInvitationPost = res.data;
                setcode(invitationCode);
                setinvitationList(invitationList);
            })
            .catch((err) => {
                console.log(`err`, err)
            })
    }, [])
    return (
        <div className="invitation-wrap">
            <header>
                <h3>Get 50% OFF Your Order</h3>
                <p>Invite your friends to Fudi&More, and for each one who signs up we’ll give you both 50% discount off next order!</p>
            </header>
            <div className="invitation-wrap-code">
                <div>
                    Invite Code:
                    <span>{code ? code : <Spin />}</span>
                </div>
                <div>
                    <Button type="primary" shape="round">Share Code</Button>
                    <img src={fb} alt="icon" />
                </div>
            </div>
            <ul>
                <li>
                    <h3>Invitations</h3>
                    <p>{invitationList.length} Friends</p>
                </li>
                {
                    invitationList.map((item, index) => {
                        return (
                            <li className="invitation-wrap-friends">
                                <div>
                                    <img src={fb} alt="icon" />
                                    <h3>{item.inviteesUserNickname}</h3>
                                </div>
                                <p className={item.status === INVITATEFRIENDS_COMPLETE ? "complete" : "invited"}>{invitateFriendsStaus.get(item.status)}</p>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Invitation