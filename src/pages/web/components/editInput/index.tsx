import React, { useEffect, useState } from 'react'
import { Button, Form, Input, message, Select } from 'antd';
import Icon from '@ant-design/icons';
import iconFlagUK from '@/assets/images/common/icon/flag-UK.svg'
import iconFlagLreland from '@/assets/images/common/icon/flag-Lreland.svg'
import { MailOutlined, UserOutlined, PhoneOutlined, CreditCardOutlined, EnvironmentOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import style from '@/styles/theme/icon.less'
import "./index.less"
import { APIPersonalCenterUpdateEmail, APIPersonalCenterUpdateNickname, APIPersonalCenterUpdatePhone, APIRemoveAddress, APIUpdatePhoneVerificationCode } from '@/pages/api/request';
import { useAppStore } from '@/__internal';
import { clearTimer, handleClickTimer } from '@/utils/timer';
import MessageModal from '@/pages/components/antd/modal/messageModal';

const { Option } = Select;

interface Props {
    icon?: any
    textValue: string
    type: string
    delete?: boolean
    edit?: boolean
    refetchAdressList?: () => void
    adddressId?: number
}

const EditInput = (props: Props) => {
    const [isEdit, setIsEdit] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [phonePrefix, setphonePrefix] = useState("+353")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [phoneCode, setPhoneCode] = useState("")
    const commonInfo = useAppStore("commonInfo")




    const handleClickEdit = () => {
        setIsEdit(false);
    }
    const handleClickDelete = () => {
        deleteInputPost(props.type)
        props.refetchAdressList();
    }
    const handleClickSave = (type: string) => {
        switch (type) {
            case "phone":
                {
                    if (phoneNumber === "") {
                        message.info(`Place input phone number`)
                        return
                    }
                    if (phoneCode === "") {
                        message.info(`Place input code`)
                        return
                    }
                    editInputPost(props.type);
                }

                break;

            default: {
                if (inputValue === "") {
                    message.info(`Place input ${props.type}`)
                    return
                }
                editInputPost(props.type);
                setIsEdit(true);
            }
                break;
        }

    }
    const handleClickCancel = () => {
        setIsEdit(true);
        setInputValue("")
        setphonePrefix("+353")
        setPhoneNumber("")
        setPhoneCode("")
    }

    const editInputPost = async (type: string) => {
        switch (type) {
            case "username": {
                await APIPersonalCenterUpdateNickname({ "nickname": inputValue });
                message.success("Modify successful");
                APP_STORE.authInfo = {
                    ...APP_STORE.authInfo,
                    nickname: inputValue
                }
            }
                break;
            case "email": {
                await APIPersonalCenterUpdateEmail({ "email": inputValue });
                message.success("Modify successful");
                APP_STORE.authInfo = {
                    ...APP_STORE.authInfo,
                    email: inputValue
                }
            }
                break;
            case "phone": {
                const { event } = await APIPersonalCenterUpdatePhone({ "phone": phoneNumber, "code": phoneCode });
                if (event === "ERROR") return
                message.success("Modify successful");
                APP_STORE.authInfo = {
                    ...APP_STORE.authInfo,
                    phone: phoneNumber
                }
                setIsEdit(true);
            }
                break;

        }
    }
    const deleteInputPost = async (type: string) => {
        switch (type) {
            case "adress": {
                await APIRemoveAddress({ id: props.adddressId });
                setIsOpen(false);
                message.success("Delete successful")
            }
                break;
        }
    }
    // 处理电话号码前缀change
    function handelSelectChange(value: string) {
        setphonePrefix(value);
    }

    const selectBefore = (
        <Select
            value={phonePrefix}
            onChange={handelSelectChange}
            className="select-before citizenship"
            bordered={false}
        >
            <Option value="+353">+353</Option>
            <Option value="+44">+44</Option>
        </Select>
    );
    //根据用户手机区号的选择，更换flag
    function SelectFlag(value: string) {
        let content = null;
        switch (value) {
            case "+353":
                content = <Icon component={iconFlagLreland} style={{ fontSize: "2.5rem" }} />
                break;
            case "+44":
                content = <Icon component={iconFlagUK} style={{ fontSize: "2.5rem" }} />
                break;
            default:
                content = <Icon component={iconFlagLreland} style={{ fontSize: "2.5rem" }} />
        }
        return content
    }
    const renderEditInput = (type: string) => {
        let content = null;
        switch (type) {
            case "phone":
                content =
                    <>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <Input
                                prefix={
                                    <>
                                        {SelectFlag(phonePrefix)}
                                        {selectBefore}
                                    </>
                                }
                                placeholder="000 000 00 00"
                                size="large"
                                style={{ "borderRadius": "5rem", "margin": "0.5rem 1rem 0.5rem 0" }}
                                value={phoneNumber}
                                onChange={(event) => setPhoneNumber(event.target.value)}

                            />
                            {
                                commonInfo ?
                                    <Button
                                        type="primary"
                                        className="login-form-button"
                                        size="large"
                                        shape="round"
                                        disabled={!commonInfo.liked}
                                        onClick={handelClickApplyPhoneVerification}
                                    >
                                        {commonInfo.liked ? "Apply" : `${commonInfo.count} s later`}
                                    </Button>
                                    :
                                    <Button
                                        type="primary"
                                        className="login-form-button"
                                        shape="round"
                                        size="large"
                                        onClick={handelClickApplyPhoneVerification}
                                    >
                                        Apply
                                    </Button>
                            }
                        </div>
                        <Input
                            placeholder="4-digits code"
                            size="large"
                            style={{ "borderRadius": "5rem", "margin": "0.5rem 0", "paddingLeft": "2rem" }}
                            value={phoneCode}
                            onChange={(event) => setPhoneCode(event.target.value)}
                        />
                    </>

                break;

            default: {
                content =
                    <Input
                        size="large"
                        prefix={props.icon}
                        placeholder={props.textValue}
                        style={{ "borderRadius": "5rem", "margin": "0.5rem 0" }}
                        value={inputValue}
                        onChange={(event) => setInputValue(event.target.value)}

                    />
            }
                break;
        }
        return content
    }
    const handelClickApplyPhoneVerification = async () => {
        if (phoneNumber === "") {
            message.info(`Place input ${props.type}`)
            return
        }
        await APIUpdatePhoneVerificationCode({ "phone": phonePrefix + phoneNumber });
        message.success("The verification code has been sent");
        //开始倒计时
        APP_STORE.commonInfo = {
            ...APP_STORE.commonInfo,
            count: 60,
            liked: false,
        };
        handleClickTimer();
    }
    useEffect(() => {
        //计时器
        handleClickTimer();
    }, [])




    return (
        <>
            {
                isEdit ?
                    <div className="editInput-text">
                        <div className="inaline">
                            {props.icon}
                            {props.textValue}
                        </div>
                        <div>
                            {
                                props.edit && <EditOutlined className={style.themeColor} onClick={handleClickEdit} style={{ fontSize: "1.5rem", marginRight: "1rem" }} />
                            }
                            {
                                props.delete && <DeleteOutlined onClick={() => { setIsOpen(true) }} style={{ fontSize: "1.5rem" }} />
                            }
                        </div>
                    </div>
                    :
                    <div>
                        {renderEditInput(props.type)}
                        <div className="editInput-save" >
                            <span onClick={handleClickCancel}>Cancel</span>
                            <span onClick={() => handleClickSave(props.type)} >Save</span>
                        </div>
                    </div>
            }
            {/* 删除确认模态框 */}
            <MessageModal
                isOpen={isOpen}
                isClose={() => { setIsOpen(false) }}
                footer={
                    <>
                        <Button style={{ marginRight: "1rem" }} shape="round" onClick={() => { setIsOpen(false) }}>Cancel</Button>
                        <Button type="primary" shape="round" onClick={handleClickDelete}>Ok</Button>
                    </>
                }
                content={
                    <>
                        Delete
                        <p className="booktableSuccess-content">Are you sure to delete?</p>
                    </>
                }
            />

        </>
    )
}

export default EditInput
