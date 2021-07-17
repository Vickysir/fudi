import React, { useEffect, useState } from "react";
import { Modal, Button, Select, message, TimePicker } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import moment from "moment";
import { useAppStore } from "@/__internal";
import {
  orderTimeType,
  ORDERTIME_ASAP,
  ORDERTIME_ONTIME,
} from "@/utils/constant";
import "./index.less";
import { getAfterNowDisabledHours, getAfterNowDisabledMinutes, getBeforNowDisabledHours, getBeforNowDisabledMinutes, segmentationTime } from "@/utils/timer";

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
  const openTIme = commonInfo?.startTimeFormat ?? '00:00';
  const closeTIme = commonInfo?.endTimeFormat ?? '23:59';

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
    const time = compareShowDefaultTime(openTIme, closeTIme, moment(value).format('HH: mm'))

    setEditForTimeValue(time);
  };


  const compareShowDefaultTime = (s, d, inputTime) => {
    const date = moment().format('YYYY-MM-DD');
    const now = moment().add(1, 'h');  // 当前时间 加 1h
    const start = moment(`${date} ${s}`);
    const end = moment(`${date} ${d}`);
    const input = moment(`${date} ${inputTime}`);
    if (input.diff(start) > 0 && input.diff(end) < 0) { // 在营业时间
      if (now.diff(input) > 0) { // 当前时间 大于
        message.info(`You can only choose 1 hour later`)
        return moment(now).valueOf()
      }
      return moment(input).valueOf()
    }
    if (input.diff(start) <= 0) {
      return moment(start).valueOf()
    }
    if (input.diff(end) >= 0) {
      return moment(end).valueOf()
    }

  }
  const compareNowAndBusinessHours = (s, d) => {
    // 比较现在时间是否在营业时间之内
    const date = moment().format('YYYY-MM-DD');
    const now = moment().add(1, 'h');  // 当前时间 加 1h
    const start = moment(`${date} ${s}`);
    const end = moment(`${date} ${d}`);
    let startTime, endTime;
    if (now.diff(start) > 0) {
      startTime = now.format("HH:mm");
    } else {
      startTime = s;
    }
    if (now.diff(end) < 0) { // 超出营业时间
      endTime = d
    } else {
      endTime = d
    }
    return {
      startTime,
      endTime,
    }
  }

  const businessHours = compareNowAndBusinessHours(openTIme, closeTIme);

  const disabledHours = () => {
    const start = getBeforNowDisabledHours(businessHours.startTime);
    const end = getAfterNowDisabledHours(businessHours.endTime);
    return [...start, ...end]
  }
  const disabledMinutes = (selectedHour) => {
    const start = getBeforNowDisabledMinutes(selectedHour, businessHours.startTime)
    const end = getAfterNowDisabledMinutes(selectedHour, businessHours.endTime);
    return Array.from(new Set([...start, ...end]))
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
                <TimePicker
                  style={{ width: "100% " }}
                  placeholder="Select time"
                  inputReadOnly
                  hideDisabledOptions
                  showMinute
                  showNow={false}
                  format="HH:mm"
                  disabledHours={() => disabledHours()}
                  disabledMinutes={(selectedHour) => disabledMinutes(selectedHour)}
                  onChange={handleChangeForTime}
                  onOk={() => {
                    setIsEditForTime(false);
                  }}
                />
              </div>
            ) : (
              <span className="orderTimeModal-content-ontime" onClick={() => onSelectTimeTypeChange(ORDERTIME_ONTIME)}>
                {moment(editForTimeValue)
                  .format('HH:mm')
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
