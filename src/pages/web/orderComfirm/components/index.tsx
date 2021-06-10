import React, { useState } from "react";
import Icon, {
  UserOutlined,
  ClockCircleOutlined,
  DownOutlined,
} from "@ant-design/icons";
import iconEdit from "@/assets/images/common/icon/icon-edit.svg";
import OrderForModal from "@/pages/components/antd/modal/orderForModal";
import OrderTimeModal from "@/pages/components/antd/modal/orderTimeModal";

import style from "@/styles/theme/icon.less";
import "./index.less";

interface Props {
  type: string;
}
const OrderMethod = (props: Props) => {
  const [isOrderForModal, setisOrderForModal] = useState(false);
  const [isOpenOrderTimeModal, setisOpenOrderTimeModal] = useState(false);
  const { type } = props;
  const orderForModalClose = () => {
    setisOrderForModal(false);
  };
  const orderTimeModalClose = () => {
    setisOpenOrderTimeModal(false);
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
                <p>19:00</p>
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
                  John <span>+310540009998</span>
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
                <p>ASAP</p>
              </div>
              <span>
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
              <div>
                <span>
                  <UserOutlined style={{ fontSize: "1.5rem" }} />
                </span>
                <p>
                  ASAP <span></span>
                </p>
              </div>
              <span>
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
                  Meet in front of the door
                </p>
              </div>
              <span>
                <DownOutlined
                  className="themeColor"
                  style={{ fontSize: "1.5rem" }}
                />
              </span>
            </li>
          </ul>
        </>
      )}
      <OrderForModal
        isOpen={isOrderForModal}
        isClose={orderForModalClose}
        shopId={Number(1)}
      />
      <OrderTimeModal
        isOpen={isOpenOrderTimeModal}
        isClose={orderTimeModalClose}
        shopId={Number(1)}
      />
    </div>
  );
};

export default OrderMethod;
