import React, { useEffect, useState } from 'react'
import { Rate, Modal, Input, Button, Select, DatePicker, message } from 'antd';
import { RightOutlined, UserOutlined, TeamOutlined, HistoryOutlined, CheckOutlined, PhoneOutlined } from '@ant-design/icons';
import moment from 'moment';
import './index.less'
import { isLogin } from '@/utils';
import { useAppStore } from '@/__internal';

const { TextArea } = Input;
const { Option } = Select;

const FormModal = (props) => {
    const { isOpen, isClose } = props;
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
    const [editForTimeValue, setEditForTimeValue] = useState("")
    const [editForNoteValue, setEditForNoteValue] = useState("")

    useEffect(() => {
        setvisible(isOpen);
    }, [isOpen])

    const handleOk = () => {
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
            editForWhoValue,
            editForNameValue,
            editForPhoneValue,
            editForNumValue,
            editForTimeValue,
            editForNoteValue
        }
        console.log(submint);
        setvisible(false);
        isClose("ok");
    }
    const handleCancel = (e) => {
        console.log(e);
        setvisible(false);
        isClose("cancel");
    }




    const handleEditForWho = () => {
        setIsEditForWho(true);
    }
    const handleChangeForWho = (value) => {
        setEditForWhoValue(value)
        setIsEditForWho(false);
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
        console.log(`value`, value)
        setEditForTimeValue(value)
    }
    const handleChangeForNote = (e) => {
        const value = e.target.value;
        setEditForNoteValue(value)
    }



    function disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }
    function disabledDateTime() {
        return {
            disabledHours: () => [1, 20],
            disabledMinutes: () => [30, 60],
            disabledSeconds: () => [55, 56],
        };
    }

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
                                            disabledTime={disabledDateTime}
                                        />
                                    </div>
                                    :
                                    <>
                                        <span>19:00, 21 Jan 2021</span>
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
