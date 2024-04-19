#include <node.h>
#include "Tobject.h"

namespace Tobject {
    using namespace v8;
    void init(Local<Object> exports) {
        Tobject::init(exports);
    }

    NODE_MODULE(NODE_GYP_MODULE_NAME, init);
} // namespace testObject