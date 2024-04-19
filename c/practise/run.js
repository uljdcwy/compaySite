// @ts-ignore
const test = require("./build/Release/main.node");



let obj1 = test.createObject(10);

let obj2 = test.createObject(20);
console.log(test.add(obj1, obj2))