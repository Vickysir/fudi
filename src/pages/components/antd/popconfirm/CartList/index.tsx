import OrderDetailsList from '@/pages/components/orderDetailsList';
import { message, Popconfirm, Popover } from 'antd'
import React, { ReactNode } from 'react'

interface Props {
    Children: ReactNode,
    refreshHeader: () => void
}
const CartList = (props: Props) => {
    const { Children, refreshHeader } = props;
    const content = (<OrderDetailsList refreshHeader={refreshHeader} />
    );
    const title = (
        <div style={{ width: "500px", display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
            <h3>My Basket</h3>
            <h5>Change to Collection</h5>
        </div>
    )
    return (
        <div>
            <Popover content={content} title={title}>
                {Children}
            </Popover>
        </div>
    )
}

export default CartList
