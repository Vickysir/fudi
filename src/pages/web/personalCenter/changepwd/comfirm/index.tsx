import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'antd';
import './index.less'

const InfoModel = (props) => {
    const [visible, setvisible] = useState(false)
    const { isOpen, onClose } = props;

    useEffect(() => {
        setvisible(isOpen);
    }, [isOpen])


    const handleCancel = (e) => {
        setvisible(false);
        onClose();
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
                            This voucher gives you -30% for the each delivery from 21 Jun 2021 till 21 Jul 2021.
                        </p>
                        <div>
                            <Button type="primary" shape="round" style={{ marginRight: "2rem", width: "13rem" }}>Cancel</Button>
                            <Button type="primary" shape="round" style={{ width: "13rem" }}>Ok</Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default InfoModel
