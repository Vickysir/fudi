import React from 'react'
import { Button } from 'antd'
import { ArrowLeftOutlined, } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import './index.less'


const BaackTitle = (props) => {
    const { titleContent } = props;
    function goBack() {
        history.back();
    }
    return (
        <div className="title-wrap">
            <Button
                size="large"
                shape="round"
                type="primary"
                onClick={goBack}
            >
                <ArrowLeftOutlined />Back
            </Button>
            <h1>{titleContent}</h1>
        </div>
    )
}

export default withRouter(BaackTitle)
