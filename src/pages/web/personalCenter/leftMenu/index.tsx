/*
 * @Author: your name
 * @Date: 2021-03-05 10:04:05
 * @LastEditTime: 2021-03-16 10:01:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/web/personalCenter/menu/index.tsx
 */
import React, { useEffect, useImperativeHandle, useState } from 'react'
import { Divider, Menu } from 'antd';
import { UserOutlined, LockOutlined, BulbOutlined, ImportOutlined, BellOutlined, ShoppingOutlined, TeamOutlined, ContainerOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons';
import iconOrder from '@/assets/images/common/icon/icon-order.svg';
import iconNott from '@/assets/images/common/icon/icon-nott.svg';
import UploadAvatar from '../uploadAvatar';
import { withRouter } from "react-router";
import './index.less'

const LeftMenu = (props) => {
    const { cRef } = props;
    const [selectedKeys, setselectedKeys] = useState(['1']);
    const handleClick = (e) => {
        const { history } = props;
        const selectedKeys = [];
        selectedKeys.push(e.key);
        setselectedKeys(selectedKeys);
        switch (e.key) {
            case "1":
                history.push("/personalCenter/myOrders")
                break;
            case "2":
                history.push("/personalCenter/vouchers")
                break;
            case "3":
                history.push("/personalCenter/invitation")
                break;
            case "4":
                history.push("/personalCenter/notification")
                break;
            case "5":
                history.push("/personalCenter/myInfor")
                break;
            case "6":
                history.push("/personalCenter/changepwd")
                break;
            case "7": history.push("/personalCenter/sendQ")
                break;
            case "8": history.push("/login")
                break;
            default: history.push("/personalCenter/myOrders")
        }
    };

    useImperativeHandle(cRef, () => ({
        // changeVal 就是暴露给父组件的方法
        changeVal: (newVal) => {
            console.log('调用成功', newVal);
            handleClick(newVal);
        }
    }));

    return (
        <div className="leftMenu-warp">
            <UploadAvatar />
            <Menu
                onClick={handleClick}
                style={{ "width": "21.333rem", "paddingBottom": "2rem" }}
                defaultSelectedKeys={['1']}
                mode="inline"
                selectedKeys={selectedKeys}
            >
                <Menu.Item key="1" icon={<ShoppingOutlined />} >My Orders</Menu.Item>
                {/* <Menu.Item key="2" icon={<Icon component={iconNott} />} >My Vouchers</Menu.Item> */}
                <Menu.Item key="2" icon={<ContainerOutlined />} >My Vouchers</Menu.Item>
                <Menu.Item key="3" icon={<TeamOutlined />} >Invitate Friends</Menu.Item>
                <Menu.Item key="4" icon={<BellOutlined />} >Notifications</Menu.Item>
                <Menu.Item ><Divider /></Menu.Item>
                <Menu.Item key="5" icon={<UserOutlined />} >Edit My Info</Menu.Item>
                <Menu.Item key="6" icon={<LockOutlined />} >Change Password</Menu.Item>
                <Menu.Item key="7" icon={<BulbOutlined />} >Send Suggestion</Menu.Item>
                <Menu.Item ><Divider /></Menu.Item>
                <Menu.Item key="8" icon={<ImportOutlined />} >Log Out</Menu.Item>
            </Menu>
        </div>
    )
}

export default withRouter(LeftMenu)
