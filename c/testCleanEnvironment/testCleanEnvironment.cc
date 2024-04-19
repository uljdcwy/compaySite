#include <node.h>
#include <assert.h>
#include <stdlib.h>

namespace test {
    using namespace node;
    using namespace v8;

    static char cookie[] = "zhengxiya";
    static int cb_cout1 = 0;
    static int cb_cout2 = 0;


    static void clean_cb1(void* arg){

        Isolate* isolate = static_cast<Isolate*>(arg);
        
        HandleScope scope(isolate);

        Local<Object> obj = Object::New(isolate);

        assert(!obj.IsEmpty());
        assert(obj->IsObject());

        cb_cout1 ++;
    }

    static void clean_cb2(void*){
        assert(arg == static_cast<void*>cookie);
        cb_cout2 ++;
    }

    static void check(void*){
        assert(cb_cout1 == 1);
        assert(cb_cout2 == 1);
    }

    NODE_MODULE_INIT() {
        Isolate* isolate = context->GetIsolate();

        AddEnvironmentCleanupHook(isolate, check, nullptr);
        AddEnvironmentCleanupHook(isolate, clean_cb2, cookie);
        AddEnvironmentCleanupHook(isolate, clean_cb1, isolate);
    }
}