/*
 * @Author: your name
 * @Date: 2021-03-04 10:31:27
 * @LastEditTime: 2021-03-04 10:40:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/web/resetpwd/resetpassword.tsx
 */
/*
 * @Author: your name
 * @Date: 2021-03-04 10:25:22
 * @LastEditTime: 2021-03-04 10:28:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/web/resetpassword/index.tsx
 */
import React from 'react'
import { Form, Input, Button } from 'antd';
import { LockOutlined } from '@ant-design/icons';


const Changepassword = () => {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };
    return (
        <div>
            <h1>Change Password</h1>
            <Button type="primary">Back</Button>
            <div>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <div>Check your email. We have sent a password recover instructions to your email.</div>
                    <Form.Item
                        name="confirmationCode"
                        rules={[{ required: true, message: 'Please input your Confirmation Code!' }]}
                    >
                        <Input placeholder="Confirmation Code" />
                    </Form.Item>
                    <Form.Item
                        name="newPassword"
                        rules={[{ required: true, message: 'Please input your New Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="New Password"
                        />
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        rules={[{ required: true, message: 'Please input your Confirm Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Confirm Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">Change Password</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Changepassword
