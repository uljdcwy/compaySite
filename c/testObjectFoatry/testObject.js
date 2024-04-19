// @ts-ignore
const Tobject = require("./build/Release/testObject.node");
let o = new Tobject(100);
console.log(Tobject(),"Tobject",o,o.one(),Tobject(10).one())