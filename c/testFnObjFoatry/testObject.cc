#include <node.h>
#include "Tobject.h"

namespace Tobject {
    using namespace v8;

    void CreateObject(const FunctionCallbackInfo<Value>& args) {
        Tobject::NewInstance(args);
    }

    void Add(const FunctionCallbackInfo<Value>& args) {
        Isolate* isolate = args.GetIsolate();

        Local<Context> context = isolate->GetCurrentContext();

        Tobject* obj1 = node::ObjectWrap::Unwrap<Tobject>(args[0]->ToObject(context).ToLocalChecked());
        Tobject* obj2 = node::ObjectWrap::Unwrap<Tobject>(args[1]->ToObject(context).ToLocalChecked());

        double sum = obj1->value() + obj2->value();
        args.GetReturnValue().Set(Number::New(isolate, sum));
    }

    void init(Local<Object> exports, Local<Object> module) {
        Tobject::init(exports->GetIsolate());
        NODE_SET_METHOD(exports, "CreateObject", CreateObject);
        NODE_SET_METHOD(exports, "add", Add);
    }

    NODE_MODULE(NODE_GYP_MODULE_NAME, init)
}