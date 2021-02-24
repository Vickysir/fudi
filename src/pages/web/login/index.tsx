/*
 * @Author: your name
 * @Date: 2021-03-02 14:36:13
 * @LastEditTime: 2021-03-04 10:22:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /GitHub/fudi/src/pages/web/login/index.tsx
 */
import React, { useEffect, useState } from 'react'
import GoogleLogin from 'react-google-login';
import AppleLogin from 'react-apple-login';
import FacebookLogin from 'react-facebook-login';
import { Link } from 'react-router-dom'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Login = () => {
    const [form] = Form.useForm();

    useEffect(() => {

    }, []);

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };


    function onSignIn(googleUser) {
        console.log('^^^^^^^^^^', googleUser)
    }
    function onFailure(error) {
        console.log('^^^^^^^^^^error', error)
    }


    return (
        <div>
            <h1>Log In</h1>
            <div>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">Forgot password</a>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
                    </Form.Item>
                </Form>
            </div>
            <div>
                <GoogleLogin
                    clientId={"473960765414-67u4bo8orupa8fbps4ic47v8sr9i2oca.apps.googleusercontent.com"}
                    buttonText=""
                    onSuccess={onSignIn}
                    onFailure={onFailure}
                />

                <AppleLogin clientId="com.react.apple.login" redirectURI="http://localhost:8585" />

                <FacebookLogin
                    appId="127554539221626"
                    autoLoad={true}
                    fields="name,email,picture"
                    callback={onSignIn} />
            </div>
            <div>
                Don’t have an account?<Link to='/regist'>Regist</Link>
            </div>
        </div>
    )
}

export default Login
