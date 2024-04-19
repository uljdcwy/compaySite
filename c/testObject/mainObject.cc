#include "Tobject.h"

namespace Tobject {
    using namespace v8;

    Tobject::Tobject(double value): value_(value) {
    }

    Tobject::~Tobject(){}

    void Tobject::init(Local<Object> exports) {
        Isolate* isolate = exports->GetIsolate();
        Local<Context> context = isolate->GetCurrentContext();

        Local<ObjectTemplate> addon_data_tpl = ObjectTemplate::New(isolate);
        addon_data_tpl->SetInternalFieldCount(1);
        Local<Object> addon_data = addon_data_tpl->NewInstance(context).ToLocalChecked();

        Local<FunctionTemplate>  tpl = FunctionTemplate::New(isolate, New, addon_data);
        tpl->SetClassName(String::NewFromUtf8(isolate, "Tobject").ToLocalChecked());
        tpl->InstanceTemplate()->SetInternalFieldCount(1);

        NODE_SET_PROTOTYPE_METHOD(tpl, "one", one);

        Local<Function> constructor = tpl->GetFunction(context).ToLocalChecked();
        addon_data->SetInternalField(0, constructor);
        exports->Set(context, String::NewFromUtf8(isolate, "Tobject").ToLocalChecked(), constructor).FromJust();
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
            Local<Function> cons = args.Data().As<Object>()->GetInternalField(0).As<Value>().As<Function>();
            Local<Object> result = cons->NewInstance(context, argc, argv).ToLocalChecked();
            args.GetReturnValue().Set(result);
        }
    }

    void Tobject::one(const FunctionCallbackInfo<Value>& args) {
        Isolate* isolate = args.GetIsolate();
        Tobject* obj = ObjectWrap::Unwrap<Tobject>(args.Holder());
        obj->value_ += 1;
        args.GetReturnValue().Set(Number::New(isolate,obj->value_));
    }
}