/*
 * @Author: your name
 * @Date: 2021-03-04 10:25:22
 * @LastEditTime: 2021-03-04 10:40:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/web/resetpassword/index.tsx
 */
import React from 'react'
import { Form, Input, Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import BaackTitle from '../../components/baackTitle';
import WebFooter from '@/pages/components/header/webFooter';
import WebHeader from '@/pages/components/header/webHeader';
import { withRouter } from 'react-router-dom';


const Restpassword = (props) => {
    const { history } = props;
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        history.push("/changepassword");
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
