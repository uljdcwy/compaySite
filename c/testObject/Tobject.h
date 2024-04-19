#ifndef Tobject_H
#define Tobject_H

#include <node.h>
#include <node_object_wrap.h>

namespace Tobject {
    using namespace v8;

    // 声明一个类Tobject，它继承自node::ObjectWrap
    class Tobject : public node::ObjectWrap {
    public:
        // 静态方法，用于初始化导出对象
        static void init(Local<Object> exports);

    private:
        // 显式构造函数，用于初始化value_属性，默认为0
        explicit Tobject(double value = 0);

        // 析构函数
        ~Tobject();

        // 静态方法，用于创建Tobject实例
        static void New(const FunctionCallbackInfo<Value>& args);

        // 静态方法，用于处理一个操作（one）
        static void one(const FunctionCallbackInfo<Value>& args);

        // 类的私有成员变量
        double value_;
    };
}

#endif