import React, { useEffect, useState } from 'react'
import { Select } from 'antd';
import './index.less'
import { fetchPlacees } from '../../map/placeService';
import { APICollectShopList } from '@/pages/api/request';

const { Option } = Select;

type SelectValue = {
    key: string
    label: string
    value: string
}
interface props {
    type: string // select 类型
    style?: any
    needDefaultValue?: boolean
    showArrow?: boolean
    onChange: (value: SelectValue) => void
}

const RoundSelect = (props: props) => {
    const { type, needDefaultValue = false, showArrow = true, } = props;
    const [selectValue, setSelectValue] = useState(undefined)
    let optionList = [];

    const getOption = (type: string) => {
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
            return <Option key={item.value} value={item.value}>{item.label}</Option>
        })
    }
    const handleOnChange = (value: SelectValue) => {
        setSelectValue(value)
        props.onChange(value)
    }
    useEffect(() => {
        if (needDefaultValue) setSelectValue(optionList[0])
    }, [])
    return (
        <div className="orderType-wrap">
            <Select
                style={{ width: 120, ...props?.style }}
                size="large"
                defaultActiveFirstOption
                labelInValue
                showArrow={showArrow}
                value={selectValue}
                {...props}
                onChange={handleOnChange}

            >
                {getOption(type)}
            </Select>
        </div>
    )
}

export default RoundSelect
