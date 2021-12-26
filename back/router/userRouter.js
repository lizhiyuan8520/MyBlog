const express = require('express');
const userRouter = express.Router();
const userHandler = require('../model/userHandler')

function createPromise(asyncEvent, req, res) {
    //创造一个操作异步过程的Promise
    new Promise((resolve, reject) => {
        //判断是不是查询操作，需不需要传递参数

        asyncEvent.call(userHandler, resolve, reject, req.body);

    }).then(val => {
        console.log('val', val);
        res.json(val);
    }).catch(reason => {
        console.log('reason', reason);
        res.send({ code: 500, msg: '数据操作异常' });
    })
}
userRouter.post('/user/addUser', (req, res) => {
    createPromise(userHandler.addUser, req, res, false);
})
module.exports = userRouter;