const express = require('express');
const { setThing, getAllThing, addThing, delThing } = require('../model/thingHandler');
const thingHandler = require('../model/thingHandler');
const thingsRouter = express.Router(); //代办事件路由容器
function createPromise(asyncEvent, req, res, queryFlag) {
    //创造一个操作异步过程的Promise
    new Promise((resolve, reject) => {
        if (!queryFlag) //判断是不是查询操作，需不需要传递参数
        {
            asyncEvent.call(thingHandler, resolve, reject, req.body);

        }
        getAllThing.call(thingHandler, resolve, reject); //更改this指向，并调用函数,无论什么操作，最后都要再调用一次查询操作用来渲染列表
    }).then(val => {
        console.log('val', val);
        res.json(val);
    }).catch(reason => {
        console.log('reason', reason);
        res.send({ code: 500, msg: '数据操作异常' });
    })
}
thingsRouter.get('/things/getAllThing', (req, res) => {
    //获取所有的代办事件
    // new Promise()

    createPromise(thingHandler.getAllThing, req, res, true);

})
thingsRouter.post('/things/addThing', (req, res) => {
    //增加一个代办事件
    console.log('asdasdsadasd');
    createPromise(thingHandler.addThing, req, res, false);
})
thingsRouter.post('/things/delThing', (req, res) => {
    //删除一个代办事项
    createPromise(thingHandler.delThing, req, res, false);

})
thingsRouter.post('/things/setThing', (req, res) => {
    //更改一个代办项
    createPromise(thingHandler.setThing, req, res, false);

})
thingsRouter.post('/things/setImportant', (req, res) => {
    //更改一个代办项
    createPromise(thingHandler.setImportant, req, res, false);

})
module.exports = thingsRouter;