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
                    if (phoneCode === "") {
                        message.info(`Place input code`)
                        return
                    }
                    // TODO 测试 更新phone
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
                message.success("Modify the success");
                APP_STORE.authInfo = {
                    ...APP_STORE.authInfo,
                    nickname: inputValue
                }
            }
                break;
            case "email": {
                await APIPersonalCenterUpdateEmail({ "email": inputValue });
                message.success("Modify the success");
                APP_STORE.authInfo = {
                    ...APP_STORE.authInfo,
                    email: inputValue
                }
            }
            case "phone": {
                const { event } = await APIPersonalCenterUpdatePhone({ "phone": phoneNumber, "code": phoneCode });
                if (event === "ERROR") return
                message.success("Modify the success");
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
                message.success("Delete the success")
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
            <Option value="+1">+1</Option>
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
        APP_STORE.commonInfo = {
            ...APP_STORE.commonInfo,
            count: 60,
            liked: false,
        };
        handleClickTimer();
    }
    // 离开 本页面 ，清除倒计时
    useEffect(() => {
        return () => {
            clearTimer();
            APP_STORE.commonInfo = {
                ...APP_STORE.commonInfo,
                liked: true,
                count: null
            };
        }
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
                                props.delete && <DeleteOutlined onClick={handleClickDelete} style={{ fontSize: "1.5rem" }} />
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

        </>
    )
}

export default EditInput
