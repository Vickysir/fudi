/*
 * @Author: your name
 * @Date: 2021-03-04 10:54:58
 * @LastEditTime: 2021-03-04 14:14:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/web/FAQ/index.tsx
 */
import React from 'react'
import { Button, Collapse } from 'antd'
import WebFooter from '@/pages/components/header/webFooter';
import WebHeader from '@/pages/components/header/webHeader';
import BaackTitle from '../components/baackTitle'
import './index.min.css'

const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const FAQ = () => {
    return (
        <>
            <WebHeader />
            <div>
                <BaackTitle titleContent="Frequently Asked Questions" />
                <div className="login-wrap">
                    <Collapse accordion ghost expandIconPosition="right">
                        <Panel header="How does FUDI & MORE work?" key="1" className="faq-title">
                            <p className="faq-desc">{text}</p>
                        </Panel>
                        <Panel header="What time is FUDI open from?" key="2" className="faq-title">
                            <p className="faq-desc">{text}</p>
                        </Panel>
                        <Panel header="What if I have food allergies and/or want to change the order? " key="3" className="faq-title">
                            <p className="faq-desc">{text}</p>
                        </Panel>
                        <Panel header="How much does the delivery fee cost?" key="4" className="faq-title">
                            <p className="faq-desc">Each delivery is €2 within 3km, additional 50 cents for every 500m beyond 3km.</p>
                        </Panel>
                        <Panel header="How long will my order take to get here?" key="5" className="faq-title">
                            <p className="faq-desc">{text}</p>
                        </Panel>
                        <Panel header="Where can I collect my food?" key="6" className="faq-title">
                            <p className="faq-desc">{text}</p>
                        </Panel>
                        <Panel header="What is the cancellation policy?" key="7" className="faq-title">
                            <p className="faq-desc">{text}</p>
                        </Panel>
                        <Panel header="How can I get free food?" key="8" className="faq-title">
                            <p className="faq-desc">{text}</p>
                        </Panel>
                        <Panel header="Can I tip the driver?" key="9" className="faq-title">
                            <p className="faq-desc">{text}</p>
                        </Panel>
                    </Collapse>
                </div>
            </div>
            <WebFooter />
        </>
    )
}

export default FAQ

