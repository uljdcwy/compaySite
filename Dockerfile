# 使用指定版本的Node.js作为基础镜像 window 只有在登录docker 才能使用
FROM node:22.3.0

# 设置工作目录 即运行 命令行的目录地址  即运行命令行的目录
WORKDIR /compaySite

# 设置暴露端口
EXPOSE 10016
