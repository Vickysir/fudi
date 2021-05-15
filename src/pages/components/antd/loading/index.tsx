import { Spin } from 'antd'
import React from 'react'
import './index.less'

interface Props {
    style?: any,
    size?: "small" | "default" | "large"
}
const FullScreenLoading = (props: Props) => {
    const { style, size = "large" } = props;
    return (
        <div className="example" style={style}>
            <Spin size={size} />
        </div>
    )
}

export default FullScreenLoading
