/*
 * @Author: your name
 * @Date: 2021-03-04 10:25:22
 * @LastEditTime: 2021-04-12 18:58:16
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
import { APIRegistPhoneVerificationCode, APIUpdatePhoneVerificationCode } from '@/pages/api/request';
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
        values.phone = phonePrefix.substr(1) + values.phone;
        if (type === "regist") {

            try {
                // 发送 api 获取注册手机验证码
                const { data } = await APIRegistPhoneVerificationCode(values);
                message.success("The verification code has been sent");
                // phone、Token 存入store
                APP_STORE.registInfo = {
                    ...APP_STORE.registInfo,
                    ...values,
                    ...data,
                };
                //开始倒计时
                APP_STORE.commonInfo = {
                    ...APP_STORE.commonInfo,
                    count: 60,
                    liked: false,
                };
                //计时器
                handleClickTimer();
                history.push("/home/setupphone/verification");

            } catch (err) {
                console.log(`err`, err)
            }
        } else {
            try {
                // 发送 api 获取update手机验证码
                const { data } = await APIUpdatePhoneVerificationCode(values);
                message.success("The verification code has been sent");
                APP_STORE.registInfo = {
                    ...APP_STORE.registInfo,
                    ...values,
                    ...data,
                };
                //开始倒计时
                APP_STORE.commonInfo = {
                    ...APP_STORE.commonInfo,
                    count: 60,
                    liked: false,
                };
                //计时器
                handleClickTimer();
                history.push("/home/setupphone/verification?update");
            } catch (err) {
                console.log('err', err);
            }
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
        handleClickTimer();
    }, [])


    return (
        <>
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
                            {
                                commonInfo && commonInfo.count ?
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
                                    :
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
                            }

                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default withRouter(Setupphone)
