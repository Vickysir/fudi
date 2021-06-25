import React, { useEffect, useState } from "react";
import { Modal, Input, Button, Select, DatePicker, message } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import moment from "moment";
import { useAppStore } from "@/__internal";
import {
  orderTimeType,
  ORDERTIME_ASAP,
  ORDERTIME_ONTIME,
} from "@/utils/constant";
import "./index.less";

const OrderTimeModal = (props) => {
  const { isOpen, isClose, shopId, finishFn } = props;
  const authInfo = useAppStore("authInfo");

  const [visible, setvisible] = useState(false);
  const [timeType, setTimeType] = useState(ORDERTIME_ASAP);
  const [isEditForTime, setIsEditForTime] = useState(false);
  const [editForTimeValue, setEditForTimeValue] = useState<number>(
    moment(new Date()).valueOf()
  );

  useEffect(() => {
    setvisible(isOpen);
  }, [isOpen]);

  const handleOk = async () => {
    if (!editForTimeValue) return message.error("Place select time !");
    let submint;
    if (timeType === ORDERTIME_ASAP) {
      submint = {
        timeType: timeType,
      };
    } else {
      submint = {
        timeType: timeType,
        diningTime: editForTimeValue, // 精确到毫秒
      };
    }

    try {
      // 提交数据
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

  const handleEditForTime = () => {
    setIsEditForTime(true);
  };
  const handleChangeForTime = (value) => {
    const time = moment(value).valueOf();
    console.log(`time`, time);
    setEditForTimeValue(time);
  };

  function disabledDate(current) {
    // Can not select days before today and today
    // return current && current < moment().endOf('day');

    // 只能选择今天跟今天之后的日期：
    return current < moment().startOf("day");
  }
  function disabledDateTime() {
    return {
      disabledHours: () => [1, 20],
      disabledMinutes: () => [30, 60],
      disabledSeconds: () => [55, 56],
    };
  }
  useEffect(() => {}, []);
  const onSelectTimeTypeChange = (type) => {
    setTimeType(type);
    setIsEditForTime(false);

    if (type === 2) {
      handleEditForTime();
    }
  };
  return (
    <Modal visible={visible} onCancel={handleCancel} footer={null}>
      <div className="model-content">
        <header>
          <h1>Order Time</h1>
        </header>
        <ul id="orderTimeModal-content">
          <li onClick={() => onSelectTimeTypeChange(ORDERTIME_ASAP)}>
            <p>{orderTimeType.get(ORDERTIME_ASAP)}</p>
            <div>{timeType === ORDERTIME_ASAP && <CheckOutlined />}</div>
          </li>
          <li onClick={() => onSelectTimeTypeChange(ORDERTIME_ONTIME)}>
            <p>{orderTimeType.get(ORDERTIME_ONTIME)}</p>
            <div>
              {isEditForTime ? (
                <div style={{ width: "100% " }}>
                  <DatePicker
                    style={{ width: "100% " }}
                    placeholder="Select time"
                    showTime
                    showNow={false}
                    format="HH:mm, DD MMMM YYYY"
                    onChange={handleChangeForTime}
                    onOk={() => {
                      console.log(`isEditForTime`, isEditForTime);
                      setIsEditForTime(false);
                    }}
                    disabledDate={disabledDate}
                    // disabledTime={disabledDateTime}
                  />
                </div>
              ) : (
                <>
                  <span>
                    {moment(editForTimeValue)
                      .format('"HH:mm, DD MMMM YYYY"')
                      .replace(/\"/g, "")}
                  </span>
                  <div>
                    {timeType === ORDERTIME_ONTIME && <CheckOutlined />}
                  </div>
                </>
              )}
            </div>
          </li>
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

export default OrderTimeModal;
