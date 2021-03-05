import React, { useCallback } from "react";
import { useViewport } from "./comps/useViewport";
import Web from "./pages/web";
import Mobile from "./pages/mobile";
import { WebRoutes } from "./routes";
import 'antd/dist/antd.css';
import './styles/index.min.css'


export const APP = () => {
    const { width } = useViewport();
    const breakpoint = 620;

    return width < breakpoint ? <Mobile /> : <WebRoutes />

}