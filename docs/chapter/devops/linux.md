# linux

## 常用命令

```bash
# 支持中文
export LC_ALL=C.UTF-8
# 命令的实际安装目录
readlink -f /usr/bin/java
# 建立符号链接
ln -s /opt/apache-maven-3.9.5/bin/mvn /usr/bin/mvn
# 检查指定服务器端口是否开放
nc -zv <服务器IP地址> <端口号>

# 更改时区
cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

# 网络请求
wget url #下载
curl url #只返回body
curl url #只返回res.header
curl url #返回req.header、res.header、body
```

## 树莓派

```bash
# 打开
nano ~/.bashrc
# 修改
export PATH=$PATH:/path/to/your/dir
# 生效
source ~/.bashrc
```