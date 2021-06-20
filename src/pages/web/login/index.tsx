/*
 * @Author: your name
 * @Date: 2021-03-02 14:36:13
 * @LastEditTime: 2021-04-08 15:08:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /GitHub/fudi/src/pages/web/login/index.tsx
 */
import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd';
import { MailOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import WebFooter from '@/pages/components/header/webFooter';
import WebHeader from '@/pages/components/header/webHeader';
import google from '@/assets/images/common/login/google.png'
import fb from '@/assets/images/common/login/fb.png'
import { APILogin, APIThirdPartyLogin } from '@/pages/api/request';
import './index.less'
import firebase from 'firebase';
import { firebaseConfig } from '@/utils/firebase';
import { LoginPostResponse } from '@/pages/api/types';



const Login = (props) => {
    const { history } = props;
    const [form] = Form.useForm();


    // 第三方授权  登录
    async function onGoogleSignIn() {
        if (!firebase.apps.length) firebase.initializeApp(firebaseConfig)
        const provider = new firebase.auth.GoogleAuthProvider();
        try {
            const signResult = await firebase.auth().signInWithPopup(provider);
            const getIdToken = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
            const getApiRes = await APIThirdPartyLogin({ "idToken": getIdToken });
            console.log(`APIThirdPartyLogin`, getApiRes)
            afterLogin(getApiRes.data);
        } catch (err) {
            console.log(`err`, err)
        }

    }
    async function onFacebookSignIn() {
        if (!firebase.apps.length) firebase.initializeApp(firebaseConfig)
        const provider = new firebase.auth.FacebookAuthProvider();

        try {
            const signResult = await firebase.auth().signInWithPopup(provider);
            const getIdToken = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
            const getApiRes = await APIThirdPartyLogin({ "idToken": getIdToken });
            console.log(`APIThirdPartyLogin`, getApiRes)
            afterLogin(getApiRes.data);

        } catch (err) {
            console.log(`err`, err)
        }

    }

    // 第三方登录后 
    // check是否存在手机号
    const afterLogin = (data: LoginPostResponse) => {
        APP_STORE.authInfo = { ...data };
        // TODO  设置shopId
        APP_STORE.commonInfo = {
            ...APP_STORE.commonInfo,
            shopId: 1,
            websitePhone: "+353858275002"
        };
        if (data.phone === "" || data.phone === undefined || data.phone === null) {
            history.push("/home/setupphone?update");
        } else {
            history.push("/home");
        }
    }


    // 表单 登录
    const onFinish = async (values: any) => {
        console.log('Received values of form: ', values);
        try {
            const { data } = await APILogin(values);
            message.success("Login successful")
            APP_STORE.authInfo = { ...data };
            // TODO  设置shopId
            APP_STORE.commonInfo = {
                ...APP_STORE.commonInfo,
                shopId: 1,
                websitePhone: "+353858275002"
            };
            history.push("/home");
        } catch (err) {
            console.log('err', err)
        }
    };

    return (
        <>
            <div className="login-wrap">
                <h1>Log In</h1>
                <div>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input
                                size="large"
                                prefix={<MailOutlined className="site-form-item-icon" style={{ "margin": "0 1rem" }} />}
                                placeholder="Email"
                                style={{ "borderRadius": "5rem", "margin": "0.5rem 0" }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input.Password
                                size="large"
                                prefix={<LockOutlined className="site-form-item-icon" style={{ "margin": "0 1rem" }} />}
                                placeholder="Password"
                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                style={{ "borderRadius": "5rem", "margin": "0.5rem 0" }}
                            />
                        </Form.Item>
                        <Form.Item>
                            <div className="login-form-forgot">
                                <Link to='/home/restpassword'>Forgot password</Link>
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
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className="login-form-thirdparty">
                    <img src={google} alt="icon" onClick={onGoogleSignIn} />
                    <img src={fb} onClick={onFacebookSignIn} alt="icon" />
                </div>
                <div className="login-form-regist">
                    Don’t have an account?<Link to='/home/regist'>Sign Up</Link>
                </div>
            </div>
        </>
    )
}

export default withRouter(Login)
