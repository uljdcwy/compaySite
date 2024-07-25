const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
/**
 * @type {any}
 */
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");
let basePath = process.cwd();
// @ts-ignore
module.exports = merge(common, {
    // @ts-ignore
    entry: {
        index: "./Services/index"
    },
    output: {
        filename: '[name].js',
        path: path.resolve(basePath, "node"),
        publicPath: "",
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
});