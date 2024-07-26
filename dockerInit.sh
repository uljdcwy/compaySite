#!/bin/sh
# 查看文件列表
ls
# 检查 node_modules 是否存在
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    
    # 检查 $1 是否包含 $
    if [ "$1" = "npm run dev" ]; then
        # 运行npm install 
        npm install -g pm2
    else
        echo "参数中不包含 npm run dev"
    fi
else
    echo "Dependencies already installed."
fi

# 检查 $1 是否包含 $
if [ "$1" = "npm run dev" ]; then
    echo "进入到node"
    cd node 
    echo "开始PM2"
    pm2 start index.js
    cd ..
else
    echo "参数中不包含 npm run dev"
fi

$1
# 打命命令参数
echo "Argument: $1"