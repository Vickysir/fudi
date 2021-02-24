/*
 * @Author: your name
 * @Date: 2021-03-02 09:43:16
 * @LastEditTime: 2021-03-09 10:59:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /GitHub/fudi/config/config.js
 */
const path = require('path');

/**
 * 自定义配置(按照项目修改)
 */
const customConfig = {
    assetBasePath: "./",
    devServerPort: 8585,
}


const staticConfig = {
    buildPath: path.resolve(__dirname, '../build'),
    appPath: path.resolve(__dirname, '../src'),
    node_modules_path: path.resolve(__dirname, "../node_modules"),
    indexHtmlPath: path.resolve(__dirname, "../public/index.html"),
}
module.exports = { ...staticConfig, ...customConfig }

