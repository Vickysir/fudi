/*
 * @Author: your name
 * @Date: 2021-03-09 11:09:54
 * @LastEditTime: 2021-04-06 15:50:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fudi/src/app.tsx
 */
import React, { useCallback } from "react";
import { useViewport } from "./comps/useViewport";
import Web from "./pages/web";
import Mobile from "./pages/mobile";
import { WebRoutes } from "./routes";
import "./styles/font.less"


export const APP = () => {
    const { width } = useViewport();
    const breakpoint = 620;

    return width < breakpoint ? <Mobile /> : <WebRoutes />

}
