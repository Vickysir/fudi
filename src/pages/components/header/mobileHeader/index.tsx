import React from 'react'
import { Badge } from 'antd';
import Icon from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import iconnott from '@/assets/images/common/icon/icon-nott.svg'
import iconburgerMenu from '@/assets/images/common/icon/icon-burger-menu.svg'
import logoOne from '@/assets/images/fudi/logoOne.svg'
import { withRouter } from 'react-router-dom'
import style from '@/styles/theme/icon.less'
import "./index.less"

const MobileHeader = (props) => {
    const { history } = props;

    return (
        <div className="mobileHeader">
            <div>
                <Icon component={iconburgerMenu} className={style.iconFill} style={{ fontSize: "2.5rem" }} />
            </div>
            <div className="mobileHeader-logo">
                <img src={logoOne} alt="logo" />
            </div>
            <ul className="mobileHeader-menu">
                <li>
                    <Badge count={5}>
                        <Icon component={iconnott} className={style.iconFill} style={{ fontSize: "2.5rem" }} />
                    </Badge>
                </li>
                <li>
                    <Avatar size="large" style={{ backgroundColor: '#fde3cf', "cursor": "pointer" }} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                </li>
            </ul>
        </div>
    )
}

export default withRouter(MobileHeader)
