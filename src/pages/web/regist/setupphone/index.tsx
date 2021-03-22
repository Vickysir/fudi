/*
 * @Author: your name
 * @Date: 2021-03-04 10:25:22
 * @LastEditTime: 2021-03-22 18:32:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/web/resetpassword/index.tsx
 */
import React from 'react'
import { Form, Input, Button, Select } from 'antd';
import { ShakeOutlined } from '@ant-design/icons';
import WebFooter from '@/pages/components/header/webFooter';
import WebHeader from '@/pages/components/header/webHeader';
import BaackTitle from '../../components/baackTitle';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { apiPath } from '@/pages/api';
import { PhoneVerificationCodePost } from '@/pages/api/types/login';


import './index.less'


const { Option } = Select;
const Setupphone = (props) => {
    const { history } = props;

    const onFinish = (values: PhoneVerificationCodePost) => {
        console.log('Received values of form: ', values);

        // 存入store
        Object.assign(APP_STORE.registInfo, { ...values });
        // 发送 api 获取注册手机验证码
        axios.post(apiPath.phoneVerificationCode, values)
            .then((res) => {
                console.log('res', res);
                history.push("/setupphone/verification");
            }).catch(err => {
                console.log('err', err);
            })
    };

    const selectBefore = (
        <Select defaultValue="353" id="citizenship" className="select-before citizenship" bordered={false}>
            <Option value="353">+353</Option>
            <Option value="086">+086</Option>
        </Select>
    );
    return (
        <>
            <WebHeader />
            <div>
                <BaackTitle titleContent="Set up Phone" />
                <div className="login-wrap">
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="phone"
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                            <Input
                                prefix={
                                    <>
                                        <ShakeOutlined className="site-form-item-icon" style={{ "margin": "0 0 0 1rem" }} />
                                        {selectBefore}
                                    </>
                                }
                                placeholder="000 000 00 00"
                                size="large"
                                style={{ "borderRadius": "5rem", "margin": "0.5rem 0" }}
                            />
                        </Form.Item>
                        <Form.Item>
                            <div className="login-wrap-tips">
                                To proceed, please fill your phone number. You will receive an SMS with a verification code.
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
                                Apply
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            <WebFooter />
        </>
    )
}

export default withRouter(Setupphone) 
