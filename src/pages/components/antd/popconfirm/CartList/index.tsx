import OrderDetailsList from '@/pages/components/orderDetailsList';
import { message, Popconfirm, Popover } from 'antd'
import React, { ReactNode } from 'react'
import './index.less'

interface Props {
    Children: ReactNode,
}
const CartList = (props: Props) => {
    const { Children } = props;
    const content = (<OrderDetailsList />
    );
    const title = (
        <div className="cartList-title">
            <h3>My Basket</h3>
            {/* <h5>Change to Collection</h5> */}
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
