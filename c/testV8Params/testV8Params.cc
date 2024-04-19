#include <node.h>
// 测试传递参数
namespace testV8Params {
    // 使用V8的所有基础类
    using namespace v8;
    // 定义C ++函数 并传入参数 参数类型为引用传值 参数类型为 V8在定义的类型 FunctionCallbackInfo<Value>
    void Add(const FunctionCallbackInfo<Value> &args) {
        // 获取当前的V8实例环境
        Isolate *isolate = args.GetIsolate();
        // 判断参数长度小于 2 时出错误
        if (args.Length() < 2) {
            // 使用V8指针实例 
            isolate
            // 抛出错误选项
            ->ThrowException(
                // 使用类型错误方法抛出字符串length err 给 node;
                Exception::TypeError(
                    // 新建字符串类型
                    String::NewFromUtf8(isolate, "length err")
                    // 方法用于将 MaybeLocal<T> 转换为 Local<T> 
                    .ToLocalChecked()));
            return;
        }
        // 判断第0个参数或者第1个参数不为数字值
        if (!args[0]->IsNumber() || !args[1]->IsNumber()) {
            // 使用V8指针实例 
            isolate
            // 抛出错误选项
            ->ThrowException(
                // 使用类型错误方法抛出字符串length err 给 node;
                Exception::TypeError(
                    // 新建字符串类型
                    String::NewFromUtf8(isolate, "error type")
                    // 方法用于将 MaybeLocal<T> 转换为 Local<T> 
                    .ToLocalChecked()));
            return;
        }
        // 定义double 类型的变量值 赋值两个参数相加
         double value = 
         // 将第0个参数转换成Number类型并调用指针获取值
         args[0].As<Number>()->Value()
         + 
         // 将第1个参数转换成Number类型并调用指针获取值
         args[1].As<Number>()->Value();
        // 将值转换成V8类型
        Local<Number> num = Number::New(isolate, value);
        // 回调信息的句柄 与NODE关联
        args
        // 获取句柄的返回值
        .GetReturnValue()
        // 设置句柄的返回值
        .Set(num);
    }
    // 初始化方法 exports 
    void init(Local<Object> exports) {
        // NODE_SET_METHOD 为 node定义的宏固定写法  可将函数抛给NODE引入的值 例  import { testFn } from "***.node"; 此时 testFn为 C++中的 Add 函数
        NODE_SET_METHOD(exports, "testFn", Add);
    }
    // NODE_SET_METHOD 为 node定义的宏固定写法 模块引入时调用 init
    NODE_MODULE(NODE_GYP_MODULE_NAME, init)

}