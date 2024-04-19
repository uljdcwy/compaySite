let express = require('express');
let app = express();
const config = require("./Services/config.json")
let webpack = require('webpack');
let webpackConfig = require('./webpack/webpack.dev');
let compiler = webpack(webpackConfig);
let instance = require('webpack-dev-middleware')(compiler);
const hotInstance = require('webpack-hot-middleware')(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000,
});

app.use(instance);
app.use(hotInstance);

app.use(express.static('./web'));

app.use(express.static('./src/components/big-data-screen'))

app.listen(config.port, () => {
  console.log(`启动开发成功 localhost:${config.port}`);
})