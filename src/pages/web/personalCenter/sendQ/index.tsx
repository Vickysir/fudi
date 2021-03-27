/*
 * @Author: your name
 * @Date: 2021-03-04 17:53:51
 * @LastEditTime: 2021-03-17 10:58:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/web/personalCenter/sendQ/index.tsx
 */
import React, { useState } from 'react'
import { Button, Input, message } from 'antd'
import './index.less'
import { APISendSuggestions } from '@/pages/api/request';

const { TextArea } = Input;
const SendQ = () => {
    const [content, setcontent] = useState("")

    const onChange = e => {
        const content = e.target.value
        setcontent(content);
    };

    const handelClickSendSuggestions = async () => {
        try {
            const { event } = await APISendSuggestions({ content })
            if (event === "SUCCESS") {
                message.success("Send a success");
                setcontent("");
            }
        } catch (err) {
            console.log(`err`, err)
        }
    }

    const handelCancel = () => {
        setcontent("");
    };

    return (
        <div className="sendQ-wrap">
            <h3>Send Suggestion</h3>
            <TextArea
                placeholder="Your Suggestion"
                allowClear
                onChange={onChange}
                autoSize={{ minRows: 6 }}
                value={content}
            />
            <div>
                <Button type="primary" shape="round" style={{ marginRight: "1rem" }} onClick={handelCancel}>Cancel</Button>
                <Button type="primary" shape="round" onClick={handelClickSendSuggestions}>Send</Button>
            </div>
        </div >
    )
}

export default SendQ