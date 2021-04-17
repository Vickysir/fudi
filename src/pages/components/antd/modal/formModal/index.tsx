import React, { useEffect, useState } from 'react'
import { Rate, Modal, Input, Button, Select, DatePicker } from 'antd';
import { RightOutlined, UserOutlined, TeamOutlined, HistoryOutlined, CheckOutlined } from '@ant-design/icons';
import './index.less'

const { TextArea } = Input;
const { Option } = Select;

const FormModal = (props) => {
    const { isOpen, isClose } = props;
    const [visible, setvisible] = useState(false)
    const [isEditForWho, setIsEditForWho] = useState(false)
    const [editForWhoValue, setEditForWhoValue] = useState({ label: "For me", value: 1 })
    const [isEditForNum, setIsEditForNum] = useState(false)
    const [editForNumValue, setEditForNumValue] = useState(1)
    const [isEditForTime, setIsEditForTime] = useState(false)
    const [editForTimeValue, setEditForTimeValue] = useState("")

    useEffect(() => {
        setvisible(isOpen);
    }, [isOpen])

    const handleOk = (e) => {
        const submint = {
            editForWhoValue,
            editForNumValue,
            editForTimeValue
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
        console.log(`value`, value)
        setEditForWhoValue(value)
        setIsEditForWho(false);
    }
    const handleEditForNum = () => {
        setIsEditForNum(true);
    }
    const handleChangeForNum = (e) => {
        console.log(`value`, e.target.value)
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
                                        <Option value={2}>Lucy</Option>
                                    </Select>
                                </div>
                                :
                                <div>
                                    <span>{editForWhoValue.label}</span>
                                    <div onClick={handleEditForWho}><RightOutlined /></div>
                                </div>
                        }
                    </li>
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
                                            format="HH:mm, DD MMMM YYYY"
                                            onChange={handleChangeForTime}
                                            onOk={() => setIsEditForTime(false)}
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
                    <TextArea rows={6} placeholder="Write your note" />
                </div>
                <div className="model-content-action">
                    <Button shape="round" type="primary" block onClick={handleOk}>Send</Button>
                </div>
            </div>
        </Modal >
    )
}

export default FormModal
