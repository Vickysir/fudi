import React, { useState } from "react";
import Icon, {
  UserOutlined,
  ClockCircleOutlined,
  DownOutlined,
} from "@ant-design/icons";
import iconEdit from "@/assets/images/common/icon/icon-edit.svg";
import OrderForModal from "@/pages/components/antd/modal/orderForModal";
import OrderTimeModal from "@/pages/components/antd/modal/orderTimeModal";
import OrderForOptionModal from "@/pages/components/antd/modal/orderForOptionModal";
import { deliveryOption, DELIVERYOPTION_FRONT, orderTimeType, ORDERTIME_ASAP } from "@/utils/constant";
import { useAppStore } from "@/__internal";
import moment from "moment";

import style from "@/styles/theme/icon.less";
import "./index.less";

interface Props {
  type: string;
  setFormData: (params: OrderOtherInfoFormData) => void
}
export interface OrderOtherInfoFormData {
  timeType: number;
  diningTime?: number; consignee: string; phone: number | string
  orderOption: {
    label: string,
    value: number,
  }
}
const OrderMethod = (props: Props) => {
  const authInfo = useAppStore("authInfo");
  const [isOrderForModal, setisOrderForModal] = useState(false);
  const [isOrderForOptionModal, setisOrderForOptionModal] = useState(false);
  const [isOpenOrderTimeModal, setisOpenOrderTimeModal] = useState(false);
  const [orderData, setOrderData] = useState<OrderOtherInfoFormData>({
    timeType: ORDERTIME_ASAP,
    consignee: authInfo.nickname,
    phone: authInfo.phone,
    orderOption: {
      label: deliveryOption.get(DELIVERYOPTION_FRONT),
      value: DELIVERYOPTION_FRONT,
    }
  });
  const { type, setFormData } = props;

  const orderForModalClose = () => {
    setisOrderForModal(false);
  };
  const orderForOptionModalClose = () => {
    setisOrderForOptionModal(false);
  };
  const orderTimeModalClose = () => {
    setisOpenOrderTimeModal(false);
  };
  const setDataFn = (data) => {
    const formData = {
      ...orderData,
      ...data
    }
    setOrderData(formData);
    setFormData(formData)
  };

  return (
    <div className="orderMethod-wrap">
      {type === "collect" && (
        <>
          <ul>
            <li>Collection Time</li>
            <li>
              <div>
                <span>
                  <ClockCircleOutlined style={{ fontSize: "1.5rem" }} />
                </span>
                <p>
                  {orderData?.timeType === ORDERTIME_ASAP
                    ? orderTimeType.get(ORDERTIME_ASAP)
                    : moment(orderData.diningTime)
                      .format('"HH:mm, DD MMMM YYYY"')
                      .replace(/\"/g, "")}
                </p>
              </div>
              <span
                onClick={() => {
                  setisOpenOrderTimeModal(true);
                }}
              >
                <Icon
                  component={iconEdit}
                  className={` ${style.iconFill}`}
                  style={{ fontSize: "1.5rem" }}
                />
              </span>
            </li>
          </ul>
          <ul style={{ margin: 0 }}>
            <li>Order for</li>
            <li>
              <div className="inaline">
                <span>
                  <UserOutlined style={{ fontSize: "1.5rem" }} />
                </span>
                <p className="inaline">
                  {orderData.consignee} <span>+{orderData.phone}</span>
                </p>
              </div>
              <span
                onClick={() => {
                  setisOrderForModal(true);
                }}
              >
                <Icon
                  component={iconEdit}
                  className={` ${style.iconFill}`}
                  style={{ fontSize: "1.5rem" }}
                />
              </span>
            </li>
          </ul>
        </>
      )}
      {type === "delivery" && (
        <>
          <ul>
            <li>Delivery Time</li>
            <li>
              <div>
                <span>
                  <ClockCircleOutlined style={{ fontSize: "1.5rem" }} />
                </span>
                <p>
                  {orderData?.timeType === ORDERTIME_ASAP
                    ? orderTimeType.get(ORDERTIME_ASAP)
                    : moment(orderData.diningTime)
                      .format('"HH:mm, DD MMMM YYYY"')
                      .replace(/\"/g, "")}
                </p>
              </div>
              <span
                onClick={() => {
                  setisOpenOrderTimeModal(true);
                }}
              >
                <Icon
                  component={iconEdit}
                  className={` ${style.iconFill}`}
                  style={{ fontSize: "1.5rem" }}
                />
              </span>
            </li>
          </ul>
          <ul>
            <li>Order for</li>
            <li>
              <div className="inaline">
                <span>
                  <UserOutlined style={{ fontSize: "1.5rem" }} />
                </span>
                <p className="inaline">
                  {orderData.consignee} <span>+{orderData.phone}</span>
                </p>
              </div>
              <span
                onClick={() => {
                  setisOrderForModal(true);
                }}
              >
                <Icon
                  component={iconEdit}
                  className={` ${style.iconFill}`}
                  style={{ fontSize: "1.5rem" }}
                />
              </span>
            </li>
          </ul>
          <ul style={{ margin: 0 }}>
            <li>Order Option</li>
            <li>
              <div className="inaline">
                <p className="inaline" style={{ margin: 0 }}>
                  {
                    orderData.orderOption.label
                  }
                </p>
              </div>
              <span
                onClick={() => {
                  setisOrderForOptionModal(true);
                }}
              >
                <DownOutlined
                  className="themeColor"
                  style={{ fontSize: "1.5rem" }}
                />
              </span>
            </li>
          </ul>
        </>
      )}
      <OrderTimeModal
        isOpen={isOpenOrderTimeModal}
        isClose={orderTimeModalClose}
        shopId={Number(1)}
        finishFn={setDataFn}
      />
      <OrderForModal
        isOpen={isOrderForModal}
        isClose={orderForModalClose}
        shopId={Number(1)}
        finishFn={setDataFn}
      />
      <OrderForOptionModal
        isOpen={isOrderForOptionModal}
        isClose={orderForOptionModalClose}
        shopId={Number(1)}
        finishFn={setDataFn}
      />
    </div>
  );
};

export default OrderMethod;
