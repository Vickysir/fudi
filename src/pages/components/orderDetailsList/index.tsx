import React from 'react'
import RoundButton from '../antd/button'
import './index.less'

interface Props {
    data?: any
}
const OrderDetailsList = (props: Props) => {
    return (
        <div className="orderDetailsList-wrap">
            <h5>Order Detials</h5>
            <ul>
                <li>
                    <ul>
                        <li>+</li>
                        <li>2</li>
                        <li>-</li>
                    </ul>
                    <ul>
                        <li><h3>Margherita</h3></li>
                        <li><p>Size: 14” - Giant</p></li>
                        <li><p>Toppings: Extra Cheese, Sundried tomatoes</p></li>
                    </ul>
                    <div>€ 40</div>
                </li>
                <li>
                    <ul>
                        <li>+</li>
                        <li>10</li>
                        <li>-</li>
                    </ul>
                    <ul>
                        <li><h3>Margherita</h3></li>
                        <li><p>Size: 14” - Giant</p></li>
                        <li><p>Toppings: Extra Cheese, Sundried tomatoes</p></li>
                    </ul>
                    <div>€ 40</div>
                </li>
            </ul>
            <div>
                <RoundButton type="primary" block>Confirm Order €101.00</RoundButton>
            </div>
        </div>
    )
}

export default OrderDetailsList
