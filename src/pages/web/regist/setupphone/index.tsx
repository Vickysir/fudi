/*
 * @Author: your name
 * @Date: 2021-03-04 10:25:22
 * @LastEditTime: 2021-04-08 16:31:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/web/resetpassword/index.tsx
 */
import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Select, message } from 'antd';
import Icon from '@ant-design/icons';
import iconFlagUK from '@/assets/images/common/icon/flag-UK.svg'
import iconFlagLreland from '@/assets/images/common/icon/flag-Lreland.svg'
import WebFooter from '@/pages/components/header/webFooter';
import WebHeader from '@/pages/components/header/webHeader';
import BaackTitle from '@/pages/web/components/baackTitle';
import { withRouter } from 'react-router-dom';
import { APIPhoneVerificationCode } from '@/pages/api/request';
import { PhoneVerificationCodePost } from '@/pages/api/types';



import './index.less'
import { clearTimer, handleClickTimer } from '@/utils/timer';
import { useAppStore } from '@/__internal';


const { Option } = Select;
const Setupphone = (props) => {
    const { history } = props;
    const [phonePrefix, setphonePrefix] = useState("+353")
    const [type, setType] = useState("regist");
    const commonInfo = useAppStore("commonInfo")

    const onFinish = async (values: PhoneVerificationCodePost) => {
        values.phone = phonePrefix + values.phone;

        if (type === "regist") {
            APP_STORE.registInfo = {
                ...APP_STORE.registInfo,
                ...values
            }
        }

        // 发送 api 获取注册手机验证码
        try {
            const { event, data } = await APIPhoneVerificationCode(values);
            if (event === "SUCCESS") {
                message.success("The verification code has been sent");
                // phone、Token 存入store
                APP_STORE.registInfo = {
                    ...APP_STORE.registInfo,
                    ...data,
                    phone: values.phone
                };
                // APP_STORE.authInfo = { ...data };
                if (type === "regist") {
                    history.push("/setupphone/verification");
                } else {
                    history.push("/setupphone/verification?update");
                }
            }
        } catch (err) {
            console.log('err', err);
        }
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
            <Option value="+44">+44</Option>
            <Option value="+1">+1</Option>
        </Select>
    );
    //根据用户手机区号的选择，更换flag
    function SelectFlag(value: string) {
        let content = null;
        switch (value) {
            case "+353":
                content = <Icon component={iconFlagLreland} style={{ fontSize: "2.5rem" }} />
                break;
            case "+44":
                content = <Icon component={iconFlagUK} style={{ fontSize: "2.5rem" }} />
                break;
            default:
                content = <Icon component={iconFlagLreland} style={{ fontSize: "2.5rem" }} />
        }
        return content
    }

    useEffect(() => {
        const { location } = history;
        // type 第三方登录过来绑定账号的
        if (location?.search && location?.search === "?update") {
            setType("update");
        }
        //计时器
        const liked = APP_STORE.commonInfo.liked;
        if (!liked) {
            handleClickTimer();
        }
        return () => {
            clearTimer();
            APP_STORE.commonInfo = {
                ...APP_STORE.commonInfo,
                liked: true,
                count: null
            };
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
                            name="phone"
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                            <Input
                                prefix={
                                    <>
                                        {SelectFlag(phonePrefix)}
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
                                disabled={!commonInfo.liked}
                            >
                                {commonInfo.liked ? "Apply" : `${commonInfo.count} Seconds later`}
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
