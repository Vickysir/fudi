import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'antd';
import './index.less'
import { PersonalCenterUpdatePasswordPost } from '@/pages/api/types';
import { APIPersonalCenterUpdatePassword } from '@/pages/api/request';

interface Props {
    isOpen: boolean
    submitData: PersonalCenterUpdatePasswordPost | null
    onClose: () => void
}
const InfoModel = (props: Props) => {
    const [visible, setvisible] = useState(false)
    const { isOpen, submitData, onClose } = props;

    useEffect(() => {
        setvisible(isOpen);
    }, [isOpen])


    const handleCancel = () => {
        setvisible(false);
        onClose();
    }
    const hanelOk = async () => {
        // api 请求
        try {
            const { data } = await APIPersonalCenterUpdatePassword(submitData);
            setvisible(false);
            onClose();
        } catch (err) {
            console.log(`err`, err)
        }
    }
    return (
        <div>
            <Modal
                visible={visible}
                onCancel={handleCancel}
                footer={null}
                width="27.6%"
            >
                <div className="model-content inforModel">
                    <header>Change Password</header>
                    <div>
                        <p>
                            Are you sure with changing password?
                        </p>
                        <div>
                            <Button type="primary" shape="round" style={{ marginRight: "2rem", width: "13rem" }} onClick={handleCancel}>Cancel</Button>
                            <Button type="primary" shape="round" style={{ width: "13rem" }} onClick={hanelOk}>Ok</Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default InfoModel
