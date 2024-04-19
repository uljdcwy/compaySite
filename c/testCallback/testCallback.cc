// 引入NODE模块
#include <node.h>

namespace test {
    // 使用V8的所有基础类
    using namespace v8;

    // 定义C ++函数 并传入参数 参数类型为引用传值 参数类型为 V8在定义的类型 FunctionCallbackInfo<Value>
    // 注  FunctionCallbackInfo<Value> 在NODE中调用时此写法为固定写法， 在NODE中调用的函数都会有args能获取回调信息
    void callback(const FunctionCallbackInfo<Value>& args) {
        // 获取当前的V8实例环境
        Isolate* isolate = args.GetIsolate();
        // 获取当前的V8环境的上下文对象
        Local<Context> context = isolate->GetCurrentContext();
        // V8的函数类型 fn 指向 V8函数类型转换的第0个参数
        Local<Function> fn = Local<Function>::Cast(args[0]);
        // 参数个数1
        // 定义const unsigned argc 为1
        const unsigned argc = 1;
        // 定义V8值类型 argv[argc] 代码版段
        Local<Value> argv[argc] = { 
            // 使用V8 String 新建字符test string
            String::NewFromUtf8(isolate, "test string")
            // 方法用于将 MaybeLocal<T> 转换为 Local<T> 
            .ToLocalChecked() 
        };
        // 将函数通过 Call 调用
        fn->Call(
            // 传入上下文对象
            context, 
            // 传入Null的环境，即NODE中的this指向
            Null(isolate), 
            // 参数个数
            argc, 
            // 参数值
            argv)
            // 方法用于将 MaybeLocal<T> 转换为 Local<T> 
            .ToLocalChecked();
    }

    // 初始化方法 exports  module
    void init(Local<Object> exports, Local<Object> module){
        // NODE_SET_METHOD 为 node定义的宏固定写法  可将函数抛给NODE引入的值 例  import callback from "***.node"; 此时 callback C++中的 callback 函数
        NODE_SET_METHOD(module, "exports", callback);
    }

    // NODE_SET_METHOD 为 node定义的宏固定写法 模块引入时调用 init
    NODE_MODULE(NODE_GYP_MODULE_NAME, init);

}