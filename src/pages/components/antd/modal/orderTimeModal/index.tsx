import React, { useEffect, useState } from "react";
import { Rate, Modal, Input, Button, Select, DatePicker, message } from "antd";
import {
  RightOutlined,
  UserOutlined,
  TeamOutlined,
  HistoryOutlined,
  CheckOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { isLogin } from "@/utils";
import { useAppStore } from "@/__internal";
import { APIBookTable } from "@/pages/api/request";

const { TextArea } = Input;
const { Option } = Select;

const OrderTimeModal = (props) => {
  const { isOpen, isClose, shopId } = props;
  const authInfo = useAppStore("authInfo");

  const [visible, setvisible] = useState(false);

  const [isEditForTime, setIsEditForTime] = useState(false);
  const [editForTimeValue, setEditForTimeValue] = useState<number>(
    moment(new Date()).valueOf()
  );

  useEffect(() => {
    setvisible(isOpen);
  }, [isOpen]);

  const handleOk = async () => {
    if (!editForTimeValue) return message.error("Place input book time !");

    const submint = {
      consignee: "", //收货人
      sex: 0, // 性别
      phone: "", //  电话
      peopleNumber: 0, //
      diningTime: editForTimeValue, // 精确到毫秒
      shopId: shopId,
      //editForNoteValue
    };
    console.log(submint);
    try {
      await APIBookTable(submint);
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
  useEffect(() => { }, []);

  return (
    <Modal visible={visible} onCancel={handleCancel} footer={null}>
      <div className="model-content">
        <header>
          <h1>Order Time</h1>
        </header>
        <ul>
          <li>
            <p>
              <HistoryOutlined />
            </p>
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
                    onOk={() => setIsEditForTime(false)}
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
                  <div onClick={handleEditForTime}>
                    <RightOutlined />
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
