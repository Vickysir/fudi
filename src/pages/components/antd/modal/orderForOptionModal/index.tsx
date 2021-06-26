import React, { useEffect, useState } from "react";
import { Modal, Input, Button, Select, message } from "antd";
import {
  ShoppingOutlined,
  RightOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { isLogin } from "@/utils";
import { useAppStore } from "@/__internal";
import { APIBookTable, APIHistoricalContacts } from "@/pages/api/request";
import style from '@/styles/theme/icon.less'
import './index.less'
import { deliveryOption, DELIVERYOPTION_FRONT, DELIVERYOPTION_NEAR } from "@/utils/constant";

const { Option } = Select;

const orderForOptionModal = (props) => {
  const { isOpen, isClose, shopId, finishFn } = props;
  const authInfo = useAppStore("authInfo");

  const [visible, setvisible] = useState(false);
  const [isEditForWho, setIsEditForWho] = useState(false);
  const [editForWhoValue, setEditForWhoValue] = useState({
    label: deliveryOption.get(DELIVERYOPTION_FRONT),
    value: DELIVERYOPTION_FRONT,
  });

  useEffect(() => {
    setvisible(isOpen);
  }, [isOpen]);

  const handleOk = async () => {


    const submint = {
      orderOption: editForWhoValue, //收货人
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

  const handleEditForWho = () => {
    setIsEditForWho(true);
  };
  const handleChangeForWho = async (value) => {
    setEditForWhoValue(value);
    setIsEditForWho(false);
  };


  return (
    <Modal visible={visible} onCancel={handleCancel} footer={null}>
      <div className="model-content">
        <header>
          <h1>Order Option</h1>
        </header>
        <ul id="historyContacts-box">
          <li>
            <p>
              <ShoppingOutlined />
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
                  <Option value={DELIVERYOPTION_FRONT}>{deliveryOption.get(DELIVERYOPTION_FRONT)}</Option>
                  <Option value={DELIVERYOPTION_NEAR}>{deliveryOption.get(DELIVERYOPTION_NEAR)}</Option>
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

export default orderForOptionModal;
