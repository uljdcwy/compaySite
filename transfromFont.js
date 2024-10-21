const ft = require("facetype-js");
// const jsonStringify = require("json-stringify-safe")

const inputPath = "/compaySite/public/font/msyh.ttf"; // 确保路径正确
const outputPath = "/compaySite/public/font/wrrh.json"; // 确保路径正确

console.log(ft,"ft");

ft.exportString(ft.facetype(inputPath), outputPath);

