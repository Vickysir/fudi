/*
 * @Author: your name
 * @Date: 2021-03-05 12:02:42
 * @LastEditTime: 2021-03-09 11:09:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /web-template/config/config.js
 */
const path = require('path');

/**
 * 自定义配置(按照项目修改)
 */
const customeConfig = {
    assetBasePath: "./",
    devServerPort: 8585,
}


const staticConfig = {
    buildPath: path.resolve(__dirname, '../build'),
    appPath: path.resolve(__dirname, '../src'),
    node_modules_path: path.resolve(__dirname, "../node_modules"),
    indexHtmlPath: path.resolve(__dirname, "../public/index.html"),
}
module.exports = { ...staticConfig, ...customeConfig }

