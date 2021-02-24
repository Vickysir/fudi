/*
 * @Author: your name
 * @Date: 2021-03-04 10:25:22
 * @LastEditTime: 2021-03-04 10:43:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/web/resetpassword/index.tsx
 */
import React from 'react'
import { Form, Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';


const Regist = () => {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };
    return (
        <div>
            <h1>Set up Phone</h1>
            <Button type="primary">Back</Button>
            <div>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="000 000 00 00" />
                        <div>
                            To proceed, please fill your phone number. You will receive an SMS with a verification code.
                        </div>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">Apply</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Regist
