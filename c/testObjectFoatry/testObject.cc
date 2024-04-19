#include <node.h>
#include "Tobject.h"

namespace Tobject {
    using namespace v8;

    void CreateObject(const FunctionCallbackInfo<Value>& args) {
        Tobject::NewInstance(args);
    }

    void init(Local<Object> exports, Local<Object> module) {
        Tobject::Init(exports->GetIsolate());

        NODE_SET_METHOD(module, "exports", CreateObject);
    }

    NODE_MODULE(NODE_GYP_MODULE_NAME, init);
}