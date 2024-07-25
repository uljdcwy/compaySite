let express = require('express');
let path = require("path")
let app = express();

let basePath = process.cwd();
const config = require(path.resolve(basePath, "./Services/config.json"));
let webpack = require('webpack');
let webpackConfig = require(path.resolve(basePath, "./webpack/webpack.dev"));
let compiler = webpack(webpackConfig);
let instance = require('webpack-dev-middleware')(compiler);
const hotInstance = require('webpack-hot-middleware')(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000,
});

app.use(instance);
app.use(hotInstance);

app.use(express.static(path.resolve(basePath, "./web")));

app.use(express.static(path.resolve(basePath, "./src/components/big-data-screen")))

app.listen(config.port, () => {
  console.log(`启动开发成功 localhost:${config.port}`);
})