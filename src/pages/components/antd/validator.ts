//确认两次密码校验一致
export function handleCfmPwd(rules, value, callback, form) {
    let password = form.getFieldsValue().password;
    if (password && password !== value) {
        callback(new Error('The two passwords do not match'))
    } else {

        // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
        callback();
    }
}

export function customValidator(rule, value, callback, fn, form?) {
    try {
        fn(rule, value, callback, form);
    } catch (err) {
        callback(err);
    }
}
