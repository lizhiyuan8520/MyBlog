const express = require('express');
const path = require('path');
const thingsRouter = require('./router/thingsRouter')
    //引入express
const app = express();
//配置静态资源访问路径
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extends: false })); //配置body-parse，解析post请求数据
app.use(express.json()) //解析json类型数据 application/json
app.use((req, res, next) => {
        res.set({
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Max-Age': 1728000,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
            'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
            'Content-Type': 'application/json; charset=utf-8'
        })
        if (req.method.toLowerCase() == 'options')
            res.send(200); //让options尝试请求快速结束，处理预请求
        else
            next();
    }) //中间件:为所有响应添加跨域的响应头
app.get('/', (req, res) => {
    res.redirect(301, '/public/index.html')
})
app.use(thingsRouter); //挂载代办事件路由
app.listen('8008', function() {
    console.log('服务已经在8008端口启动~');
})