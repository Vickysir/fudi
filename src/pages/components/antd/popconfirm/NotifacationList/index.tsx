import NotifacationDetailsList from '@/pages/components/notifacationDetailsList';
import { message, Popconfirm, Popover } from 'antd'
import React, { ReactNode } from 'react'
import './index.less'

interface Props {
    Children: ReactNode,
    refreshHeader: () => void
}
const NotifacationList = (props: Props) => {
    const { Children, refreshHeader } = props;
    const content = (<NotifacationDetailsList refreshHeader={refreshHeader} />
    );
    return (
        <div>
            <Popover content={content} >
                {Children}
            </Popover>
        </div>
    )
}

export default NotifacationList
