#include <node.h>

namespace test {

    using namespace v8;

    void Constructor(const FunctionCallbackInfo<Value>& args) {
        Isolate* isolate = args.GetIsolate();
        Local<Context> context = isolate->GetCurrentContext();

        args.This()->Set(context, String::NewFromUtf8(isolate, "msg").ToLocalChecked(), Number::New(isolate, 123)).Check();

        return args.GetReturnValue().Set(args.This());
    }


    void ClassGet(const FunctionCallbackInfo<Value>& args) {

        Isolate* isolate = args.GetIsolate();

        Local<Context> context = isolate->GetCurrentContext();

        // return args.GetReturnValue().Set(args.This()->Get(context, String::NewFromUtf8(isolate, "msg").ToLocalChecked()).ToLocalChecked());
    
        return args.GetReturnValue().Set(Number::New(isolate, 123456789));
    
        
    }

    void Init(Local<Object> exports) {
        Isolate* isolate = Isolate::GetCurrent();
        HandleScope scope(isolate);

        Local<Context> context = isolate->GetCurrentContext();

        Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, Constructor);

        tpl->SetClassName(String::NewFromUtf8(isolate, "TestClass").ToLocalChecked());

        Local<ObjectTemplate> proto = tpl->PrototypeTemplate();

        proto->Set(String::NewFromUtf8(isolate, "get").ToLocalChecked(), FunctionTemplate::New(isolate, ClassGet));
 
        exports->Set(context, String::NewFromUtf8(isolate, "TestClass").ToLocalChecked(), tpl->GetFunction(context).ToLocalChecked()).FromJust();
    }
    

    NODE_MODULE(NODE_GYP_MODULE_NAME, Init)
}