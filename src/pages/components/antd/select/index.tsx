import React, { useState } from 'react'
import { Select } from 'antd';
import './index.less'

const { Option } = Select;

type SelectValue = {
    key: string
    label: string
    value: string
}
interface props {
    type: string // select 类型
    style?: any
    defaultValue?: SelectValue
    onChange: (value: SelectValue) => void
}

const RoundSelect = (props: props) => {
    const [selectValue, setSelectValue] = useState(props.defaultValue)
    const getOption = (type: string) => {
        let optionList = [];
        switch (type) {
            case "orderType": {
                optionList = [
                    { key: "0", label: "Delivery", value: "0", },
                    { key: "1", label: "Collect", value: "1", },
                ]
            }

                break;

            default:
                optionList = []
                break;
        }

        return optionList.map((item, index) => {
            return <Option key={item.key} value={item.key}>{item.label}</Option>
        })
    }
    const handleOnChange = (value: SelectValue) => {
        setSelectValue(value)
        props.onChange(value)
    }
    return (
        <div className="orderType-wrap">
            <Select
                style={{ width: 120, ...props?.style }}
                size="large"
                defaultActiveFirstOption
                labelInValue
                showArrow={true}  //样式乱了
                value={selectValue}
                {...props}
                onChange={handleOnChange}

            >
                {getOption(props.type)}
            </Select>
        </div>
    )
}

export default RoundSelect
