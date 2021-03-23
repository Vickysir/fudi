/*
 * @Author: your name
 * @Date: 2021-03-23 09:08:59
 * @LastEditTime: 2021-03-23 10:18:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/pages/components/antd/validator.ts
 */

//确认两次密码校验一致
export const handleCfmPwd = (form) => {
    return (rule, value, callback) => {
        let password = form.getFieldsValue().password;
        if (password && password !== value) {
            callback('The two passwords do not match')
        } else {
            // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
            callback();
        }
    }
}


// 验证输入的email地址是否满足 string@string.string.string 的格式
export const emailValidator = () => {
    return (rule, value, callback) => {
        const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        if (!reg.test(value) && value) {
            callback('Please enter the correct email format');
        }
        callback();
    };
};


