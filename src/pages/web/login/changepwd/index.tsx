/*
 * @Author: your name
<<<<<<< HEAD
=======
 * @Date: 2021-03-04 10:31:27
 * @LastEditTime: 2021-03-04 10:40:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/web/resetpwd/resetpassword.tsx
 */
/*
 * @Author: your name
>>>>>>> feat(init):初始化,homepage
 * @Date: 2021-03-04 10:25:22
 * @LastEditTime: 2021-03-04 10:28:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/web/resetpassword/index.tsx
 */
import React from 'react'
import { Form, Input, Button } from 'antd';
import { LockOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import WebFooter from '@/pages/components/header/webFooter';
import WebHeader from '@/pages/components/header/webHeader';
import BaackTitle from '../../components/baackTitle';
import { withRouter } from 'react-router-dom';



const Changepassword = (props) => {
    const { history } = props;

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        history.push("/login");
    };

    return (
        <>
            <WebHeader />
            <div>
                <BaackTitle titleContent="Change Password" />
                <div className="login-wrap">
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item>
                            <div className="login-wrap-tips">Check your email. We have sent a password recover instructions to your email.</div>
                        </Form.Item>
                        <Form.Item
                            name="confirmationCode"
                            rules={[{ required: true, message: 'Please input your Confirmation Code!' }]}
                        >
                            <Input
                                placeholder="Confirmation Code"
                                size="large"
                                style={{ "borderRadius": "5rem", "margin": "0.5rem 0", "paddingLeft": "2rem" }}
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
                                style={{ "borderRadius": "5rem", "margin": "0.5rem 0" }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="confirmPassword"
                            rules={[{ required: true, message: 'Please input your Confirm Password!' }]}
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
                                style={{ "margin": "0.5rem 0" }}
                            >
                                Change Password
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            <WebFooter />
        </>
    )
}

export default withRouter(Changepassword)
