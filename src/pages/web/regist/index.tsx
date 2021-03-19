/*
 * @Author: your name
 * @Date: 2021-03-04 10:25:22
 * @LastEditTime: 2021-03-19 13:32:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/web/resetpassword/index.tsx
 */
import React, { useEffect } from 'react'
import { Form, Input, Button, Select } from 'antd';
import { ShakeOutlined } from '@ant-design/icons';
import WebFooter from '@/pages/components/header/webFooter';
import WebHeader from '@/pages/components/header/webHeader';
import BaackTitle from '../components/baackTitle';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { apiPath } from '@/pages/api';
import { LoginRegistPost } from '@/pages/api/types/login';

import './index.less'


const { Option } = Select;
const Regist = (props) => {
    const { history } = props;

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        // history.push("/setupphone");
    };
    const data: LoginRegistPost = {
        "phone": "18616350384",
        "password": "hell0w0rld1",
        "againPassword": "hell0w0rld1",
        "code": "4266",
        "email": "460022058@qq.com",
        "invitationCode": "dsfwefweashyju"
    }

    useEffect(() => {
        // axios.post(apiPath.regist, data)
        //     .then((res) => {
        //         console.log('res', res)
        //     }).catch(err => {
        //         console.log('err', err)
        //     })
    }, [])

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

export default withRouter(Regist) 
