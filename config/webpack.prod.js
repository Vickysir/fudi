const path = require('path');
const baseConfig = require('./webpack.base');

const config = require("./config");

const CompressionWebpackPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    ...baseConfig,
    mode: "production",
    output: {
        ...baseConfig.output,
        filename: 'static/js/[name].[contenthash:8].js'
    },
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.(j|t)sx?$/,
                        include: config.appPath,
                        exclude: config.node_modules_path,
                        use: "babel-loader"
                    },
                    {
                        test: /\.(html)$/,
                        loader: 'html-loader'
                    },
                    {
                        test: /\.less?$/,
                        include: path.resolve(__dirname, '../src/styles/theme/icon.less'), // 为改文件单独开启 css modules
                        use: ["style-loader",
                            {
                                loader: "css-loader",
                                options: {
                                    modules: true,
                                }
                            },
                            "less-loader"
                        ]
                    },
                    {
                        test: /\.(less|css)$/,
                        use: ["style-loader", "css-loader",
                            {
                                loader: "less-loader",
                                options: {
                                    lessOptions: {
                                        // modifyVars: {
                                        //     'primary-color': 'red',
                                        //     'link-color': '#1DA57A',
                                        //     'border-radius-base': '2px',
                                        // },
                                        javascriptEnabled: true,
                                    }
                                }
                            },
                            {
                                loader: 'style-resources-loader',
                                options: {
                                    patterns: [
                                        path.resolve(__dirname, '../src/styles/theme/global.less'),
                                        path.resolve(__dirname, '../src/styles/index.less')
                                    ]
                                }
                            }
                        ]
                    },
                    {
                        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                        use: [
                            {
                                loader: 'babel-loader',
                            },
                            {
                                loader: '@svgr/webpack',
                                options: {
                                    babel: false,
                                    icon: true,
                                },
                            },
                        ],
                        include: [
                            path.resolve(__dirname, '../src/assets/images/common/svg'),
                            path.resolve(__dirname, '../src/assets/images/common/icon'),
                        ]// svg以组件方式引入
                    },
                    {
                        test: /\.(svg|jpg|jpeg|bmp|png|webp|gif|ico|ttf)$/,
                        loader: 'url-loader',
                        options: {
                            name: 'img/[name].[hash:8].[ext]',
                            outputPath: config.buildPath,
                        }
                    },
                    {
                        loader: 'file-loader',
                        exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
                        options: {
                            name: 'media/[name].[hash:8].[ext]',
                        },
                    }
                ]
            }

        ]
    },
    plugins: [
        ...baseConfig.plugins,
        // gzip压缩
        new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
            threshold: 10240, // 大于这个大小的文件才会被压缩
            minRatio: 0.8
        }),
        new MiniCssExtractPlugin({
            filename: "static/css/[name].[contenthash:8].css"
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            minChunks: 2,
            maxInitialRequests: 5,
            cacheGroups: {
                // 提取公共模块
                commons: {
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]/,
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0,
                    name: 'common'
                }
            },
        },
        runtimeChunk: true,
        minimizer: [
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: { map: { inline: false } }
            }),
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: false,
            })
        ]
    }
}

