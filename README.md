# 本地http代理

# 缓存http请求文件到本地，减少与互联网的情请求
- file       缓存文件操作
    + setPath    设置缓存文件路径
    + exists     缓存文件是否存在
    + flush      从缓存文件下载
    + store      存储缓存文件
- load.js    代理加载url
    + download    下载
- app.js     主文件

# 测试
- 启动服务`node app.js`
- 在浏览器输入`http://localhost:9000/https://github.com/driftyco/ionic-app-base/archive/master.zip`