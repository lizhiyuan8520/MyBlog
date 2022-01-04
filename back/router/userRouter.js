const express = require('express');
const userRouter = express.Router();
const userHandler = require('../model/userHandler')

function createPromise(asyncEvent, req, res) {
    //创造一个操作异步过程的Promise
    new Promise((resolve, reject) => {
        //判断是不是查询操作，需不需要传递参数

        asyncEvent.call(userHandler, resolve, reject, req.body);

    }).then(val => {
        res.json(val);
    }).catch(reason => {
        res.send(reason);
    })
}
userRouter.post('/user/delUser', (req, res) => {
        createPromise(userHandler.delUser, req, res);
    }),
    userRouter.get('/user/getUser', (req, res) => {
        createPromise(userHandler.getUser, req, res);
    }),
    userRouter.post('/user/addUser', (req, res) => {
        createPromise(userHandler.addUser, req, res);
    }),
    userRouter.post('/user/loginVerify', (req, res) => {
        createPromise(userHandler.loginVerify, req, res);
    }),
    userRouter.post('/user/setUserName', (req, res) => {
        createPromise(userHandler.setUserName, req, res);
    })
userRouter.get('/user/tokenVerify', (req, res) => {
    new Promise((resolve, reject) => {
        // console.log('req.headers', req.headers);
        var token = req.headers['authorization'];
        console.log('token', token);
        userHandler.tokenVerify(resolve, reject, token);
    }).then(val => {
        res.send({ code: 200, msg: 'token验证成功' });
    }, reason => {
        console.log('token失效');
        res.send({ code: 500, msg: 'token失效' });
    })


})
module.exports = userRouter;