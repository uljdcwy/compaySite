// @ts-ignore
const Tobject = require("./build/Release/testObject.node");
const obj = Tobject.CreateObject(10);


let val1 = Tobject.CreateObject(20);

console.log(Tobject.add(val1,obj),"Tobject")