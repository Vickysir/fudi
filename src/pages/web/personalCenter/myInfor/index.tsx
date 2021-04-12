/*
 * @Author: your name
 * @Date: 2021-03-15 09:12:17
 * @LastEditTime: 2021-03-18 15:08:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/web/personalCenter/myInfor/index.tsx
 */
import React, { useEffect, useState } from 'react'
import { MailOutlined, UserOutlined, PhoneOutlined, CreditCardOutlined, EnvironmentOutlined, HomeOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import './index.less';
import { APIPersonalCenterUpdateEmail, APIUserAddressList } from '@/pages/api/request';
import EditInput from '../../components/editInput';
import { useAppStore } from '@/__internal';
import { AddressListPostResponseArray } from '@/pages/api/types';
import SaveAdressModel from './saveAdress';

const MyInfor = () => {
    const authInfo = useAppStore("authInfo");
    const [adressList, setAdressList] = useState([])
    const [isOpen, setisOpen] = useState(false);



    useEffect(() => {
        refetchAdressList();
    }, [])

    const refetchAdressList = async () => {
        const { data } = await APIUserAddressList();
        setAdressList(data)

    }
    const onCloseInfo = () => {
        setisOpen(false);
    }

    return (
        <div className="myInfor-wrap">
            <Form
                name="normal_login"
                className="login-form"
            >
                <Form.Item>
                    <h3 className="myInfor-wrap-title">Edit My Info</h3>
                </Form.Item>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'test' }]}
                >
                    <EditInput
                        icon={<UserOutlined className="site-form-item-icon" style={{ "margin": "0 1rem" }} />}
                        type="username"
                        textValue={authInfo?.nickname || "Full name"}
                        edit={true}
                    />
                </Form.Item>
                <Form.Item
                    name="phone"
                    rules={[{ required: true, message: 'Please input your Phone Number!' }]}
                >
                    <EditInput
                        icon={<PhoneOutlined className="site-form-item-icon" style={{ "margin": "0 1rem" }} />}
                        type="phone"
                        textValue={authInfo?.phone || "Phone Number"}
                        edit={true}
                    />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your Eamil!' }]}
                >
                    <EditInput
                        icon={<MailOutlined style={{ "margin": "0 1rem" }} />}
                        type="email"
                        textValue={authInfo?.email || "Eamil"}
                        edit={true}
                    />
                </Form.Item>

                <Form.Item>
                    <h3 className="myInfor-wrap-title">Edit My Address</h3>
                </Form.Item>
                {
                    adressList.map((item: AddressListPostResponseArray, index) => {
                        return (
                            <Form.Item
                                name={"username" + item.id}
                                rules={[{ required: true, message: 'test' }]}
                            >
                                <EditInput
                                    type="adress"
                                    textValue={item.detail + "," + item.houseNumber + "," + item.zipCode}
                                    delete={true}
                                    refetchAdressList={refetchAdressList}
                                    adddressId={item.id}
                                    edit={false}
                                />
                            </Form.Item>
                        )
                    })
                }
                {/* <Form.Item>
                    <Button
                        type="primary"
                        className="login-form-button"
                        size="large"
                        shape="round"
                        block
                        style={{ "margin": "0.5rem 0" }}
                        onClick={() => setisOpen(true)}
                    >
                        Add  Adress
                    </Button>
                </Form.Item> */}
            </Form>
            <SaveAdressModel isOpen={isOpen} onClose={onCloseInfo} refetch={refetchAdressList} />
        </div>
    )
}

export default MyInfor