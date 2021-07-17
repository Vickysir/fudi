import React, { useEffect, useState } from 'react'
import { Rate, Modal, Input, Button, Select, DatePicker, message } from 'antd';
import { RightOutlined, UserOutlined, TeamOutlined, HistoryOutlined, CheckOutlined, PhoneOutlined } from '@ant-design/icons';
import moment from 'moment';
import './index.less'
import { isLogin } from '@/utils';
import { useAppStore } from '@/__internal';
import { APIBookTable } from '@/pages/api/request';

const { TextArea } = Input;
const { Option } = Select;

const FormModal = (props) => {
    const { isOpen, isClose, shopId } = props;
    const authInfo = useAppStore("authInfo");

    const [visible, setvisible] = useState(false)
    const [isEditForWho, setIsEditForWho] = useState(false)
    const [editForWhoValue, setEditForWhoValue] = useState({ label: "For me", value: 1 })
    const [isEditForName, setIsEditForName] = useState(false)
    const [editForNameValue, setEditForNameValue] = useState("")
    const [isEditForPhone, setIsEditForPhone] = useState(false)
    const [editForPhoneValue, setEditForPhoneValue] = useState("")
    const [isEditForNum, setIsEditForNum] = useState(false)
    const [editForNumValue, setEditForNumValue] = useState(1)
    const [isEditForTime, setIsEditForTime] = useState(false)
    const [editForTimeValue, setEditForTimeValue] = useState<number>(moment(new Date()).valueOf())
    const [editForNoteValue, setEditForNoteValue] = useState("")

    useEffect(() => {
        setvisible(isOpen);
    }, [isOpen])

    const handleOk = async () => {
        if (editForWhoValue.value === 1) {// for me
            if (!isLogin(authInfo)) return message.error("Book table for yourself, Place login! or Book for Others！")
            setEditForNameValue(authInfo.nickname)
            setEditForPhoneValue(authInfo.phone)
        }
        // 校验数据必填
        if (!editForNameValue) return message.error("Place input your name !")
        if (!editForPhoneValue) return message.error("Place input your phone number !")
        if (!editForTimeValue) return message.error("Place input book time !")

        const submint = {
            "consignee": editForNameValue, //收货人
            "sex": 0,// 性别
            "phone": editForPhoneValue, //  电话
            "peopleNumber": editForNumValue, //
            "diningTime": editForTimeValue,    // 精确到毫秒 
            "shopId": shopId,
            //editForNoteValue
        }
        console.log(submint);
        try {
            await APIBookTable(submint);
            setvisible(false);
            isClose("ok");

        } catch (err) {
            console.log(err);
        }

    }
    const handleCancel = (e) => {
        setvisible(false);
        isClose("cancel");
    }




    const handleEditForWho = () => {
        setIsEditForWho(true);
    }
    const handleChangeForWho = (value) => {
        setEditForWhoValue(value)
        setIsEditForWho(false);
        if (value.value === 1) {// for me
            if (!isLogin(authInfo)) {
                setEditForNameValue('')
                setEditForPhoneValue('')
                return message.error("Book table for yourself, Place login! or Book for Others！")

            } else {
                setEditForNameValue(authInfo.nickname)
                setEditForPhoneValue(authInfo.phone)
            }
        }
    }
    const handleEditForName = () => {
        setIsEditForName(true);
    }
    const handleChangeForName = (e) => {
        const value = e.target.value;
        setEditForNameValue(value)
    }
    const handleEditForPhone = () => {
        setIsEditForPhone(true);
    }
    const handleChangeForPhone = (e) => {
        const value = e.target.value;
        setEditForPhoneValue(value)
    }
    const handleEditForNum = () => {
        setIsEditForNum(true);
    }
    const handleChangeForNum = (e) => {
        const value = e.target.value;
        setEditForNumValue(value)
    }
    const handleEditForTime = () => {
        setIsEditForTime(true);
    }
    const handleChangeForTime = (value) => {
        const time = moment(value).valueOf();
        console.log(`time`, time)
        setEditForTimeValue(time)
    }
    const handleChangeForNote = (e) => {
        const value = e.target.value;
        setEditForNoteValue(value)
    }



    function disabledDate(current) {
        // Can not select days before today and today
        // return current && current < moment().endOf('day');

        // 只能选择今天跟今天之后的日期：
        return current < moment().startOf('day');
    }
    function disabledDateTime() {
        return {
            disabledHours: () => [1, 20],
            disabledMinutes: () => [30, 60],
            disabledSeconds: () => [55, 56],
        };
    }
    useEffect(() => {
        if (!isLogin(authInfo)) {
            setEditForNameValue('')
            setEditForPhoneValue('')
        } else {
            setEditForNameValue(authInfo.nickname)
            setEditForPhoneValue(authInfo.phone)
        }
    }, [])

    return (
        <Modal
            visible={visible}
            onCancel={handleCancel}
            footer={null}
        >
            <div className="model-content">
                <header>
                    <h1>Book a Table</h1>
                </header>
                <ul>
                    <li>
                        <p><UserOutlined /></p>
                        {
                            isEditForWho ?
                                <div>
                                    <Select size="large" value={editForWhoValue} labelInValue style={{ width: "100% " }} showArrow={false} onChange={handleChangeForWho}>
                                        <Option value={1}>For me</Option>
                                        <Option value={2}>Others</Option>
                                    </Select>
                                </div>
                                :
                                <div>
                                    <span>{editForWhoValue.label}</span>
                                    <div onClick={handleEditForWho}><RightOutlined /></div>
                                </div>
                        }
                    </li>
                    {
                        editForWhoValue.value === 2 && (
                            <li>
                                <p><TeamOutlined /></p>
                                {
                                    isEditForName ?
                                        <div>
                                            <Input
                                                value={editForNameValue}
                                                placeholder="Input name ..."
                                                style={{ width: "100% " }}
                                                size="large"
                                                onChange={handleChangeForName}
                                                suffix={
                                                    <CheckOutlined onClick={() => setIsEditForName(false)} />
                                                }
                                            />
                                        </div>
                                        :
                                        <div>
                                            <span>{editForNameValue || "name"}</span>
                                            <div onClick={handleEditForName}><RightOutlined /></div>
                                        </div>
                                }
                            </li>
                        )}
                    {
                        editForWhoValue.value === 2 && (
                            <li>
                                <p><PhoneOutlined /></p>
                                {
                                    isEditForPhone ?
                                        <div>
                                            <Input
                                                value={editForPhoneValue}
                                                placeholder="000-000-000"
                                                type="number"
                                                size="large"
                                                style={{ width: "100% " }}
                                                onChange={handleChangeForPhone}
                                                suffix={
                                                    <CheckOutlined onClick={() => setIsEditForPhone(false)} />
                                                }
                                            />
                                        </div>
                                        :
                                        <div>
                                            <span>{editForPhoneValue || "Phone"}</span>
                                            <div onClick={handleEditForPhone}><RightOutlined /></div>
                                        </div>
                                }
                            </li>
                        )}
                    <li>
                        <p><TeamOutlined /></p>
                        <div>
                            <span>Number of People</span>
                            {
                                isEditForNum ?
                                    <div>
                                        <Input
                                            value={editForNumValue}
                                            placeholder="1"
                                            type="number"
                                            min={1}
                                            style={{ width: "90px" }}
                                            onChange={handleChangeForNum}
                                            suffix={
                                                <CheckOutlined onClick={() => setIsEditForNum(false)} />
                                            }
                                        />
                                    </div>
                                    :
                                    <div onClick={handleEditForNum}>{editForNumValue}</div>
                            }
                        </div>
                    </li>
                    <li>
                        <p><HistoryOutlined /></p>
                        <div>
                            {
                                isEditForTime ?
                                    <div style={{ width: "100% " }}>
                                        <DatePicker
                                            style={{ width: "100% " }}
                                            placeholder="Select time"
                                            showTime
                                            showNow={false}
                                            format="HH:mm, DD MMMM YYYY"
                                            onChange={handleChangeForTime}
                                            onOk={() => setIsEditForTime(false)}
                                            disabledDate={disabledDate}
                                        // disabledTime={disabledDateTime}
                                        />
                                    </div>
                                    :
                                    <>
                                        <span>{moment(editForTimeValue).format('"HH:mm, DD MMMM YYYY"').replace(/\"/g, "")}</span>
                                        <div onClick={handleEditForTime}>
                                            <RightOutlined />
                                        </div>
                                    </>
                            }
                        </div>
                    </li>
                </ul>
                <div>
                    <p>note</p>
                    <TextArea rows={6} placeholder="Write your note" onChange={handleChangeForNote} value={editForNoteValue} />
                </div>
                <div className="model-content-action">
                    <Button shape="round" type="primary" block onClick={handleOk}>Send</Button>
                </div>
            </div>
        </Modal >
    )
}

export default FormModal




function disabledDate(current) {
    // Can not select days before today and today
    //  return current && current < moment().endOf('day');
    // return current < moment().startOf("minute");
    return current && moment(current).isBefore(moment(), 'minute');

}
const disabledTime = current => {
    const hours = moment().hours()
    const minutes = moment().minutes()
    // const seconds = moment().seconds()
    const currentHour = moment(current).hour();
    if (current && moment(current).date() === moment().date()) {
        const hoursArry = getDisableHours(Number(openTIme.h), Number(closeTIme.h), Number(closeTIme.m));
        // setDisabledHoursArry(hoursArry);
        console.log(`营业时间：${commonInfo.startTimeFormat} - ${commonInfo.endTimeFormat}`)
        return {
            disabledHours: () => hoursArry,
            disabledMinutes: () => getDisableMinutes(hoursArry, currentHour, closeTIme)
        }
    }
    // TODO 其他日期，应该禁用掉非营业时间
    return {
        disabledHours: () => [],
        disabledMinutes: () => [],
        // disabledSeconds: () => [],
    }
}
const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
}
const getDisableHours = (start: number, end: number, minutesEnd: number) => {
    const current = moment().hours()

    let arry
    if (current <= start) {
        console.log(`arry 在营业时间开始前`)

        arry = [...range(0, 24).splice(0, start + 1), ...range(0, 24).splice(end, 24 - end)]
    }
    if (current > start && current <= (end - 1)) {
        if (minutesEnd > 0) {
            console.log(`minutesEnd >0`)

            arry = [...range(0, 24).splice(0, current + 1), ...range(0, 24).splice(end + 1, 24 - (end + 1))]
        } else {
            console.log(`整点`)

            arry = [...range(0, 24).splice(0, current + 1), ...range(0, 24).splice((end - 1), 24 - (end - 1))]
        }
        console.log(`arry 在营业区间`)
    }
    if (current > (end - 1)) {
        console.log(`arry 在营业时间结束后`)

        arry = [...range(0, 24)]
    }
    return arry
}

const getDisableMinutes = (disabledHours: number[], userSelectHour: number, closeTIme) => {
    const currentMinutes = moment().minutes()

    if (disabledHours.indexOf(userSelectHour) > 0) { // 小时都被禁用时
        return range(0, 60)

    } else {
        if (userSelectHour === moment().hours() + 1) {
            console.log(`配送1小时`)
            return range(0, 60).splice(0, currentMinutes);
        }
        if (userSelectHour === Number(closeTIme.h)) {
            console.log(`结束时间`)
            return range(0, 60).splice(Number(closeTIme.m), 60 - Number(closeTIme.m));
        }
        if (currentMinutes >= Number(closeTIme.m)) {
            return range(0, 60) //全部禁用
        }
        return []
    }
}
const getDefaultTime = (start, end) => {
    const currentDay = moment().days();
    const currentHour = moment().hours();
    const currentMinutes = moment().minutes();
    let h = 0;

    if (currentHour <= Number(start.h)) {
        h = Number(start.h) + 1
    }
    if (currentHour > Number(start.h) && currentHour < Number(end.h)) {
        h = currentHour + 1
    }
    if (currentHour >= Number(end.h)) {
    }

    return `${h}:${currentMinutes}`
}
