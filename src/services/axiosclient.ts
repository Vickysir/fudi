/*
 * @Author: your name
 * @Date: 2021-03-02 09:43:16
 * @LastEditTime: 2021-03-19 11:46:09
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
    axios.interceptors.request.use((config) => {
        // let browser = getBrowser();
        const api = config.url;
        const timestamp = new Date().getTime();
        const device = "ios";
        const version = "1.0";
        const token = APP_STORE.authInfo?.token || ""
        const Authorization = getAuthorization(api, timestamp, device, version, token)
        config.headers.common['Authorization'] = Authorization;
        config.headers.common['Authorization-Device'] = device;
        config.headers.common['Authorization-Version'] = version;
        config.headers.common['Authorization-Timestamp'] = timestamp;
        config.headers.common['Accept-Language'] = "en-US";
        console.log('token', token)
        console.log('config', config)
        return config
    });

    axios.interceptors.response.use(
        response => {
            let data = response.data as IcustomResponse;
            if (data.event == "SUCCESS") {
                return data as any;
            } else {
                //-----------------------------------------------------------
                //              处理公共异常code状态（可选）
                //-----------------------------------------------------------
                {//异常code举例：处理401
                    if (data.event == "UNAUTHORIZED") {//认证失败
                        APP_STORE?.clear();
                        window.location.reload();
                    }
                }
                message.error(data.describe);
                return Promise.reject(data) as any;
            }
        });
}
/**
 * 规范化的数据返回格式
 */
interface IcustomResponse<T = any> {
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
        get<T = any>(url: string, config?: AxiosRequestConfig): Promise<IcustomResponse<T>>;
        delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<IcustomResponse<T>>;
        head<T = any>(url: string, config?: AxiosRequestConfig): Promise<IcustomResponse<T>>;
        options<T = any>(url: string, config?: AxiosRequestConfig): Promise<IcustomResponse<T>>;
        post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<IcustomResponse<T>>;
        put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<IcustomResponse<T>>;
        patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<IcustomResponse<T>>;
    }
}