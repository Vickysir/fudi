import React from "react";
import { APP } from "./app";
import { initAxiosConfig } from "./services/axiosclient";
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
        onInit: () => {
            initAxiosConfig()

        }
    });