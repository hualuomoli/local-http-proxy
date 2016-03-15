# 本地http代理

# 缓存http请求文件到本地，减少与互联网的情请求
- app.js    代理服务器，默认为9000
- test.js   测试代理服务器，端口为1000

# 测试
- 启动测试服务`node test.js`
- 启动代理服务器`node app.js`
- 在浏览器输入`http://localhost:9000/http://localhost:1000/abc`