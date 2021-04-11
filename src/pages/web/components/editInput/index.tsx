import React, { useState } from 'react'
import { Button, Form, Input, message } from 'antd';
import { MailOutlined, UserOutlined, PhoneOutlined, CreditCardOutlined, EnvironmentOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import style from '@/styles/theme/icon.less'
import "./index.less"
import { APIPersonalCenterUpdateEmail, APIPersonalCenterUpdateNickname } from '@/pages/api/request';
import { useAppStore } from '@/__internal';
interface Props {
    icon?: any
    textValue: string
    type: string
    delete?: boolean
    refetchAdressList?: () => void
}
const EditInput = (props: Props) => {
    const [isEdit, setIsEdit] = useState(true);
    const [inputValue, setInputValue] = useState("");

    const handleClickEdit = () => {
        setIsEdit(false);
    }
    const handleClickDelete = () => {
        deleteInputPost(props.type)
        // reload adress list 

    }
    const handleClickSave = () => {
        console.log("inputValue", inputValue)
        if (inputValue === "") {
            message.info(`Place input ${props.type}`)
            return
        }
        setIsEdit(true);
        editInputPost(props.type);
    }
    const handleClickCancel = () => {
        setIsEdit(true);
        setInputValue("")
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
                break;

        }
    }
    const deleteInputPost = async (type: string) => {
        switch (type) {
            case "adress": {

            }
                break;

        }
    }

    return (
        <>
            {
                isEdit ?
                    <div className="editInput-text">
                        <div className="inaline">
                            {
                                props.icon
                            }
                            {
                                props.textValue
                            }
                        </div>
                        <div>
                            <EditOutlined className={style.themeColor} onClick={handleClickEdit} style={{ fontSize: "1.5rem", marginRight: "1rem" }} />
                            {
                                props.delete ? <DeleteOutlined onClick={handleClickDelete} style={{ fontSize: "1.5rem" }} /> : null
                            }
                        </div>
                    </div>
                    :
                    <div>
                        <Input
                            size="large"
                            prefix={props.icon}
                            placeholder={props.textValue}
                            style={{ "borderRadius": "5rem", "margin": "0.5rem 0" }}
                            value={inputValue}
                            onChange={(event) => setInputValue(event.target.value)}

                        />
                        <div className="editInput-save" >
                            <span onClick={handleClickCancel}>Cancel</span>
                            <span onClick={handleClickSave} >Save</span>
                        </div>
                    </div>
            }

        </>
    )
}

export default EditInput
