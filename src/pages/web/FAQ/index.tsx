/*
 * @Author: your name
 * @Date: 2021-03-04 10:54:58
 * @LastEditTime: 2021-03-04 14:14:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/web/FAQ/index.tsx
 */
import React, { useEffect, useState } from 'react'
import { Button, Collapse } from 'antd'
import WebFooter from '@/pages/components/header/webFooter';
import WebHeader from '@/pages/components/header/webHeader';
import BaackTitle from '../components/baackTitle'
import './index.less'
import { APIFAQList } from '@/pages/api/request';
import { FAQListPostResponseArray } from '@/pages/api/types';

const { Panel } = Collapse;

const FAQ = () => {
    const [data, setdata] = useState([])
    useEffect(() => {
        APIFAQList()
            .then((res) => {
                const { event, data } = res;
                if (event === "SUCCESS") {
                    setdata(data);
                }
            }).catch((err) => {
                console.log(`APIFAQList err`, err)
            })

    }, [])
    return (
        <>
            <WebHeader />
            <div>
                <BaackTitle titleContent="Frequently Asked Questions" />
                <div className="login-wrap">
                    <Collapse accordion ghost expandIconPosition="right">
                        {
                            data?.map((item: FAQListPostResponseArray, index) => {
                                return <Panel header={item.question} key={index} className="faq-title">
                                    <p className="faq-desc">{item.answer}</p>
                                </Panel>
                            })
                        }
                    </Collapse>
                </div>
            </div>
            <WebFooter />
        </>
    )
}

export default FAQ

