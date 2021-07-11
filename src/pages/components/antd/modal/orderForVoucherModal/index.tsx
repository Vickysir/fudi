import React, { useEffect, useState } from "react";
import { Modal, Input, Button, Select, message } from "antd";
import {
  RightOutlined,
  ContainerOutlined,
  CheckOutlined,
  CloseOutlined
} from "@ant-design/icons";
import moment from "moment";
import { isLogin } from "@/utils";
import { useAppStore } from "@/__internal";
import {
  APIBookTable,
  APIHistoricalContacts,
  APIOrderCouponList,
  APIOrderObtainCoupon,
  APIPersonalCenterCouponList,
  APIPersonalCenterObtainCoupon,
} from "@/pages/api/request";
import style from "@/styles/theme/icon.less";
import "./index.less";
import { formatDateToDay } from "@/utils/timer";
import { COUPON_DISCOUNTTYPE_DISCOUNTED_EXCEPT } from "@/utils/constant";
import { OrderCoupon, OrderCouponListResponse } from "@/pages/api/types";

const { Option } = Select;

const OrderForVoucherModal = (props) => {
  const { isOpen, isClose, shopId, finishFn, isIncludeDiscount } = props;
  const authInfo = useAppStore("authInfo");
  const commonInfo = useAppStore("commonInfo");
  const [visible, setvisible] = useState(false);
  const [isEditForVoucher, setIsEditForVoucher] = useState(false);
  const [editForVoucherValue, setEditForVoucherValue] = useState("");
  const [CouponList, setCouponList] = useState<OrderCouponListResponse>();
  const [selectCoupon, setSelectCoupon] = useState<OrderCoupon>(undefined);
  async function getOrderCouponList() {
    const { data } = await APIOrderCouponList({ shopId: commonInfo?.shopId, diningType: commonInfo?.orderType });
    setCouponList(data);
  }


  const handleOk = async () => {
    if (isEditForVoucher) { return message.error("Please save the coupon first！") }
    // 优惠券，非必填
    try {
      finishFn(selectCoupon);
      setvisible(false);
      isClose("ok");
    } catch (err) {
      console.log(err);
    }
  };
  const handleCancel = (e) => {
    setvisible(false);
    isClose("cancel");
  };

  const handleSaveForName = async () => {
    // 添加优惠券，更新优惠券列表
    APIOrderObtainCoupon({ code: editForVoucherValue, diningType: commonInfo?.orderType, shopId: commonInfo?.shopId })
      .then((res) => {
        getOrderCouponList();
        setSelectCoupon(res.data);
        setIsEditForVoucher(false);
      })
      .catch((err) => {
        setEditForVoucherValue("");
        console.log(`APIPersonalCenterCouponList err`, err);
      });
  };
  const handleChangeForName = (e) => {
    const value = e.target.value;
    setEditForVoucherValue(value);
  };

  const handleClickHitoryContacts = (item) => {
    // const canUse = item.discountType === COUPON_DISCOUNTTYPE_DISCOUNTED_EXCEPT && !isIncludeDiscount;
    // if (!canUse) {
    //   return message.error('Sorry, this coupon cannot be used for this order')
    // }
    if (item.id === selectCoupon?.id) {
      setEditForVoucherValue('');
      setSelectCoupon(undefined)
      return
    }
    setSelectCoupon(item);
    setEditForVoucherValue(item.title);
    setIsEditForVoucher(false);
  };

  useEffect(() => {
    setvisible(isOpen);
    if (isOpen) {
      getOrderCouponList();
      setEditForVoucherValue('');
      setSelectCoupon(undefined)
    }
  }, [isOpen]);


  return (
    <Modal visible={visible} onCancel={handleCancel} footer={null}>
      <div className="model-content">
        <header>
          <h1>Add Voucher</h1>
        </header>
        <ul id="historyContacts-box">
          {
            <li><p><ContainerOutlined /></p>
              {isEditForVoucher ? (
                <div>
                  <Input
                    value={editForVoucherValue}
                    placeholder="Add Voucher Number ..."
                    style={{ width: "100% " }}
                    onChange={handleChangeForName}
                    suffix={<>
                      <CheckOutlined style={{ marginRight: "1rem" }} onClick={handleSaveForName} />
                      <CloseOutlined onClick={() => {
                        setIsEditForVoucher(false);
                        setEditForVoucherValue("");
                        setSelectCoupon(undefined);
                      }} />
                    </>}
                  />
                </div>
              ) : (
                <div>
                  <span>{editForVoucherValue || "Voucher Number..."}</span>
                  <div onClick={() => {
                    setIsEditForVoucher(true);
                    setSelectCoupon(undefined);
                    setEditForVoucherValue("");
                  }}>
                    <RightOutlined />
                  </div>
                </div>
              )}
            </li>
          }
          {CouponList?.availableList?.map((el, index) => {
            return (
              <ul style={{ marginTop: "4rem" }} key={index}>
                <li className="historyContacts-box-li-title">Available：{el.name}</li>
                {el?.couponList?.map((item) => {
                  // const canUse = item.discountType === COUPON_DISCOUNTTYPE_DISCOUNTED_EXCEPT && !isIncludeDiscount;
                  const canUse = true;
                  return (
                    <li
                      key={item.id}
                      className="historyContacts-box-li"
                      onClick={() => handleClickHitoryContacts(item)}
                    >
                      <div className="vouchers-wrap-box">
                        <div>
                          <h5 className={canUse ? "" : 'vouchers-unavailable'}>{item.title}</h5>
                          <p className={canUse ? "vouchers-ailable" : 'vouchers-unavailable'}>Available</p>
                        </div>
                        <p>{`${formatDateToDay(item.activeDate)} - ${formatDateToDay(
                          item.quietDate
                        )}`}</p>
                      </div>
                      <CheckOutlined
                        style={{ fontSize: '26px' }}
                        className={item.id === selectCoupon?.id ? style.themeColor : ""}
                      />
                    </li>
                  );
                })}
              </ul>
            )
          })}
          {CouponList?.unavailableList?.map((el) => {
            return (
              <ul style={{ marginTop: "2rem", marginBottom: "4rem" }}>
                <li className="historyContacts-box-li-title">Unavailable：{el.name}</li>
                {el?.couponList?.map((item) => {
                  return (
                    <li
                      key={item.id}
                      className="historyContacts-box-li"
                      onClick={() => message.error('Sorry, this coupon has expired')}
                    >
                      <div className="vouchers-wrap-box">
                        <div>
                          <h5 className="vouchers-unavailable">{item.title}</h5>
                          <p className='vouchers-unavailable'>Unavailable</p>
                        </div>
                        <p>{`${formatDateToDay(item.activeDate)} - ${formatDateToDay(
                          item.quietDate
                        )}`}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )
          })}
        </ul>
        <div className="model-content-action">
          <Button shape="round" type="primary" block onClick={handleOk}>
            Comfirm
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default OrderForVoucherModal;
