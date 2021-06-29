import React, { useEffect, useState } from "react";
import { Modal, Input, Button, Select, message } from "antd";
import {
  RightOutlined,
  ContainerOutlined,
  CheckOutlined,
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

const { Option } = Select;

const OrderForVoucherModal = (props) => {
  const { isOpen, isClose, shopId, finishFn } = props;
  const authInfo = useAppStore("authInfo");
  const commonInfo = useAppStore("commonInfo");
  const [visible, setvisible] = useState(false);
  const [isEditForVoucher, setIsEditForVoucher] = useState(false);
  const [editForVoucherValue, setEditForVoucherValue] = useState("");
  const [CouponList, setCouponList] = useState<any>();
  const [selectCouponId, setSelectCouponId] = useState(0);
  async function getPersonList() {
    const { data } = await APIOrderCouponList({ shopId: commonInfo?.shopId });
    console.log(`APIPersonalCenterCouponList`, data);
    setCouponList(data);
  }

  useEffect(() => {
    setvisible(isOpen);
  }, [isOpen]);

  const handleOk = async () => {
    // 优惠券，非必填
    const submint = {
      CouponName: editForVoucherValue,
      CouponId: selectCouponId,
    };
    console.log(submint);
    try {
      finishFn(submint);
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

  const handleEditForName = async () => {
    setIsEditForVoucher(true);
    setSelectCouponId(0);
    setEditForVoucherValue("");
  };
  const handleSaveForName = async () => {
    // 从列表里选择了某个优惠券
    if (selectCouponId !== 0) return setIsEditForVoucher(false);
    // 添加优惠券，更新优惠券列表
    APIOrderObtainCoupon({ code: editForVoucherValue })
      .then((res) => {
        //TODO 重新设置优惠券列表
        getPersonList();
        setSelectCouponId(res.data.id);
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
    setSelectCouponId(item.id);
    setEditForVoucherValue(item.title);
  };
  useEffect(() => {
    getPersonList();
  }, []);

  return (
    <Modal visible={visible} onCancel={handleCancel} footer={null}>
      <div className="model-content">
        <header>
          <h1>Add Voucher</h1>
        </header>
        <ul id="historyContacts-box">
          {
            <li>
              <p>
                <ContainerOutlined />
              </p>
              {isEditForVoucher ? (
                <div>
                  <Input
                    value={editForVoucherValue}
                    placeholder="Add Voucher Number ..."
                    style={{ width: "100% " }}
                    onChange={handleChangeForName}
                    suffix={<CheckOutlined onClick={handleSaveForName} />}
                  />
                </div>
              ) : (
                <div>
                  <span>{editForVoucherValue || "Voucher Number"}</span>
                  <div onClick={handleEditForName}>
                    <RightOutlined />
                  </div>
                </div>
              )}
            </li>
          }
          {CouponList?.map((item) => {
            return (
              <li
                key={item.id}
                className="historyContacts-box-li"
                onClick={() => handleClickHitoryContacts(item)}
              >
                <div className="vouchers-wrap-box">
                  <div>
                    <h5>{item.title}</h5>
                    <p>Available</p>
                  </div>
                  <p>{`${formatDateToDay(item.activeDate)} - ${formatDateToDay(
                    item.quietDate
                  )}`}</p>
                </div>
                <CheckOutlined
                  className={item.id === selectCouponId ? style.themeColor : ""}
                />
              </li>
            );
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
