// 引入NODE模块
#include <node.h>

namespace test {
    // 使用V8的所有基础类
    using namespace v8;
    // 使用NODE的所有基础类
    using namespace node;
    // 新建C语言中的类
    class TestS{
        // 公共方法
        public:
            // TestS 不能进行隐式类型转换 并且在进行 new 操作时需传入 V8环境对象 
            explicit TestS(Isolate* isolate):
                // count 初始化时传入0 
                count(0){
                    // 添加环境清除勾子 在NODE程序执行完成退出时执行，传入 this  
                    AddEnvironmentCleanupHook(isolate, DeleteInstance, this);
                }
                // 初始化count 的类型
                int count;
                // 环境清除时执行的方法
                static void DeleteInstance(void* data){
                    // 将传入的 data转换 成  TestS 的类型并删除; 
                    delete static_cast<TestS*>(data);
                }
    };
    // one 方法 
    // 定义C ++函数 并传入参数 参数类型为引用传值 参数类型为 V8在定义的类型 FunctionCallbackInfo<Value>
    // 注  FunctionCallbackInfo<Value> 在NODE中调用时此写法为固定写法， 在NODE中调用的函数都会有args能获取回调信息
    static void one(const FunctionCallbackInfo<Value>& args){
        // 获取当前的V8实例环境
        Isolate* isolate = args.GetIsolate();
        // obj 指向类型指针为 TestS    将值强制转换成TestS 类型
        TestS* obj = reinterpret_cast<TestS*>(
            // 获取参数中的数据即函数模版中的第三个参数的数据
            args.Data()
            // 转换成External 类型 并获取值
            .As<External>()->Value());
            // count自增一
        obj->count++;
        // 获取返回值设置为对象的当前count;
        args.GetReturnValue().Set((double)obj->count);
    }

    NODE_MODULE_INIT() {
        // 获取当前的V8实例环境
        Isolate* isolate = context->GetIsolate();
        // 新建一个C++中的对象
        TestS* data = new TestS(isolate);
        // 新建一个external 存储对象，值为 data
        Local<External> external = External::New(isolate, data);
        //  exports 相当于 NODE 中的 module.exports 可设置多个
        exports->Set(
            // 传入上下文对象关联上下文
            context, 
            // 新建字符串也就是 NODE中调用的名称
            String::NewFromUtf8(isolate, "method")
            // 将类型转换成Local<T>
            .ToLocalChecked(), 
            // 新建函数模板  函数体为 one 传入external 的值
            FunctionTemplate::New(isolate, one, external)
            // 获取函数 context
            ->GetFunction(context)
            // 转换成Local<T> 类型
            .ToLocalChecked())
            // 转换成C可识别类型
            .FromJust();
    }
}