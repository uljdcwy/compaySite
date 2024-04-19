#include <node.h>
#include "Tobject.h"
namespace Tobject {
    using namespace v8;
    using namespace node;
    Global<Function> Tobject::constructor;

    Tobject::Tobject(double value): value_(value){

    }
    Tobject::~Tobject(){

    }

    void Tobject::Init(Isolate* isolate){
        Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, New);
        tpl->SetClassName(String::NewFromUtf8(isolate, "Tobject").ToLocalChecked());
        tpl->InstanceTemplate()->SetInternalFieldCount(1);

        NODE_SET_PROTOTYPE_METHOD(tpl, "one", one);

        Local<Context> context = isolate->GetCurrentContext();

        constructor.Reset(isolate, tpl->GetFunction(context).ToLocalChecked());

        AddEnvironmentCleanupHook(isolate, [](void*) {
            constructor.Reset();
        }, nullptr);
    }

    void Tobject::New(const FunctionCallbackInfo<Value>& args) {
        Isolate* isolate = args.GetIsolate();
        Local<Context> context = isolate->GetCurrentContext();
        if(args.IsConstructCall()) {
            double value = args[0]->IsUndefined() ? 0 : args[0]->NumberValue(context).FromMaybe(0);
            Tobject* obj = new Tobject(value);
            obj->Wrap(args.This());
            args.GetReturnValue().Set(args.This());
        }else{
            const int argc = 1;
            Local<Value> argv[argc] = {args[0]};
            Local<Function> cons = Local<Function>::New(isolate, constructor);
            Local<Object> instance = cons->NewInstance(context, argc, argv).ToLocalChecked();
            args.GetReturnValue().Set(instance);
        }
    }

    void Tobject::NewInstance(const FunctionCallbackInfo<Value>& args) {
        Isolate* isolate = args.GetIsolate();

        const unsigned argc = 1;
        Local<Value> argv[argc] = {args[0]};
        Local<Function> cons = Local<Function>::New(isolate,constructor);
        Local<Context> context = isolate->GetCurrentContext();
        Local<Object> instance = cons->NewInstance(context, argc, argv).ToLocalChecked();
        args.GetReturnValue().Set(instance);
    }

    void Tobject::one(const FunctionCallbackInfo<Value>& args) {
        Isolate* isolate = args.GetIsolate();
        Tobject* obj = ObjectWrap::Unwrap<Tobject>(args.Holder());
        obj->value_ += 1;
        args.GetReturnValue().Set(Number::New(isolate,obj->value_));
    }
}