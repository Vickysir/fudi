/*
 * @Author: your name
 * @Date: 2021-04-08 14:53:21
 * @LastEditTime: 2021-04-12 17:35:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/utils/timer.ts
 */
import moment from 'moment';

export const formatDateTime = (dateTime, format = 'YYYY/MM/DD HH:mm:ss') => moment(new Date(dateTime)).format(format);
export const formatDateToDay = (dateTime, format = 'DD MMMM YYYY') => moment(new Date(dateTime)).format(format);
export const formatDateToHour = (dataTime, format = 'HH:mm') => moment(new Date(dataTime)).format(format);





let timer = null;
// 倒计时 逻辑
export const handleClickTimer = () => {
    APP_STORE.commonInfo = {
        ...APP_STORE.commonInfo,
        count: 60,
        liked: false,
    };
    timer = setInterval(() => {
        let count = APP_STORE.commonInfo.count;
        APP_STORE.commonInfo = {
            ...APP_STORE.commonInfo,
            count: --count
        };
        console.log(`计时器`, count)
        if (count === -1) {
            clearInterval(timer)
            // APP_STORE.commonInfo = {
            //     ...APP_STORE.commonInfo,
            //     count: 60,
            //     liked: true
            // };
        }
    }, 1000)
};

export const clearTimer = () => {
    clearInterval(timer)
}

