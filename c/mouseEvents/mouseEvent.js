const {
  Worker, isMainThread, parentPort, workerData,
} = require('node:worker_threads');
// @ts-ignore
const test = require("./build/release/winMouseEvent.node");
const readline = require('readline');

console.log("test", test['startMonitorMouse']((/** @type {any} */ downStatus,/** @type {any} */ x,/** @type {any} */ y,/** @type {any} */ e) => {
  let str = `${downStatus},${x},${y},${e}`;
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question(str, (answer) => {
    rl.close();
  });
}));


