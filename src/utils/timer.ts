/*
 * @Author: your name
 * @Date: 2021-04-08 14:53:21
 * @LastEditTime: 2021-04-08 16:10:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/utils/timer.ts
 */

let timer = null;
// 倒计时 逻辑
export const handleClickTimer = () => {
    let count = APP_STORE.commonInfo.count;
    if (count === null) return

    APP_STORE.commonInfo = {
        ...APP_STORE.commonInfo,
        liked: false,
    };
    timer = setInterval(() => {
        let count = APP_STORE.commonInfo.count;
        APP_STORE.commonInfo = {
            ...APP_STORE.commonInfo,
            count: --count
        };
        console.log(`计时器`, count)
        if (count <= -1) {
            clearInterval(timer)
            APP_STORE.commonInfo = {
                ...APP_STORE.commonInfo,
                count: 60,
                liked: true
            };
        }
    }, 1000)
};

export const clearTimer = () => {
    clearInterval(timer)
}

