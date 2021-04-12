/*
 * @Author: your name
 * @Date: 2021-03-04 10:25:22
 * @LastEditTime: 2021-04-08 16:14:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/web/resetpassword/index.tsx
 */
import React, { useEffect, useState } from 'react'
import { Form, Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import WebFooter from '@/pages/components/header/webFooter';
import WebHeader from '@/pages/components/header/webHeader';
import BaackTitle from '../../../components/baackTitle';
import { withRouter } from 'react-router-dom';
import { LoginRegistPost } from '@/pages/api/types';
import { APIPersonalCenterUpdatePhone, APIRegist } from '@/pages/api/request';
import { clearTimer, handleClickTimer } from '@/utils/timer';

const PhoneVerification = (props) => {
    const { history } = props;
    const [type, setType] = useState("regist");


    const onFinish = async (values: any) => {
        if (type === "regist") {

            //获取store
            const authinfo: LoginRegistPost = Object.assign(APP_STORE.registInfo, { ...values });
            console.log(`authinfo`, authinfo);
            //发送API 注册
            try {
                await APIRegist(authinfo);
                APP_STORE.registInfo = null;
                history.push("/login");
            } catch (err) {
                console.log('err', err)
            }
        } else if (type === "update") {
            try {
                await APIPersonalCenterUpdatePhone({ ...values, "phone": APP_STORE.registInfo.phone });
                APP_STORE.registInfo = null;
                history.push("/home");
            } catch (err) {
                console.log(`err`, err)
            }
        }

    };

    useEffect(() => {
        const { location } = history;
        // type 第三方登录过来绑定账号的
        if (location?.search && location?.search === "?update") {
            setType("update");
        }

        
        //计时器
        handleClickTimer();
        return () => {
            clearTimer()
        }
    }, [])


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
                            name="code"
                            rules={[{ required: true, message: 'Please input your 4-digits code!' }]}
                        >
                            <Input
                                placeholder="4-digits code"
                                size="large"
                                style={{ "borderRadius": "5rem", "margin": "0.5rem 0", "paddingLeft": "2rem" }}
                            />
                        </Form.Item>
                        <Form.Item className="login-wrap-tips">
                            <div>Enter a verification code from the SMS</div>
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
                                Confirm
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            <WebFooter />
        </>
    )
}

export default withRouter(PhoneVerification)
