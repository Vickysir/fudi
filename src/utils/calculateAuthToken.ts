import hmacSHA1 from 'crypto-js/hmac-sha1';
import { Base64 } from 'js-base64';

// 1、所有接口请求需携带http header固定字段：
// Authorization：授权信息
// Authorization-Device：操作系统，如：ios、android
// Authorization-Version：客户端版本号
// Authorization-Timestamp：当前发起请求的13位时间戳
// Accept-Language：预期数据响应语言，中文：zh-CN，英文：en-US，由用户手机操作系统当前使用语言决定

// 2、Authorization 生成：
// 所需要参数：
//   token：会话令牌，若无则为空字符串
//   api：当前的请求的接口，如：/user/info，安卓端可通过new URL().getPath()获取
//   device：操作系统，如：ios、android
//   version：当前客户端版本号
//   timestamp：13位时间戳

// 计算方法：
//   将api、device、timestamp、version四个参数通过hmac-sha1算法签名(key:api, value:(device + "\n" + timestamp + "\n" + version))，得到字符串signature
//   参数内容示例：
//           key: /user/login
//           value:
//                ios
//                1539743443000
//                1.0.0
//   将token与signature通过":"拼接，再进行base64加密
//     signature = hmac-sha1(api, device + "\n" + timestamp + "\n" + version)
//     Authorization = base64(token + ":" + signature)

export function getAuthorization(api: string, timestamp: number, device: string, version: string, token: string): string {


    let Authorization, signature;

    let key = api;
    let value = device + "\n" + timestamp + "\n" + version;
    signature = hmacSHA1(value, key);
    Authorization = Base64.encode(`${token}:${signature}`);
    return Authorization
}

// 3、服务端响应数据结构参数：
//   字段：
//     event：响应事件，默认：SUCCESS
//       SUCCESS：业务处理成功
//       ERROR：业务处理失败，此时客户端需将describe字段toast处理
//       EXCEPTION：业务处理异常，此时客户端需记录请求相关的日志信息
//       其它：客户端需按照特定逻辑进行处理
//     data：附加数据，默认：空数组
//     describe：描述信息，默认：空字符串

//   示例：
//     业务处理成功，无附加数据：{"event":"SUCCESS","data":[],"describe":""}
//     业务处理成功，有附加数据：{"event":"SUCCESS","data":{"hello":"world"},"describe":""}
//     业务处理失败：{"event":"ERROR","data":[],"describe":"用户名或密码输入有误"}
//            {"event":"UNAUTHORIZED","data":[],"describe":"请求未授权"}
//     业务处理异常：{"event":"EXCEPTION","data":[],"describe":"系统异常，请稍后再试"}

// 4、公共分页参数：
//   offset：数据起始值，初始为0，非页码
//   limit：最大值20，每一页所展示的数据量
//   比如：目前有22条数据，当前页为第1页，每页展现10条数据
//   那么第一页分页参数为：offset=0,limit=10，第二页分页参数为:offset=10,limit=10，第三页offset=20,limit=10
//   判断若返回结果data size=0，则没有当前分页数据


interface browser {
    type?: string;
    versions?: number
}
export function getBrowser(): browser {
    var UserAgent = navigator.userAgent.toLowerCase();
    var browserInfo: browser = {};
    var browserArray = {
        IE: window.ActiveXObject || "ActiveXObject" in window, // IE
        Chrome: UserAgent.indexOf('chrome') > -1 && UserAgent.indexOf('safari') > -1, // Chrome浏览器
        Firefox: UserAgent.indexOf('firefox') > -1, // 火狐浏览器
        Opera: UserAgent.indexOf('opera') > -1, // Opera浏览器
        Safari: UserAgent.indexOf('safari') > -1 && UserAgent.indexOf('chrome') == -1, // safari浏览器
        Edge: UserAgent.indexOf('edge') > -1, // Edge浏览器
        QQBrowser: /qqbrowser/.test(UserAgent), // qq浏览器
        WeixinBrowser: /MicroMessenger/i.test(UserAgent) // 微信浏览器
    };
    // console.log(browserArray)
    for (var i in browserArray) {
        if (browserArray[i]) {
            var versions = '';
            if (i == 'IE') {
                versions = UserAgent.match(/(msie\s|trident.*rv:)([\w.]+)/)[2];
            } else if (i == 'Chrome') {
                for (var mt in navigator.mimeTypes) {
                    //检测是否是360浏览器(测试只有pc端的360才起作用)
                    if (navigator.mimeTypes[mt]['type'] == 'application/360softmgrplugin') {
                        i = '360';
                    }
                }
                versions = UserAgent.match(/chrome\/([\d.]+)/)[1];
            } else if (i == 'Firefox') {
                versions = UserAgent.match(/firefox\/([\d.]+)/)[1];
            } else if (i == 'Opera') {
                versions = UserAgent.match(/opera\/([\d.]+)/)[1];
            } else if (i == 'Safari') {
                versions = UserAgent.match(/version\/([\d.]+)/)[1];
            } else if (i == 'Edge') {
                versions = UserAgent.match(/edge\/([\d.]+)/)[1];
            } else if (i == 'QQBrowser') {
                versions = UserAgent.match(/qqbrowser\/([\d.]+)/)[1];
            }
            browserInfo.type = i;
            browserInfo.versions = parseInt(versions);
        }
    }
    return browserInfo;
}



