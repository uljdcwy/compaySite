const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const config = require('./web.config.js');
/**
 * @type {any}
 */
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");
let basePath = process.cwd();
// @ts-ignore
module.exports = merge(common, config, {
    // @ts-ignore
    entry: {
        index: "./Services/index",
    },
    cache: false,
    output: {
        filename: '[name].js',
        path: path.resolve(basePath, "node"),
        publicPath: "/",
        clean: true,
    },
    target: "node",
    mode: "production",
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            parallel: true
        })],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                SSRPackage: {
                    test: /[\\/]createSSRApp[\\/]/,
                    minChunks: 1,
                    name: 'SSRPackage',
                    priority: 0,
                    minSize: 0
                },
                SSRRouter: {
                    test: /[\\/]SSRRouter[\\/]/,
                    minChunks: 1,
                    name: 'SSRRouter',
                    priority: 0,
                    minSize: 0
                },
                verdors: {
                    test: /[\\/]node_modules[\\/]/,
                    /**
                     * @param {{ context: string; }} module
                     */
                    name(module) {
                        //取得名称。例如 /node_modules/packageName/not/this/part.js
                        // 或 /node_modules/packageName
                        let regExp = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
                        const packageName = regExp && regExp[1];

                        // npm package 是 URL 安全的，但有些服务不喜欢 @ 符号
                        return `npm.${packageName?.replace('@', '')}`;
                    },
                },
                common: {
                    name: 'common' + Math.floor(Math.random() * 1000) + '' + Date.now(),
                    minChunks: 2,
                    priority: 0,
                    minSize: 0
                }
            }
        }
    },
    module: {
        rules: [
            {
                // scss加载
                test: /\.(sc|sa|)ss$/i,
                use: ['style-loader', 'css-loader', 
                {
                    loader: 'sass-loader', // 编译 Sass
                    options: {
                        implementation: require('sass'),
                        sourceMap: false,  // 禁用 source map
                        sassOptions: {
                            api: 'modern-compiler', // 使用现代编译器 API
                            quietDeps: true, // 忽略来自 node_modules 的弃用警告
                        },
                    },
                }, 'postcss-loader'],// 'clear-print',
                exclude: /(node_modules|public)/,
                include: [
                    path.resolve(basePath, './src')
                ]
            },
            {
                // less加载
                test: /\.less$/i,
                use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader'],// 'clear-print',
                exclude: /(node_modules|public)/,
                include: [
                    path.resolve(basePath, 'src')
                ]
            },
            {
                // 静态CSS加载
                test: /\.css$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader'],// 'clear-print',
            }
        ]
    }
});