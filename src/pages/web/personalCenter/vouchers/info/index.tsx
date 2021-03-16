import React, { useEffect, useState } from 'react'
import { Modal, Input } from 'antd';
import './index.less'

const VouchersInfo = (props) => {
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
            >
                <div className="model-content vouchersInfo">
                    <header>Voucher Info</header>
                    <div className="model-content-rate">
                        <h1>Fudi2020</h1>
                    </div>
                    <div className="vouchersInfo-status">Available</div>
                    <p>21 Jun 2021 – 21 Jul 2021</p>
                    <div className="vouchersInfo-desc" >
                        This voucher gives you -30% for the each delivery from 21 Jun 2021 till 21 Jul 2021.
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default VouchersInfo
