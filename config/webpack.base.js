const path = require('path');
const pkg = require("../package.json");

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { getThemeVariables } = require('antd/dist/theme');

const config = require("./config");
const { DefinePlugin } = require('webpack');

module.exports = {
    entry: {
        app: path.resolve(config.appPath, "index.tsx"),
        vendor: ['react', 'react-dom']
    },
    output: {
        filename: 'js/[name].bundle.js',
        path: config.buildPath,
        publicPath: config.assetBasePath,
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
                        include: path.resolve(__dirname, '../src/assets/images/common/svg')
                    },
                    {
                        test: /\.(svg|jpg|jpeg|bmp|png|webp|gif|ico|ttf)$/,
                        loader: 'url-loader',
                        options: {
                            name: 'img/[name].[hash:8].[ext]',
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
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
        plugins: [
            new TsconfigPathsPlugin({
                extensions: [".ts", ".tsx", ".js"]
            }),
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'public', ignore: ['index.html'] },
        ]),
        new HtmlWebpackPlugin({
            template: config.indexHtmlPath,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeOptionalTags: false,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeAttributeQuotes: true,
                removeCommentsFromCDATA: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            }
        }),
        new CleanWebpackPlugin(),
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV),
            APP_VERSION: JSON.stringify(`Version${pkg.version} - ${new Date().toUTCString()}`),
        }),
    ]
}