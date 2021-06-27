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
import { getDefaultProps } from "antd-mobile/lib/picker/AbstractPicker";
import { formatDateToHour, segmentationTime } from "@/utils/timer";
import { number } from "mathjs";

const OrderTimeModal = (props) => {
  const { isOpen, isClose, shopId, finishFn } = props;
  const authInfo = useAppStore("authInfo");
  const commonInfo = useAppStore("commonInfo");

  const [visible, setvisible] = useState(false);
  const [timeType, setTimeType] = useState(ORDERTIME_ASAP);
  const [isEditForTime, setIsEditForTime] = useState(false);
  const [editForTimeValue, setEditForTimeValue] = useState<number>(
    moment(new Date()).valueOf()
  );
  const openTIme = segmentationTime(commonInfo?.startTimeFormat);
  const closeTIme = segmentationTime(commonInfo?.endTimeFormat);

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
    setEditForTimeValue(time);
  };

  function disabledDate(current) {
    // Can not select days before today and today
    //  return current && current < moment().endOf('day');
    // return current < moment().startOf("minute");
    return current && moment(current).isBefore(moment(), 'minute');

  }
  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }
  const getDisableHours = (start: number, end: number, minutesEnd: number) => {
    const current = moment().hours()

    let arry
    if (current <= start) {
      console.log(`arry 在营业时间开始前`)

      arry = [...range(0, 24).splice(0, start + 1), ...range(0, 24).splice(end, 24 - end)]
    }
    if (current > start && current <= (end - 1)) {
      if (minutesEnd > 0) {
        console.log(`minutesEnd >0`)

        arry = [...range(0, 24).splice(0, current + 1), ...range(0, 24).splice(end + 1, 24 - (end + 1))]
      } else {
        console.log(`整点`)

        arry = [...range(0, 24).splice(0, current + 1), ...range(0, 24).splice((end - 1), 24 - (end - 1))]
      }
      console.log(`arry 在营业区间`)
    }
    if (current > (end - 1)) {
      console.log(`arry 在营业时间结束后`)

      arry = [...range(0, 24)]
    }
    return arry
  }

  const getDisableMinutes = (disabledHours: number[], userSelectHour: number, closeTIme) => {
    const currentMinutes = moment().minutes()

    if (disabledHours.indexOf(userSelectHour) > 0) { // 小时都被禁用时
      return range(0, 60)

    } else {
      if (userSelectHour === moment().hours() + 1) {
        console.log(`配送1小时`)
        return range(0, 60).splice(0, currentMinutes);
      }
      if (userSelectHour === Number(closeTIme.h)) {
        console.log(`结束时间`)
        return range(0, 60).splice(Number(closeTIme.m), 60 - Number(closeTIme.m));
      }
      if (currentMinutes >= Number(closeTIme.m)) {
        return range(0, 60) //全部禁用
      }
      return []
    }
  }
  const getDefaultTime = (start, end) => {
    const currentDay = moment().days();
    const currentHour = moment().hours();
    const currentMinutes = moment().minutes();
    let h = 0;

    if (currentHour <= Number(start.h)) {
      h = Number(start.h) + 1
    }
    if (currentHour > Number(start.h) && currentHour < Number(end.h)) {
      h = currentHour + 1
    }
    if (currentHour >= Number(end.h)) {
    }

    return `${h}:${currentMinutes}`
  }

  const disabledTime = current => {
    const hours = moment().hours()
    const minutes = moment().minutes()
    // const seconds = moment().seconds()
    const currentHour = moment(current).hour();
    if (current && moment(current).date() === moment().date()) {
      const hoursArry = getDisableHours(Number(openTIme.h), Number(closeTIme.h), Number(closeTIme.m));
      // setDisabledHoursArry(hoursArry);
      console.log(`营业时间：${commonInfo.startTimeFormat} - ${commonInfo.endTimeFormat}`)
      return {
        disabledHours: () => hoursArry,
        disabledMinutes: () => getDisableMinutes(hoursArry, currentHour, closeTIme)
      }
    }
    // TODO 其他日期，应该禁用掉非营业时间
    return {
      disabledHours: () => [],
      disabledMinutes: () => [],
      // disabledSeconds: () => [],
    }
  }

  useEffect(() => { }, []);
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
              {timeType === ORDERTIME_ONTIME && <CheckOutlined />}
            </div>
          </li>
          <li>
            {isEditForTime ? (
              <div style={{ width: "100% " }}>
                <DatePicker
                  style={{ width: "100% " }}
                  placeholder="Select time"
                  showTime={
                    { defaultValue: moment(getDefaultTime(openTIme, closeTIme), 'HH:mm') }
                  }
                  showNow={false}
                  format="HH:mm, DD MMMM YYYY"
                  disabledDate={disabledDate}
                  disabledTime={disabledTime}
                  onChange={handleChangeForTime}
                  onOk={() => {
                    setIsEditForTime(false);
                  }}
                />
              </div>
            ) : (
              <span className="orderTimeModal-content-ontime">
                {moment(editForTimeValue)
                  .format('"HH:mm, DD MMMM YYYY"')
                  .replace(/\"/g, "")}
              </span>
            )}
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
