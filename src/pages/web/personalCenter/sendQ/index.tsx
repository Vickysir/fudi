/*
 * @Author: your name
 * @Date: 2021-03-04 17:53:51
 * @LastEditTime: 2021-03-17 10:58:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/web/personalCenter/sendQ/index.tsx
 */
import React from 'react'
import { Button, Input } from 'antd'
import './index.less'

const { TextArea } = Input;
const SendQ = () => {

    const onChange = e => {
        console.log(e);
    };

    return (
        <div className="sendQ-wrap">
            <h3>Send Suggestion</h3>
            <TextArea
                placeholder="Your Suggestion"
                allowClear
                onChange={onChange}
                autoSize={{ minRows: 6 }}
            />
            <div>
                <Button type="primary" shape="round" style={{ marginRight: "1rem" }}>Cancel</Button>
                <Button type="primary" shape="round">Send</Button>
            </div>
        </div >
    )
}

export default SendQ