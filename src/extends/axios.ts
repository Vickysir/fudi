/*
 * @Author: your name
 * @Date: 2021-03-02 09:43:16
 * @LastEditTime: 2021-03-22 16:38:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/services/axiosclient.ts
 */
import axios from 'axios';
import { getAuthorization, getBrowser } from '@/utils/calculateAuthToken';
import { message } from 'antd';

/**
 * 配置axios的基本配置
 */
export function initAxiosConfig() {
    axios.defaults.baseURL = APP_CONFIG?.api;
    axios.defaults.timeout = 10000; //响应时间
    axios.defaults.headers.get['Content-Type'] = 'application/json; charse=UTF-8'
    axios.defaults.headers.post['Content-Type'] = 'application/json; charse=UTF-8'

    axios.interceptors.request.use((config) => {
        // let browser = getBrowser();
        const api = config.url;
        const timestamp = new Date().getTime();
        const device = "ios";
        const version = "8.0";
        const token = APP_STORE.authInfo?.token || ""
        const Authorization = getAuthorization(api, timestamp, device, version, token)
        config.headers.common['Authorization'] = Authorization;
        config.headers.common['Authorization-Device'] = device;
        config.headers.common['Authorization-Version'] = version;
        config.headers.common['Authorization-Timestamp'] = timestamp;
        config.headers.common['Accept-Language'] = "en-US";
        // config.headers['Content-Type'] = 'application/json; charset=UTF-8'
        // console.log(`config`, config)

        return config
    });

    axios.interceptors.response.use(
        response => {
            let data = response.data as ICustomResponse;
            if (data.event == "SUCCESS") {
                return data as any;
            } else {
                //-----------------------------------------------------------
                //              处理公共异常code状态（可选）
                //-----------------------------------------------------------
                {//异常code举例：处理401
                    if (data.event == "UNAUTHORIZED") {//认证失败
                        message.error("Login has expired，you will jump to the login page in 3 seconds")
                        setTimeout(() => {
                            APP_STORE?.clear();
                            console.log(`location:${window.location.origin}`)
                            window.location.href = `${window.location.origin}/#/home/login`;
                        }, 3000)
                    }
                }
                message.error(data.describe);
                return Promise.reject(data) as any;
            }
        },
        err => {
            //-----------------------------------------------------------
            //              处理公共异常code状态（可选）
            //-----------------------------------------------------------
        }
    );
}

/**
 * 规范化的数据返回格式
 */
interface ICustomResponse<T = any> {
    /**
     * 状态码
     */
    event?: string;
    /**
     * 返回的数据
     */
    data: T;
    /**
     * 数据状态描述。例如：`success`
     */
    describe: string;

    /**
     * 数据分页
     */
    page_info?: {
        /**
         * 第xx页
         */
        page_index: number;
        /**
         * 每页数据条数
         */
        page_size: number;
        /**
         * 总条数
         */
        total_size: number;
    }
}

declare module 'axios' {
    export interface AxiosInstance {
        get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ICustomResponse<T>>;
        delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ICustomResponse<T>>;
        head<T = any>(url: string, config?: AxiosRequestConfig): Promise<ICustomResponse<T>>;
        options<T = any>(url: string, config?: AxiosRequestConfig): Promise<ICustomResponse<T>>;
        post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ICustomResponse<T>>;
        put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ICustomResponse<T>>;
        patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ICustomResponse<T>>;
    }
}