import React from "react";
import { Link } from "react-router-dom";

export function RouterPage(props: { children?: JSX.Element | JSX.Element[] }) {
    return <React.Fragment>
        <div>二级路由界面</div>
        <Link to="/page1">跳转page1</Link>
        <div></div>
        {props?.children}
    </React.Fragment>
}
