import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Page2() {
    useEffect(() => {
        APP_STORE.authInfo = null;
    }, []);
    return <React.Fragment>
        <div>page2</div>
        <Link to="/page1">跳转page1(检查token)</Link>
        <div></div>
        <Link to="/page3">跳转page3</Link>
    </React.Fragment>
}