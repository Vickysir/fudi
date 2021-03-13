import React, { useEffect, useState } from 'react'
import { Modal, Input } from 'antd';
import Icon from '@ant-design/icons';
import heartSvg from '@/assets/images/common/svg/heart.svg'
import './index.min.css'

const { TextArea } = Input;
const SendSuccess = (props) => {
    const [visible, setvisible] = useState(false)
    const { isOpen, isClose } = props;

    useEffect(() => {
        setvisible(isOpen);
    }, [isOpen])


    const handleCancel = (e) => {
        console.log(e);
        setvisible(false);
        isClose();
    }

    return (
        <div>
            <Modal
                visible={visible}
                onCancel={handleCancel}
                footer={null}
            >
                <div className="model-content sendSuccess">
                    <div>
                        <Icon component={heartSvg} style={{ fontSize: "18rem", color: "" }} />
                    </div>
                    <div>
                        Thank you<br />
                        for your feedback!
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default SendSuccess
