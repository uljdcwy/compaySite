#ifndef Tobject_H
#define Tobject_H

#include <node.h>
#include <node_object_wrap.h>

namespace Tobject {
    class Tobject: 
        public node::ObjectWrap {
            public:
                static void init(v8::Isolate* isolate);
                static void NewInstance(const v8::FunctionCallbackInfo<v8::Value>& args);
                inline double value() const {return value_;}
            private:
                explicit Tobject(double value = 0);
                ~Tobject();
            static void New(const v8::FunctionCallbackInfo<v8::Value>& args);
            static v8::Global<v8::Function> constructor;
            double value_;
    };
}

#endif