#ifndef MYOBJECT_H
#define MYOBJECT_H

#include <node.h>
#include <node_object_wrap.h>

namespace test {
    using namespace node;
    using namespace v8;

    class MyObject : public ObjectWrap {
        public:
            static void Init(Isolate* isolate);
            static void NewInstance(const FunctionCallbackInfo<Value>& args);
            inline double value() const {return value_;}
        
        private:
            explicit MyObject(double value = 0);
            ~MyObject();
            
            static void New(const FunctionCallbackInfo<Value>& args);
            static Global<Function> constructor;
            double value_;
    };
}

#endif