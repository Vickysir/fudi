/*
 * @Author: your name
 * @Date: 2021-04-16 15:50:47
 * @LastEditTime: 2021-04-16 15:58:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/components/antd/modal/messageModal/index.tsx
 */
import React, { useEffect, useState } from 'react'
import { Modal, Input } from 'antd';
import Icon from '@ant-design/icons';
import heartSvg from '@/assets/images/common/icon/heart.svg'
import './index.less'

interface Props {
    isOpen: boolean
    isClose: () => void
    onOk?: () => void
    icon?: React.ReactNode
    content: React.ReactNode
    footer?: React.ReactNode

}

const MessageModal = (props: Props) => {
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
                onOk={props?.onOk}
                footer={props?.footer || null}
            >
                <div className="model-content sendSuccess">
                    <div>
                        {/* <Icon component={heartSvg} style={{ fontSize: "18rem" }} /> */}
                        {
                            props?.icon
                        }
                    </div>
                    <div>
                        {
                            props.content
                        }
                        {/* Thank you<br />
                        for your feedback! */}
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default MessageModal
