/*
 * @Author: your name
 * @Date: 2021-03-04 17:53:51
 * @LastEditTime: 2021-03-04 17:57:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/web/personalCenter/sendQ/index.tsx
 */
import React, { useState } from 'react'
import { Form, Input, Button } from 'antd';
import { LockOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import InfoModel from './comfirm';
import './index.less';
import { handleCfmPwd } from '@/pages/components/antd/validator';



const Changepwd = () => {
    const [isOpen, setisOpen] = useState(false);
    const [data, setdata] = useState(null);
    const [form] = Form.useForm();


    const onClickOpen = () => {
        setisOpen(true);
    }
    const onCloseInfo = () => {
        setisOpen(false);
    }
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        setdata(values);
        onClickOpen();
    };
    return (
        <div className="personal-changepwd-wrap">
            <h3>Change Password</h3>
            <div>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    form={form}
                >
                    <Form.Item
                        name="oldPassword"
                        rules={[{ required: true, message: 'Please input your Old Password!' }]}
                    >
                        <Input.Password
                            size="large"
                            prefix={<LockOutlined className="site-form-item-icon" style={{ "margin": "0 1rem" }} />}
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            placeholder="Old Password"
                            style={{ "borderRadius": "5rem", }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="newPassword"
                        rules={[{ required: true, message: 'Please input your New Password!' }]}
                    >
                        <Input.Password
                            size="large"
                            prefix={<LockOutlined className="site-form-item-icon" style={{ "margin": "0 1rem" }} />}
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            placeholder="New Password"
                            style={{ "borderRadius": "5rem", }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="againNewPassword"
                        rules={[
                            { required: true, message: 'Please input your Confirm Password!' },
                            { validator: handleCfmPwd(form, "newPassword") }

                        ]}
                        validateFirst={true}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" style={{ "margin": "0 1rem" }} />}
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            placeholder="Confirm Password"
                            size="large"
                            style={{ "borderRadius": "5rem", }}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            size="large"
                            shape="round"
                            block
                            style={{ "margin": "0.5rem 0" }}
                        >
                            Save
                            </Button>
                    </Form.Item>
                </Form>
            </div>
            <InfoModel isOpen={isOpen} onClose={onCloseInfo} submitData={data} />
        </div>
    )
}

export default Changepwd