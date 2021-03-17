import React, { useEffect, useState } from 'react'
import { Modal, Input } from 'antd';
import './index.less'

const NotificationDetails = (props) => {
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
                width="33.9%"
            >
                <div className="model-content notificationDetails">
                    <div></div>
                    <div>
                        <h3>Fresh Fruits</h3>
                        <p>
                            Fresh discount for the hot summer! All lemonades with -50% discount.

                            The earliest record of the precursor to lemonade hails from the Mediterranean coast of medieval Egypt. Kashkab was made from fermented barley combined with mint, rue, black pepper and citron leaf. Next time you're at the juice bar, ask your mixologist to whip you up a frothy mug of kashkab!

                            Or how about a shot of sweet and tangy qatarmizat instead?
                            Thanks to the chronicles of poet and traveler Nasir-i-Khusraw, who wrote accounts of 10th-century Egyptian life, and to Jewish books and documents in the Cairo Genizah, we know that the medieval Jewish community in Cairo consumed, traded and exported bottles of the sugary lemon juice concoction called qatarmizat through the 13th century.
                       </p>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default NotificationDetails
