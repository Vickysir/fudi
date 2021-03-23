/*
 * @Author: your name
 * @Date: 2021-03-04 10:25:22
 * @LastEditTime: 2021-03-23 16:16:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/web/resetpassword/index.tsx
 */
import React from 'react'
import { Form, Input, Button, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import BaackTitle from '../../components/baackTitle';
import WebFooter from '@/pages/components/header/webFooter';
import WebHeader from '@/pages/components/header/webHeader';
import { withRouter } from 'react-router-dom';
import { APIEmailVerificationCode } from '@/pages/api/request';


const Restpassword = (props) => {
    const { history } = props;
    const onFinish = async (values: any) => {
        // email 存入store
        APP_STORE.resetPwdInfo = { ...values };
        // 发送 api 获取注册邮箱验证码
        try {
            const { event, data } = await APIEmailVerificationCode(values);
            if (event === "SUCCESS") {
                message.success("The verification code has been sent");
                // token 存入store
                let resetPwdInfo = Object.assign(APP_STORE.resetPwdInfo, { ...data })
                APP_STORE.resetPwdInfo = resetPwdInfo;
                history.push("/changepassword");
            }
        } catch (err) {
            console.log('err', err);
        }
    };
    return (
        <>
            <WebHeader />
            <div>
                <BaackTitle titleContent="Reset Password" />
                <div className="login-wrap">
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
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
                            <div className="login-wrap-tips">
                                Enter the email associated with your account and we’ll send an email with instructions to reset your password.
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
                                Reset
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            <WebFooter />
        </>
    )
}

export default withRouter(Restpassword)
