// 引入NODE模块
#include <node.h>

namespace test {
    // 使用V8的所有基础类
    using namespace v8;
    
    // 定义C ++函数 并传入参数 参数类型为引用传值 参数类型为 V8在定义的类型 FunctionCallbackInfo<Value>
    // 注  FunctionCallbackInfo<Value> 在NODE中调用时此写法为固定写法， 在NODE中调用的函数都会有args能获取回调信息
    void CFunction(const FunctionCallbackInfo<Value>& args){
        // 获取当前的V8实例环境
        Isolate* isolate = args.GetIsolate();
        
        // 回调信息的句柄 与NODE关联
        args
        // 获取句柄的返回值
        .GetReturnValue()
        // 设置句柄的返回值
        .Set(
            // 使用V8的公共方法 新建字符串 
            String::NewFromUtf8(isolate, "zheng")
            // 方法用于将 MaybeLocal<T> 转换为 Local<T> 
            .ToLocalChecked());
    }

    // 定义C ++函数 并传入参数 参数类型为引用传值 参数类型为 V8在定义的类型 FunctionCallbackInfo<Value>
    // 注  FunctionCallbackInfo<Value> 在NODE中调用时此写法为固定写法， 在NODE中调用的函数都会有args能获取回调信息
    void CreateFunction(const FunctionCallbackInfo<Value>& args) {
        // 获取当前的V8实例环境
        Isolate* isolate = args.GetIsolate();

        // 获取当前的V8环境的上下文对象
        Local<Context> context = isolate->GetCurrentContext();
        // 使用函数模板新建函数 模板指向函数 CFunction
        Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, CFunction);
        // 获取函数模板新建的函数
        Local<Function> fn = tpl->GetFunction(context)
        // 新将类型转换成Local<T>
        .ToLocalChecked();
        // 设置函数名称
        fn->SetName(
            // 新建字符串
            String::NewFromUtf8(isolate, "CFunction")
        // 新将类型转换成Local<T>
        .ToLocalChecked());
        // 获取返回值并设置为函数
        args.GetReturnValue().Set(fn);
    }

    // 初始化方法 exports module
    void Init(Local<Object> exports, Local<Object> module) {
        // NODE_SET_METHOD 为 node定义的宏固定写法  可将函数抛给NODE引入的值 例  import testFn from "***.node"; 此时 testFn C++中的 CreateFunction 函数
        NODE_SET_METHOD(module, "exports", CreateFunction);
    }

    // NODE_SET_METHOD 为 node定义的宏固定写法 模块引入时调用 init
    NODE_MODULE(NODE_GYP_MODULE_NAME, Init);
}