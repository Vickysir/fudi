/*
 * @Author: your name
 * @Date: 2021-03-22 11:35:07
 * @LastEditTime: 2021-03-23 13:18:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/web/regist/index.tsx
 */
/*
 * @Author: your name
 * @Date: 2021-03-04 10:25:22
 * @LastEditTime: 2021-03-22 11:34:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/web/resetpassword/index.tsx
 */
import React, { useEffect, useState } from 'react'
import { Form, Input, Button } from 'antd';
import { MailOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import WebFooter from '@/pages/components/header/webFooter';
import WebHeader from '@/pages/components/header/webHeader';
import BaackTitle from '../components/baackTitle';
import google from '@/assets/images/common/login/google.png'
import fb from '@/assets/images/common/login/fb.png'
import apple from '@/assets/images/common/login/apple.png'
import { useGoogleLogin } from 'react-google-login'
import AppleLogin from 'react-apple-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { Link, withRouter } from 'react-router-dom';
import { emailValidator, handleCfmPwd } from '@/pages/components/antd/validator';



const Regist = (props) => {
    const { history } = props;
    const [form] = Form.useForm();

    const { signIn, loaded } = useGoogleLogin({
        onSuccess: onSuccess,
        onFailure: onFailure,
        clientId: "473960765414-67u4bo8orupa8fbps4ic47v8sr9i2oca.apps.googleusercontent.com",
    })

    const onFinish = (values: any) => {
        history.push("/setupphone");
        // 存入store
        APP_STORE.registInfo = values;
    };

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


    return (
        <>
            <WebHeader />
            <div>
                <BaackTitle titleContent="Sign up" />
                <div className="login-wrap">
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        form={form}
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: 'Please input your Email!' },
                                { validator: emailValidator() }

                            ]}
                            validateFirst={true}
                        >
                            <Input
                                size="large"
                                prefix={<MailOutlined className="site-form-item-icon" style={{ "margin": "0 1rem" }} />}
                                placeholder="Email"
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
                        <Form.Item
                            name="againPassword"
                            rules={[
                                { required: true, message: 'Please input your Confirm Password!' },
                                { validator: handleCfmPwd(form) }

                            ]}
                            validateFirst={true}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" style={{ "margin": "0 1rem" }} />}
                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                placeholder="Confirm Password"
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
                            >
                                Sign Up
                            </Button>
                        </Form.Item>
                    </Form>
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
                        Already have an account?<Link to='/login'>Log In</Link>
                    </div>
                </div>
            </div>
            <WebFooter />
        </>
    )
}

export default withRouter(Regist)
