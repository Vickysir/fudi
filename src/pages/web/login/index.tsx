/*
 * @Author: your name
 * @Date: 2021-03-02 14:36:13
 * @LastEditTime: 2021-03-22 10:47:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /GitHub/fudi/src/pages/web/login/index.tsx
 */
import React, { useEffect, useState } from 'react'
import { useGoogleLogin } from 'react-google-login'
import AppleLogin from 'react-apple-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { Link } from 'react-router-dom'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import WebFooter from '@/pages/components/header/webFooter';
import WebHeader from '@/pages/components/header/webHeader';
import google from '@/assets/images/common/login/google.png'
import fb from '@/assets/images/common/login/fb.png'
import apple from '@/assets/images/common/login/apple.png'
import axios from 'axios';
import { apiPath } from '@/pages/api';
import './index.less'



const Login = () => {
    const [form] = Form.useForm();
    const { signIn, loaded } = useGoogleLogin({
        onSuccess: onSuccess,
        onFailure: onFailure,
        clientId: "473960765414-67u4bo8orupa8fbps4ic47v8sr9i2oca.apps.googleusercontent.com",
    })
    // useEffect(() => {
    //     axios.post(apiPath.login, { "password": "helloworld", "name": "spring" }).then((res) => {
    //         console.log('res', res)
    //     }).catch(err => {
    //         console.log('err', err)
    //     })
    // }, [])




    // login
    function onSignIn() {
        signIn()
    }
    function onSuccess(res) {
        console.log('^^^^^^^^^^res', res)
    }
    function onFailure(error) {
        console.log('^^^^^^^^^^error', error)
    }

    // 表单 
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    return (
        <>
            <WebHeader />
            <div className="login-wrap">
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
                            <Input
                                size="large"
                                prefix={<UserOutlined className="site-form-item-icon" style={{ "margin": "0 1rem" }} />}
                                placeholder="Username"
                                style={{ "borderRadius": "5rem", "margin": "0.5rem 0" }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input.Password
                                size="large"
                                prefix={<LockOutlined className="site-form-item-icon" style={{ "margin": "0 1rem" }} />}
                                placeholder="Password"
                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                style={{ "borderRadius": "5rem", "margin": "0.5rem 0" }}
                            />
                        </Form.Item>
                        <Form.Item>
                            <div className="login-form-forgot">
                                <Link to='/restpassword'>Forgot password</Link>
                            </div>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                size="large"
                                shape="round"
                                block
                            >
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className="login-form-thirdparty">
                    <img src={google} alt="icon" onClick={onSignIn} />
                    <FacebookLogin
                        appId="127554539221626"
                        callback={onSuccess}
                        render={renderProps => (
                            <img src={fb} onClick={renderProps.onClick} alt="icon" />
                        )}
                    />
                    <AppleLogin
                        clientId="com.react.apple.login"
                        redirectURI="http://localhost:8585"
                        callback={onSuccess}
                        render={(renderProps) =>
                            <img src={apple} onClick={renderProps.onClick} alt="icon" />
                        }
                    />
                </div>
                <div className="login-form-regist">
                    Don’t have an account?<Link to='/regist'>Sign Up</Link>
                </div>
            </div>
            <WebFooter />
        </>
    )
}

export default Login
