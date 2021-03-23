/*
 * @Author: your name
 * @Date: 2021-03-15 09:12:17
 * @LastEditTime: 2021-03-18 15:08:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/web/personalCenter/myInfor/index.tsx
 */
import React from 'react'
import { MailOutlined, UserOutlined, PhoneOutlined, CreditCardOutlined, EnvironmentOutlined, HomeOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import './index.less';

const MyInfor = () => {

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    return (
        <div className="myInfor-wrap">
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item>
                    <h3 className="myInfor-wrap-title">Edit My Info</h3>
                </Form.Item>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Full Name!' }]}
                >
                    <Input
                        size="large"
                        prefix={<UserOutlined className="site-form-item-icon" style={{ "margin": "0 1rem" }} />}
                        placeholder="Full Name"
                        style={{ "borderRadius": "5rem", "margin": "0.5rem 0" }}
                    />
                </Form.Item>
                <Form.Item
                    name="telphone"
                    rules={[{ required: true, message: 'Please input your Phone Number!' }]}
                >
                    <Input
                        prefix={<PhoneOutlined className="site-form-item-icon" style={{ "margin": "0 1rem" }} />}
                        placeholder="+353 000 000 00 00"
                        size="large"
                        style={{ "borderRadius": "5rem", "margin": "0.5rem 0" }}
                    />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your Eamil!' }]}
                >
                    <Input
                        prefix={<MailOutlined style={{ "margin": "0 1rem" }} />}
                        placeholder="Eamil"
                        size="large"
                        style={{ "borderRadius": "5rem", "margin": "0.5rem 0" }}
                    />
                </Form.Item>
                <Form.Item>
                    <h3 className="myInfor-wrap-title">Edit My Address</h3>
                </Form.Item>
                <Form.Item
                    name="location"
                    rules={[{ required: true, message: 'Please input your Location!' }]}
                >
                    <Input
                        prefix={<EnvironmentOutlined className="site-form-item-icon" style={{ "margin": "0 1rem" }} />}
                        placeholder="Grafton Street, Dublin"
                        size="large"
                        style={{ "borderRadius": "5rem", "margin": "0.5rem 0" }}
                    />
                </Form.Item>
                <Form.Item
                    name="address"
                    rules={[{ required: true, message: 'Please input your House Number' }]}
                >
                    <Input
                        size="large"
                        prefix={<HomeOutlined className="site-form-item-icon" style={{ "margin": "0 1rem" }} />}
                        placeholder="House Number"
                        style={{ "borderRadius": "5rem", "margin": "0.5rem 0" }}
                    />
                </Form.Item>
                <Form.Item
                    name="card"
                    rules={[{ required: true, message: 'Please input your Card!' }]}
                >
                    <Input
                        prefix={<CreditCardOutlined style={{ "margin": "0 1rem" }} />}
                        placeholder="AB 23"
                        size="large"
                        style={{ "borderRadius": "5rem", "margin": "0.5rem 0" }}
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
    )
}

export default MyInfor