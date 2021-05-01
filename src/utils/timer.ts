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





// 倒计时 逻辑
// 开启倒计时，需要给初始值
// APP_STORE.commonInfo = {
//     ...APP_STORE.commonInfo,
//     count: 60,
//     liked: false,
// };
let timer = null;
export const handleClickTimer = () => {

    const count = APP_STORE.commonInfo?.count;
    const liked = APP_STORE.commonInfo?.liked;
    if (count === null || count === undefined) return;
    if (liked === undefined) return;
    if (timer) return;

    timer = setInterval(() => {
        let count = APP_STORE.commonInfo.count - 1;
        if (count === -1) {
            APP_STORE.commonInfo = {
                ...APP_STORE.commonInfo,
                count: null,
                liked: true
            };
            clearInterval(timer);
            timer = null;
            return
        }
        APP_STORE.commonInfo = {
            ...APP_STORE.commonInfo,
            count: count
        };
    }, 1000)
};

export const clearTimer = () => {
    clearInterval(timer)
}

