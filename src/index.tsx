/*
 * @Author: your name
 * @Date: 2021-03-22 16:37:38
 * @LastEditTime: 2021-03-22 18:15:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/index.tsx
 */
import React from "react";
import { APP } from "./app";
import { initAxiosConfig } from "./extends/axios";
import { MyApp } from "./__internal";
import ThemeComp from "./pages/components/header/themeComp";
import { BrowserRouter } from "react-router-dom";


MyApp.start(
    <BrowserRouter>
        <ThemeComp>
            <APP />
        </ThemeComp>
    </BrowserRouter>
    , {
        //store配置项（可选）
        storeOpt: {
            // 是否将数据存入Storage(可选："localStorage"、"sessionStorage"、"none")，默认：“none”
            saveItemToStorage: "localStorage",
            // 启动的时候加载上次的数据，默认：true
            loadDataOnOpen: true,
        },
        //（可选）数据中心数据。配置这个会覆盖掉MyStore标注的数据中心
        storeData: {},
        onInit: () => {
            initAxiosConfig()
        },
    });