import React, { useEffect, useState } from "react";
import { Modal, Input, Button, Select, message } from "antd";
import {
  RightOutlined,
  UserOutlined,
  TeamOutlined,
  CheckOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { isLogin } from "@/utils";
import { useAppStore } from "@/__internal";
import { APIBookTable } from "@/pages/api/request";

const { Option } = Select;

const OrderForModal = (props) => {
  const { isOpen, isClose, shopId } = props;
  const authInfo = useAppStore("authInfo");

  const [visible, setvisible] = useState(false);
  const [isEditForWho, setIsEditForWho] = useState(false);
  const [editForWhoValue, setEditForWhoValue] = useState({
    label: "For me",
    value: 1,
  });
  const [isEditForName, setIsEditForName] = useState(false);
  const [editForNameValue, setEditForNameValue] = useState("");
  const [isEditForPhone, setIsEditForPhone] = useState(false);
  const [editForPhoneValue, setEditForPhoneValue] = useState("");

  useEffect(() => {
    setvisible(isOpen);
  }, [isOpen]);

  const handleOk = async () => {
    if (editForWhoValue.value === 1) {
      // for me
      if (!isLogin(authInfo))
        return message.error(
          "Book table for yourself, Place login! or Book for Others！"
        );
      setEditForNameValue(authInfo.nickname);
      setEditForPhoneValue(authInfo.phone);
    }
    // 校验数据必填
    if (!editForNameValue) return message.error("Place input your name !");
    if (!editForPhoneValue)
      return message.error("Place input your phone number !");

    const submint = {
      consignee: editForNameValue, //收货人
      sex: 0, // 性别
      phone: editForPhoneValue, //  电话
      peopleNumber: 0, //
      diningTime: 0, // 精确到毫秒
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

  const handleEditForWho = () => {
    setIsEditForWho(true);
  };
  const handleChangeForWho = (value) => {
    setEditForWhoValue(value);
    setIsEditForWho(false);
    if (value.value === 1) {
      // for me
      if (!isLogin(authInfo)) {
        setEditForNameValue("");
        setEditForPhoneValue("");
        return message.error(
          "Book table for yourself, Place login! or Book for Others！"
        );
      } else {
        setEditForNameValue(authInfo.nickname);
        setEditForPhoneValue(authInfo.phone);
      }
    }
  };
  const handleEditForName = () => {
    setIsEditForName(true);
  };
  const handleChangeForName = (e) => {
    const value = e.target.value;
    setEditForNameValue(value);
  };
  const handleEditForPhone = () => {
    setIsEditForPhone(true);
  };
  const handleChangeForPhone = (e) => {
    const value = e.target.value;
    setEditForPhoneValue(value);
  };

  useEffect(() => {
    if (!isLogin(authInfo)) {
      setEditForNameValue("");
      setEditForPhoneValue("");
    } else {
      setEditForNameValue(authInfo.nickname);
      setEditForPhoneValue(authInfo.phone);
    }
  }, []);

  return (
    <Modal visible={visible} onCancel={handleCancel} footer={null}>
      <div className="model-content">
        <header>
          <h1>Order for</h1>
        </header>
        <ul>
          <li>
            <p>
              <UserOutlined />
            </p>
            {isEditForWho ? (
              <div>
                <Select
                  size="large"
                  value={editForWhoValue}
                  labelInValue
                  style={{ width: "100% " }}
                  showArrow={false}
                  onChange={handleChangeForWho}
                >
                  <Option value={1}>For me</Option>
                  <Option value={2}>Others</Option>
                </Select>
              </div>
            ) : (
              <div>
                <span>{editForWhoValue.label}</span>
                <div onClick={handleEditForWho}>
                  <RightOutlined />
                </div>
              </div>
            )}
          </li>
          {editForWhoValue.value === 2 && (
            <li>
              <p>
                <TeamOutlined />
              </p>
              {isEditForName ? (
                <div>
                  <Input
                    value={editForNameValue}
                    placeholder="Input name ..."
                    style={{ width: "100% " }}
                    onChange={handleChangeForName}
                    suffix={
                      <CheckOutlined onClick={() => setIsEditForName(false)} />
                    }
                  />
                </div>
              ) : (
                <div>
                  <span>{editForNameValue || "name"}</span>
                  <div onClick={handleEditForName}>
                    <RightOutlined />
                  </div>
                </div>
              )}
            </li>
          )}
          {editForWhoValue.value === 2 && (
            <li>
              <p>
                <PhoneOutlined />
              </p>
              {isEditForPhone ? (
                <div>
                  <Input
                    value={editForPhoneValue}
                    placeholder="000-000-000"
                    type="number"
                    style={{ width: "100% " }}
                    onChange={handleChangeForPhone}
                    suffix={
                      <CheckOutlined onClick={() => setIsEditForPhone(false)} />
                    }
                  />
                </div>
              ) : (
                <div>
                  <span>{editForPhoneValue || "Phone"}</span>
                  <div onClick={handleEditForPhone}>
                    <RightOutlined />
                  </div>
                </div>
              )}
            </li>
          )}
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

export default OrderForModal;
