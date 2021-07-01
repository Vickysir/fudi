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
const getAfterNowDisabledHours=()=> {
    let HOURS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
    var myDate = new Date();
    // myDate.getHours(); //获取当前小时数(0-23)
    // myDate.getMinutes(); //获取当前分钟数(0-59)
    let hours = []
    let HOURSDate=[];
    // let time = this.startTime
    let timeArr = [myDate.getHours(),myDate.getMinutes()]
    // let timeArr = time.split(':')
    for (var i = 0; i < (timeArr[0]); i++) {
    console.log('hoursiiiiiiiiii', HOURS, i, HOURS.indexOf(i));
    hours.push(i)
    }
    for ( var i = 0; i < HOURS.length; i++) {
    if (hours.indexOf(i) < 0) {
    HOURSDate.push(i)
    }
    }
    return HOURSDate
    }
const getAfterNowDisabledMinutes=(selectedHour)=> {
    var MINITES = []
    for(var i = 0;i<60;i++){
    MINITES.push(i)
    }
    var myDate = new Date();
    // myDate.getHours(); //获取当前小时数(0-23)
    // myDate.getMinutes(); //获取当前分钟数(0-59)
    let timeArr = [myDate.getHours(), myDate.getMinutes()]
    let minutes = []
    let MINITESDATE=[]
    if (selectedHour == (timeArr[0])) {
    for (var i = 0; i < (timeArr[1]); i++) {
    minutes.push(i)
    }
    }
    for(var i = 0;i<MINITES.length;i++){
    if (minutes.indexOf(i) < 0) {
    MINITESDATE.push(i)
    }
    }
    return MINITESDATE
}
const getBeforNowDisabledHours =(startTime)=> {
    let hours = []
    let time = startTime
    let timeArr = time.split(':')
    for (var i = 0; i < parseInt(timeArr[0]); i++) {
    hours.push(i)
    }
    return hours
    }
const getBeforNowDisabledMinutes =(selectedHour,startTime) =>{
    let time = startTime
    let timeArr = time.split(':')
    let minutes = []
    if (selectedHour == parseInt(timeArr[0])) {
    for(var i = 0; i < parseInt(timeArr[1]); i++) {
    minutes.push(i)
    }
    }
    return minutes
    }
     
const getBeforNowDisabledSeconds =(selectedHour, selectedMinute,startTime)=> {
    let time = startTime
    let timeArr = time.split(':')
    let second = []
    if (selectedHour == parseInt(timeArr[0]) && selectedMinute == parseInt(timeArr[1])) {
    for(var i = 0; i <= parseInt(timeArr[2]); i++) {
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

