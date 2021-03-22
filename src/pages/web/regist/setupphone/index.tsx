/*
 * @Author: your name
 * @Date: 2021-03-04 10:25:22
 * @LastEditTime: 2021-03-22 18:32:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/web/resetpassword/index.tsx
 */
import React, { useState } from 'react'
import { Form, Input, Button, Select, message } from 'antd';
import { ShakeOutlined } from '@ant-design/icons';
import WebFooter from '@/pages/components/header/webFooter';
import WebHeader from '@/pages/components/header/webHeader';
import BaackTitle from '../../components/baackTitle';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { apiPath } from '@/pages/api';
import { PhoneVerificationCodePost } from '@/pages/api/types/login';
import { useAppStore } from '@/__internal';



import './index.less'


const { Option } = Select;
const Setupphone = (props) => {
    const { history } = props;
    const [phonePrefix, setphonePrefix] = useState("+353")

    const onFinish = (values: PhoneVerificationCodePost) => {
        values.phone = phonePrefix + values.phone;
        console.log('Received values of form: ', values);

        Object.assign(APP_STORE.registInfo, { ...values });
        // 发送 api 获取注册手机验证码
        axios.post(apiPath.phoneVerificationCode, values)
            .then((res) => {
                console.log('res', res);
                if (res.event === "SUCCESS") {
                    message.success("The verification code has been sent");
                    // phone、Token 存入store
                    const store = Object.assign(APP_STORE.registInfo, res.data);
                    APP_STORE.registInfo = store;
                    history.push("/setupphone/verification");
                }
            }).catch(err => {
                console.log('err', err);
            })
    };

    // 处理电话号码前缀change
    function handelSelectChange(value: string) {
        setphonePrefix(value);
    }

    const selectBefore = (
        <Select
            value={phonePrefix}
            onChange={handelSelectChange}
            className="select-before citizenship"
            bordered={false}
        >
            <Option value="+353">+353</Option>
            <Option value="+86">+86</Option>
        </Select>
    );
    let storeAtt = useAppStore("registInfo");
    console.log(`storeAtt`, storeAtt)
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
