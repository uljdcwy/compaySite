// hello.cc
#include <iostream>
#include <windows.h>
#include <node.h>

namespace monitorMouse
{
  using namespace v8;
  using namespace std;
  
  Persistent<Function> callback;
  
  // 声明回调函数类型
  typedef void (*VoidFunction)(...);

  HHOOK mouseHook; // 鼠标钩子句柄

  LRESULT CALLBACK MouseProc(int nCode, WPARAM wParam, LPARAM lParam) {
    if (nCode >= 0) {
      const char* mouseKey = "";
      MSLLHOOKSTRUCT *mouseInfo = (MSLLHOOKSTRUCT *)lParam;
      int x = mouseInfo->pt.x;
      int y = mouseInfo->pt.y;

      switch (wParam) {
        case WM_MOUSEMOVE: {
          mouseKey = "move";
          // cout << "Mouse moved to (" << x << ", " << y << ")" << endl;
        }
        break;
        case WM_RBUTTONUP:
          mouseKey = "right up";
          // cout << "right up mouse button" << endl;
          break;
        case WM_LBUTTONUP:
          mouseKey = "left up";
          // cout << "left up mouse button" << endl;
          break;
        case WM_LBUTTONDOWN:
          mouseKey = "left down";
          // cout << "left down mouse button" << endl;
          break;
        case WM_RBUTTONDOWN:
          mouseKey = "right down";
          // cout << "right down mouse button" << endl;
          break;
          // cout << wParam << ',' << endl;
      }
      // 在回调函数上下文中调用回调函数
      Isolate* isolate = Isolate::GetCurrent();
      HandleScope scope(isolate);

      Local<Function> cb = Local<Function>::New(isolate, callback);
      // 创建一个参数数组
      const int argc = 4;
      // 
      Local<Value> argv[argc];
      argv[0] = {Number::New(isolate, wParam)};
      argv[1] = {Number::New(isolate, x)};
      argv[2] = {Number::New(isolate, y)};
      argv[3] = {String::NewFromUtf8(isolate, mouseKey).ToLocalChecked()};

      // 调用回调函数
      cb->Call(isolate->GetCurrentContext(), isolate->GetCurrentContext()->Global(), argc, argv);
    }

    return CallNextHookEx(mouseHook, nCode, wParam, lParam);
  }


  void startMonitorMouse(const FunctionCallbackInfo<Value> &args) {
    Isolate* isolate = args.GetIsolate();
    Local<Function> cb = Local<Function>::Cast(args[0]);

    // 将Node.js回调函数存储为全局引用
    callback.Reset(isolate, cb);

    // 安装鼠标钩子
    mouseHook = SetWindowsHookEx(WH_MOUSE_LL, MouseProc, NULL, 0);
    if (mouseHook == NULL) {
      cerr << "Failed to install mouse hook" << endl;
      return;
    }

    // 消息循环
    MSG msg;
    while (GetMessage(&msg, NULL, 0, 0) != 0) {
        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }
    // 卸载鼠标钩子
    UnhookWindowsHookEx(mouseHook);
    
    return;
  }

  void initMouseEvents(Local<Object> exports) {
    NODE_SET_METHOD(exports, "startMonitorMouse", startMonitorMouse);
  }

  NODE_MODULE(NODE_GYP_MODULE_NAME, initMouseEvents)

} // namespace demo