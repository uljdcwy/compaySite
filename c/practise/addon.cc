#include <node.h>
#include <node_object_wrap.h>
#include "myobject.h"

namespace test {
    using namespace v8;
    using namespace node;
    
    void CreateObject(const FunctionCallbackInfo<Value>& args) {
        MyObject::NewInstance(args);
    }

    void Add(const FunctionCallbackInfo<Value>& args) {
        Isolate* isolate = args.GetIsolate();
        Local<Context> context = isolate->GetCurrentContext();

        MyObject* obj1 = ObjectWrap::Unwrap<MyObject>(args[0]->ToObject(context).ToLocalChecked());
        MyObject* obj2 = ObjectWrap::Unwrap<MyObject>(args[1]->ToObject(context).ToLocalChecked());

        double sum = obj1->value() + obj2->value();
        args.GetReturnValue().Set(Number::New(isolate, sum));
    }

    void InitAll(Local<Object> exports) {
        MyObject::Init(exports->GetIsolate());
        
        NODE_SET_METHOD(exports, "createObject", CreateObject);
        NODE_SET_METHOD(exports, "add", Add);
    }

    NODE_MODULE(NODE_GYP_MODULE_NAME, InitAll)
}