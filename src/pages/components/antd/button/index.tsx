import React from 'react'
import { Button } from 'antd'

interface props {

}
const RoundButton = (props) => {
    return (
        <Button
            shape="round"
            size="large"
            {...props}
        >
            {props.children}
        </Button>
    )
}

export default RoundButton
