#!/bin/sh
# 查看文件列表
ls
# 检查 node_modules 是否存在
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    # 运行npm install 
    npm install
    npm install -g pm2
else
    echo "Dependencies already installed."
fi

# 运行传参过来的数据 即 command 对应的内容
echo "进入到node"
cd node 

echo "开始PM2"
pm2 start index.js

cd ..

$1
# 打命命令参数
echo "Argument: $1"