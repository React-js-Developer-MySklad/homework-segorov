const path = require('path');
const {resolve} = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
    entry: './main.tsx',
    context: resolve(__dirname, 'src'),
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.svg'],
        alias: {
            '@src': path.resolve(__dirname, 'src'),
            '@components': path.resolve(__dirname, 'src/app/components'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@utils': path.resolve(__dirname, 'src/utils')
        }
    },
    module: {

        rules: [
//            {
//                test: /\.css$/,
//                use: [ 'style-loader', 'css-loader', 'postcss-loader' ],
//                include: [
//                    resolve(__dirname, 'src')
//                ],
//                exclude: /\.module\.css$/
//            },
//            {
//                test: /\.module\.css$/,
//                use: [
//                    'style-loader',
//                    {
//                        loader: 'css-loader',
//                        options: {
//                            modules: true
//                        }
//                    },
//                    'postcss-loader'
//                ]
//            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(js|ts)x?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(svg)$/i,
                type: 'asset/inline'
            }
        ],
    },
    output: {
        path: resolve(__dirname, 'build'),
        clean: true,
        filename: "[name].[contenthash].js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
        }),
        new CleanWebpackPlugin(),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                configFile: resolve(__dirname, 'tsconfig.json')
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        })
    ]
};