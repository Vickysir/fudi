import React, { useEffect, useState } from 'react'
import { Select, Spin } from 'antd';
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
    placeholder: string
    needDefaultValue?: boolean
    showArrow?: boolean
    onChange: (value: SelectValue) => void
}

const RoundSearchSelect = (props: props) => {
    const { type, needDefaultValue = false, showArrow = true, placeholder } = props;
    const [selectValue, setSelectValue] = useState(undefined)
    const [optionList, setOptionList] = useState([])
    const [fetching, setFetching] = useState(false)

    // const getOption = (type: string) => {
    //     switch (type) {
    //         case "collect": {
    //             console.log(`走这`)
    //         }
    //             break;

    //         default:
    //             optionList = []
    //             break;
    //     }
    //     return optionList.map((item, index) => {
    //         return <Option key={item.value} value={item.value}>{item.label}</Option>
    //     })
    // }
    const handleOnChange = (value: SelectValue) => {
        console.log(`value`, value)
        setSelectValue(value)
        props.onChange(value.value)
    }
    useEffect(() => {
        const res = [];
        setFetching(true)
        async function fetchApi() {
            const { data } = await APICollectShopList();
            console.log(`object`, data)
            data.forEach(r => {
                res.push({
                    value: r.id,
                    label: r.address,
                });
            });
            setOptionList(res)
            if (needDefaultValue) setSelectValue(res[0])
            setFetching(false)

        }
        fetchApi();
    }, [])
    return (
        <div className="orderType-wrap">
            <Select
                style={{ width: 120, ...props?.style }}
                size="large"
                defaultActiveFirstOption
                placeholder={placeholder}
                labelInValue
                showArrow={showArrow}
                value={selectValue}
                {...props}
                onChange={handleOnChange}
                notFoundContent={fetching ? <Spin size="small" /> : null}

            >
                {
                    optionList.map((item, index) => {
                        return <Option key={item.value} value={item.value}>{item.label}</Option>
                    })
                }
            </Select>
        </div>
    )
}

export default RoundSearchSelect
