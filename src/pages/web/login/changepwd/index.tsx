/*
 * @Author: your name
 * @Date: 2021-03-04 10:25:22
 * @LastEditTime: 2021-03-23 16:28:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/web/resetpassword/index.tsx
 */
import React from 'react'
import { Form, Input, Button, message } from 'antd';
import { LockOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import WebFooter from '@/pages/components/header/webFooter';
import WebHeader from '@/pages/components/header/webHeader';
import BaackTitle from '../../components/baackTitle';
import { withRouter } from 'react-router-dom';
import { handleCfmPwd } from '@/pages/components/antd/validator';
import { APIResetPwd } from '@/pages/api/request';



const Changepassword = (props) => {
    const { history } = props;
    const [form] = Form.useForm();


    const onFinish = async (values: any) => {
        console.log('Received values of form: ', values);
        const { code, password } = values;
        // 发送 api 获取注册邮箱验证码
        try {
            const resetPwdInfo = APP_STORE.resetPwdInfo;
            const { event, data } = await APIResetPwd({ ...resetPwdInfo, code, password });
            if (event === "SUCCESS") {
                message.success("Password reset successfully");
                // 重置store
                APP_STORE.resetPwdInfo = null;
                history.push("/home/login");

            }
        } catch (err) {
            console.log('err', err);
        }
    };

    return (
        <>
            <div>
                <BaackTitle titleContent="Change Password" />
                <div className="login-wrap">
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        form={form}
                    >
                        <Form.Item>
                            <div className="login-wrap-tips">Check your email. We have sent a password recover instructions to your email.</div>
                        </Form.Item>
                        <Form.Item
                            name="code"
                            rules={[{ required: true, message: 'Please input your Confirmation Code!' }]}
                        >
                            <Input
                                placeholder="Confirmation Code"
                                size="large"
                                style={{ "borderRadius": "5rem", "margin": "0.5rem 0", "paddingLeft": "2rem" }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
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
                            rules={[
                                { required: true, message: 'Please input your Confirm Password!' },
                                { validator: handleCfmPwd(form, "password") }

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
                                style={{ "margin": "0.5rem 0" }}
                            >
                                Change Password
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default withRouter(Changepassword)
