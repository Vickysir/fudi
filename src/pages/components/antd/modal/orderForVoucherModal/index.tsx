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
import { COUPON_DISCOUNTTYPE_DISCOUNTED_EXCEPT, moneyLimit } from "@/utils/constant";
import { OrderCoupon, OrderCouponListResponse } from "@/pages/api/types";
import { create, all } from 'mathjs'


const { Option } = Select;


const config = {
  number: 'BigNumber',
  precision: 20
}
const math = create(all, config)
const OrderForVoucherModal = (props) => {
  const { isOpen, isClose, shopId, finishFn, totalStructure } = props;
  const authInfo = useAppStore("authInfo");
  const commonInfo = useAppStore("commonInfo");
  const [visible, setvisible] = useState(false);
  const [isEditForVoucher, setIsEditForVoucher] = useState(false);
  const [editForVoucherValue, setEditForVoucherValue] = useState("");
  const [CouponList, setCouponList] = useState<OrderCouponListResponse>();
  const [selectCoupon, setSelectCoupon] = useState<OrderCoupon>(undefined);
  async function getOrderCouponList(code?: string) {
    const { data } = await APIOrderCouponList({ shopId: commonInfo?.shopId, diningType: commonInfo?.orderType });
    setCouponList(data);
    if (code) { // 检查一下添加的优惠券是否在优惠券列表，并提示
      const titles = data?.availableList?.map((el) => {
        return el?.couponList?.map((item) => {
          return item?.title
        })
      })
      if ([].concat(...titles).includes(code) === false) {
        return message.error(`The coupon (${code}) can not be applied on this order.`)
      }
    }
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
        getOrderCouponList(editForVoucherValue);
        setIsEditForVoucher(false);
        // 添加完成后，置空input
        setEditForVoucherValue('');
        setSelectCoupon(undefined);
        message.success("Added successfully");
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
    const canUse = handleCanUseVoucher(item);
    if (!canUse) {
      return message.error('Sorry, this coupon cannot be used for this order')
    }
    if (item.couponId === selectCoupon?.couponId) {
      setEditForVoucherValue('');
      setSelectCoupon(undefined)
      return
    }
    setSelectCoupon(item);
    setEditForVoucherValue(item.title);
    setIsEditForVoucher(false);
  };
  const handleCanUseVoucher = (voucher: OrderCoupon): boolean => {
    // monyLimit = -1,没有限制；=100，则消费必须要达到100
    if (voucher?.moneyLimit !== -1) {
      let totalPrice = '0';
      let undisCountTotalPrice = '0';
      let disCountTotalPrice = '0';

      totalStructure?.map((item) => {
        undisCountTotalPrice = math.format(math.chain(math.bignumber(item.basicPricePart)).add(math.bignumber(undisCountTotalPrice)).done());
        disCountTotalPrice = math.format(math.chain(math.bignumber(item.discountPricePart)).add(math.bignumber(disCountTotalPrice)).done());
      })

      if (voucher?.discountType === COUPON_DISCOUNTTYPE_DISCOUNTED_EXCEPT) {// 不打折的商品总价 是否 达到limit
        return Number(undisCountTotalPrice) >= voucher?.moneyLimit
      } else { // 全部商品总价 是否 达到limit
        totalPrice = math.format(math.chain(math.bignumber(undisCountTotalPrice)).add(math.bignumber(disCountTotalPrice)).done());
        return Number(totalPrice) >= voucher?.moneyLimit
      }
    }
    return true
  }

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
                    size="large"
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
                  const canUse = handleCanUseVoucher(item);
                  return (
                    <li
                      key={item.couponId}
                      className="historyContacts-box-li"
                      onClick={() => handleClickHitoryContacts(item)}
                    >
                      <div className="vouchers-wrap-box">
                        <div>
                          <h5 className={canUse ? "" : 'vouchers-unavailable'}>{item.title}</h5>
                          <p className={canUse ? "vouchers-ailable" : 'vouchers-unavailable'}>Available</p>
                        </div>
                        <p style={{ marginBottom: "0" }}>{`${formatDateToDay(item.activeDate)} - ${formatDateToDay(item.quietDate)}`}</p>
                        <p style={{ marginBottom: "0" }}>{item.moneyLimit === -1 ? moneyLimit.get(-1) : `must reach € ${item.moneyLimit}`}</p>
                      </div>
                      <CheckOutlined
                        style={{ fontSize: '26px' }}
                        className={item.couponId === selectCoupon?.couponId ? style.themeColor : ""}
                      />
                    </li>
                  );
                })}
              </ul>
            )
          })}
          {/* {CouponList?.unavailableList?.map((el) => {
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
          })} */}
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
