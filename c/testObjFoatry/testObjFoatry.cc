// 引入NODE模块
#include <node.h>

namespace test {
    // 使用V8的所有基础类
    using namespace v8;

    // 定义C ++函数 并传入参数 参数类型为引用传值 参数类型为 V8在定义的类型 FunctionCallbackInfo<Value>
    // 注  FunctionCallbackInfo<Value> 在NODE中调用时此写法为固定写法， 在NODE中调用的函数都会有args能获取回调信息
    void CreateObject(const FunctionCallbackInfo<Value>& args) {
        // 获取当前的V8实例环境
        Isolate* isolate = args.GetIsolate();
        // 获取当前的V8环境的上下文对象
        Local<Context> context = isolate->GetCurrentContext();
        // 新建对象模板
        Local<Object> obj = Object::New(isolate);
        // 在对象模板中设置数据
        obj->Set(
            // 传入上下文对象
            context, 
            // 用字符串静态方法新建属性msg
            String::NewFromUtf8(isolate, "msg")
            // 转奂类型为Local<T>
            .ToLocalChecked(), 
            // 将第0个参数转换成字符串
        args[0]->ToString(context)
        // 转换成 Local<T> 类型
        .ToLocalChecked())
        // 转换成C++ 识别对象
        .FromJust();

        args.GetReturnValue().Set(obj);
    }

    // 初始化方法 exports
    void init(Local<Object> exports){
        // NODE_SET_METHOD 为 node定义的宏固定写法  可将函数抛给NODE引入的值 例  import { CreateObject } from "***.node"; 此时 CreateObject C++中的 CreateObject 函数
        NODE_SET_METHOD(exports, "CreateObject", CreateObject);
    }

    // NODE_SET_METHOD 为 node定义的宏固定写法 模块引入时调用 init
    NODE_MODULE(NODE_GYP_MODULE_NAME, init);
}