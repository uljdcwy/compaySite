#include <node.h>
#include "myobject.h"

namespace test {
    using namespace v8;
    using namespace node;

    Global<Function> MyObject::constructor;

    MyObject::MyObject(double value): value_(value) {

    }

    MyObject::~MyObject() {
        
    }

    void MyObject::Init(Isolate* isolate) {
        Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, New);
        tpl->SetClassName(String::NewFromUtf8(isolate, "MyObject").ToLocalChecked());
        tpl->InstanceTemplate()->SetInternalFieldCount(1);

        Local<Context> context = isolate->GetCurrentContext();
        constructor.Reset(isolate, tpl->GetFunction(context).ToLocalChecked());

        AddEnvironmentCleanupHook(isolate, [](void*){
            constructor.Reset();
        }, nullptr);
    }

    void MyObject::New(const FunctionCallbackInfo<Value>& args) {
        Isolate* isolate = args.GetIsolate();
        Local<Context> context = isolate->GetCurrentContext();

        if(args.IsConstructCall()) {
            double value = args[0]->IsUndefined() ? 0 : args[0]->NumberValue(context).FromMaybe(0);
            MyObject* obj = new MyObject(value);
            obj->Wrap(args.This());
            args.GetReturnValue().Set(args.This());
        }
    }

    void MyObject::NewInstance(const FunctionCallbackInfo<Value>& args) {
        Isolate* isolate = args.GetIsolate();

        const unsigned argc = 1;
        Local<Value> argv[argc] = { args[0] };
        Local<Function> cons = Local<Function>::New(isolate, constructor);
        Local<Context> context = isolate->GetCurrentContext();
        Local<Object> instance = cons->NewInstance(context, argc, argv).ToLocalChecked();

        args.GetReturnValue().Set(instance);
    }
}