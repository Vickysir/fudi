import React, { useState } from 'react'
import { Button, Form, Input } from 'antd';
import { MailOutlined, UserOutlined, PhoneOutlined, CreditCardOutlined, EnvironmentOutlined, HomeOutlined, EditOutlined } from '@ant-design/icons';

interface Props {

}
const EditInput = (props: Props) => {
    const [isEdit, setIsEdit] = useState(true);

    const handleClickEdit = () => {
        setIsEdit(false);
    }
    const handleClickSave = () => {
        setIsEdit(true);
    }

    return (
        <>
            {
                isEdit ?
                    <div>
                        <UserOutlined className="site-form-item-icon" style={{ "margin": "0 1rem" }} />
                        Full Name
                        <EditOutlined onClick={handleClickEdit} />
                    </div>
                    :
                    <div>
                        <Input
                            size="large"
                            prefix={<UserOutlined className="site-form-item-icon" style={{ "margin": "0 1rem" }} />}
                            placeholder="Full Name"
                            style={{ "borderRadius": "5rem", "margin": "0.5rem 0" }}
                        />
                        <span onClick={handleClickSave}>Save</span>
                    </div>
            }

        </>
    )
}

export default EditInput
