// 引入NODE模块
#include <node.h>

namespace test {
    // 使用V8的所有基础类
    using namespace v8;
    // 定义C ++函数 并传入参数 参数类型为引用传值 参数类型为 V8在定义的类型 FunctionCallbackInfo<Value>
    // 注  FunctionCallbackInfo<Value> 在NODE中调用时此写法为固定写法， 在NODE中调用的函数都会有args能获取回调信息
    void testFn(const FunctionCallbackInfo<Value>& args){
        // 获取当前的V8实例环境
        Isolate* isolate = args.GetIsolate();
        // 回调信息的句柄 与NODE关联
        args
        // 获取句柄的返回值
        .GetReturnValue()
        // 设置句柄的返回值
        .Set(
            // 使用V8的公共方法 新建字符串 
            String::NewFromUtf8(isolate, "test string")
            // 转换成对转换的值做检查
        .ToLocalChecked());
    }
    // 初始化方法 exports 
    void init(Local<Object> exports){
        // NODE_SET_METHOD 为 node定义的宏固定写法  可将函数抛给NODE引入的值 例  import { testFn } from "***.node"; 此时 testFn为 C++中的 testFn 函数
        NODE_SET_METHOD(exports, "testFn", testFn);
    }
    // NODE_SET_METHOD 为 node定义的宏固定写法 模块引入时调用 init
    NODE_MODULE(NODE_GYP_MODULE_NAME, init);
}