import React, { useEffect, useState } from 'react'
import { Rate, Modal, Input, Button } from 'antd';
import './index.less'

const { TextArea } = Input;
const FormModal = (props) => {
    const [visible, setvisible] = useState(false)
    const { isOpen, isClose } = props;

    useEffect(() => {
        setvisible(isOpen);
    }, [isOpen])

    const handleOk = (e) => {
        console.log(e);
        setvisible(false);
        isClose("ok");
    }
    const handleCancel = (e) => {
        console.log(e);
        setvisible(false);
        isClose("cancel");
    }

    return (
        <Modal
            visible={visible}
            onCancel={handleCancel}
            footer={null}
        >
            <div className="model-content">
                <header>Add a Review</header>
                <div className="model-content-rate">
                    <h1>Jungle Pizza</h1>
                    <Rate style={{ fontSize: "2rem" }} />
                </div>
                <ul>
                    <li>
                        <p>Margherita</p>
                        <div>
                            <span>
                                <Rate count={1} style={{ fontSize: "2rem" }} />
                            </span>
                            <span>
                                <Rate count={1} style={{ fontSize: "2rem" }} />
                            </span>
                        </div>
                    </li>
                    <li>
                        <p>Design your own 14’’ pizza </p>
                        <div>
                            <span>
                                <Rate count={1} style={{ fontSize: "2rem" }} />
                            </span>
                            <span>
                                <Rate count={1} style={{ fontSize: "2rem" }} />
                            </span>
                        </div>
                    </li>
                    <li>
                        <p>Onion Rings</p>
                        <div>
                            <span>
                                <Rate count={1} style={{ fontSize: "2rem" }} />
                            </span>
                            <span>
                                <Rate count={1} style={{ fontSize: "2rem" }} />
                            </span>
                        </div>
                    </li>
                </ul>
                <div>
                    <TextArea rows={6} placeholder="Write your review" />
                </div>
                <div className="model-content-action">
                    <Button shape="round" style={{ "marginRight": "0.5rem" }} onClick={handleCancel}>Cancel</Button>
                    <Button shape="round" type="primary" onClick={handleOk}>Send</Button>
                </div>
            </div>
        </Modal>
    )
}

export default FormModal
