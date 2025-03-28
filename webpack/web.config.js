// @ts-ignore
const path = require("path");
// @ts-ignore
const { VueLoaderPlugin } = require('vue-loader');
// @ts-ignore
let basePath = process.cwd();
module.exports = {
  target: "web",
  output: {
      filename: './js/[name].[contenthash:6].js',
      path: path.resolve(basePath, "web"),
      publicPath: "/",
      chunkFilename: "[name].[contenthash:6].js",
      clean: true,
  },
  plugins: [new VueLoaderPlugin()],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 16 * 1024, // 4kb
          },
        },
        generator: {
          filename: 'images/[contenthash][ext][query]'
        },
      },
      {
        test: /\.(glb|hdr|pcd)/i,
        type: 'asset/resource'
      },
      {
        test: /\.vue$/,
        use: ['vue-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 16 * 1024, // 4kb
          },
        },
        generator: {
          filename: 'font/[contenthash][ext][query]',
        },
      }
    ],
  }
}