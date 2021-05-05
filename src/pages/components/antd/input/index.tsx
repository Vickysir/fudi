import React from 'react'
import { Input } from 'antd'


interface props {
    style?: any
}
const RoundInput = (props) => {
    return (
        <Input
            size="large"
            {...props}
            style={{ ...props?.style, "borderRadius": "5rem" }}
        />
    )
}

export default RoundInput
