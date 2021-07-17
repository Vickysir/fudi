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

// endTimeFormat: "23:59" 分割出小时与分钟
export const segmentationTime = (time) => {
    if (timer === "" || time === undefined || time === null) return
    const arr = time.split(':')
    let hh = arr[0];
    let mm = arr[1];
    if (hh < 10) {
        hh = hh.substr(1, 1)
    }
    if (mm < 10) {
        mm = mm.substr(1, 1)
    }
    return { h: hh, m: mm }
}


//禁用时间
function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
}
export const getBeforNowDisabledHours = (startTime) => {
    let hours = []
    let time = startTime
    let timeArr = time.split(':')
    for (var i = 0; i < parseInt(timeArr[0]); i++) {
        hours.push(i)
    }
    return hours
}
export const getAfterNowDisabledHours = (startTime) => {
    let HOURS = range(0, 24)
    let hours = []
    let HOURSDate = [];
    let time = startTime
    let timeArr = time.split(':')
    for (var i = 0; i <= (timeArr[0]); i++) {
        hours.push(i)
    }
    for (var i = 0; i < HOURS.length; i++) {
        if (hours.indexOf(i) < 0) {
            HOURSDate.push(i)
        }
    }
    return HOURSDate
}


export const getBeforNowDisabledMinutes = (selectedHour, startTime) => {
    let time = startTime
    let timeArr = time.split(':') // 09:30
    let minutes = []

    // 正好选中 营业开始 hour
    if (selectedHour == parseInt(timeArr[0])) {
        for (var i = 0; i <= parseInt(timeArr[1]); i++) {
            minutes.push(i)
        }
    }
    if (selectedHour === -1) {
        minutes = range(0, 60)
    }
    return minutes
}
export const getAfterNowDisabledMinutes = (selectedHour, startTime) => {
    var MINITES = range(0, 60)
    let time = startTime
    let timeArr = time.split(':') // 22:30
    let minutes = []
    let MINITESDATE = []
    if (selectedHour == (timeArr[0])) {
        for (var i = 0; i < (timeArr[1]); i++) {
            minutes.push(i)
        }
        for (var i = 0; i < MINITES.length; i++) {
            if (minutes.indexOf(i) < 0) {
                MINITESDATE.push(i)
            }
        }
    }

    return MINITESDATE
}



export const getBeforNowDisabledSeconds = (selectedHour, selectedMinute, startTime) => {
    let time = startTime
    let timeArr = time.split(':')
    let second = []
    if (selectedHour == parseInt(timeArr[0]) && selectedMinute == parseInt(timeArr[1])) {
        for (var i = 0; i <= parseInt(timeArr[2]); i++) {
            second.push(i)
        }
    }
    return second
}



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

