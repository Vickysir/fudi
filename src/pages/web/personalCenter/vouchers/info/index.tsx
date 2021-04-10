import React, { useEffect, useState } from 'react'
import { Modal, Input } from 'antd';
import './index.less'
import { PersonalCenterCouponListPostResponseArray } from '@/pages/api/types';
import { formatDateToDay } from '@/utils/timer';
import { couponType, coupon_discountType, discountRateConversion, moneyLimit } from '@/utils/constant';

interface Props {
    isOpen: boolean
    onClose: () => void
    data: PersonalCenterCouponListPostResponseArray
}

const VouchersInfo = (props: Props) => {
    const [visible, setvisible] = useState(false)
    const { isOpen, onClose, data } = props;

    useEffect(() => {
        setvisible(isOpen);
    }, [isOpen])


    const handleCancel = (e) => {
        setvisible(false);
        onClose();
    }
    return (
        <div>
            <Modal
                visible={visible}
                onCancel={handleCancel}
                footer={null}
            >
                {
                    data ?
                        <div className="model-content vouchersInfo">
                            <header>Voucher Info</header>
                            <div className="model-content-rate">
                                <h1>{data.title}</h1>
                            </div>
                            <div className="vouchersInfo-status">Available</div>
                            <p>{`${formatDateToDay(data.activeDate)} - ${formatDateToDay(data.quietDate)}`}</p>
                            <div className="vouchersInfo-desc" >
                                This voucher gives you -{discountRateConversion(data.money)} for the each {couponType.get(data.type)} from {formatDateToDay(data.activeDate)} till {formatDateToDay(data.quietDate)}.
                                And {coupon_discountType.get(data.discountType)}, {moneyLimit.get(data.moneyLimit)} for price up limit.
                            </div>
                        </div>
                        : null
                }

            </Modal>
        </div>
    )
}

export default VouchersInfo
