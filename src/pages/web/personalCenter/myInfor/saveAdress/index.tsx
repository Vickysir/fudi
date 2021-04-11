import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, Input } from 'antd';
// import './index.less'
import { PersonalCenterUpdatePasswordPost } from '@/pages/api/types';
import { APIPersonalCenterUpdatePassword, APISaveAddress } from '@/pages/api/request';
import { MailOutlined, UserOutlined, PhoneOutlined, CreditCardOutlined, EnvironmentOutlined, HomeOutlined } from '@ant-design/icons';

interface Props {
    isOpen: boolean
    onClose: () => void
    refetch: () => {}
}
const SaveAdressModel = (props: Props) => {
    const [visible, setvisible] = useState(false)
    const { isOpen, onClose } = props;
    const [form] = Form.useForm();


    useEffect(() => {
        setvisible(isOpen);
    }, [isOpen])


    const handleCancel = () => {
        setvisible(false);
        onClose();
        form.resetFields();
    }

    const onFinish = async (values: any) => {
        try {
            console.log('Received values of form: ', values);
            await APISaveAddress(values);
            props.refetch();
            setvisible(false);
            onClose();
            form.resetFields();
        } catch (err) {
            console.log(`err`, err)
        }

    };
    return (
        <div>
            <Modal
                visible={visible}
                onCancel={handleCancel}
                footer={null}
                width="27.6%"
            >
                <div className="model-content inforModel">
                    <header style={{ marginBottom: "3rem" }}>Add  Adress</header>
                    <Form
                        name="normal_login"
                        className="login-form"
                        onFinish={onFinish}
                        form={form}
                    >
                        <Form.Item
                            name="detail"
                            rules={[{ required: true, message: 'Please input your detail!' }]}
                        >
                            <Input
                                prefix={<EnvironmentOutlined className="site-form-item-icon" style={{ "margin": "0 1rem" }} />}
                                placeholder="Grafton Street, Dublin"
                                size="large"
                                style={{ "borderRadius": "5rem", "margin": "0.5rem 0" }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="housenumber"
                            rules={[{ required: true, message: 'Please input your House Number' }]}
                        >
                            <Input
                                size="large"
                                prefix={<HomeOutlined className="site-form-item-icon" style={{ "margin": "0 1rem" }} />}
                                placeholder="House Number"
                                style={{ "borderRadius": "5rem", "margin": "0.5rem 0" }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="zipcode"
                            rules={[{ required: true, message: 'Please input your Card!' }]}
                        >
                            <Input
                                prefix={<CreditCardOutlined style={{ "margin": "0 1rem" }} />}
                                placeholder="AB 23"
                                size="large"
                                style={{ "borderRadius": "5rem", "margin": "0.5rem 0" }}
                            />
                        </Form.Item>
                        <Form.Item>
                            <div style={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
                                <Button
                                    className="login-form-button"
                                    size="large"
                                    shape="round"
                                    style={{ "margin": "0.5rem 1rem 0.5rem 0" }}
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                    size="large"
                                    shape="round"
                                    style={{ "margin": "0.5rem 0" }}
                                >
                                    Save
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </div>
    )
}

export default SaveAdressModel




