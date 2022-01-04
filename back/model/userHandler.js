const { json } = require('body-parser');
const pool = require('../config/mysqlConnConfig');
const conn = require('../config/mysqlConnConfig');
const token = require('../token/token')
    // conn.connect(); //打开数据库连接
const userHandler = {
    addUser(resolve, reject, t) {
        pool.getConnection((err, conn) => {
            conn.query(`select * from user where username='${t.username}'`, (err, result) => {
                if (err) {
                    reject({ code: 500, msg: '出错了', result: result });
                } else {
                    if (result) {
                        reject({ code: 500, msg: '用户名重复！' });
                    } else {
                        if (isNaN(t.permission)) {
                            t.permission = 0
                        }

                        conn.query(`insert into user(id,username,password,createtime,creater,permission) values ('${t.id}','${t.username}','${t.password}','${t.createtime}','${t.creater}',${parseInt(t.permission)})`,
                            function(err, result) {
                                if (err) {
                                    console.log('error', err);
                                    reject({ code: 500, msg: '出错了', result: result });

                                } else {
                                    resolve({ code: 200, msg: 'ok~', result: result });
                                }
                                conn.release();
                            })



                    }
                }
            })






        })
    },
    delUser(resolve, reject, t) {
        const sql = `delete from user where id in (${t.idstr})`;
        pool.getConnection((err, conn) => {
            if (err) {
                console.log('conn error', err);
            } else {
                conn.query(sql,
                    function(err, result) {
                        console.log('result', result);
                        if (err) {
                            reject(err);
                        } else
                            resolve({ code: 200, result: result });
                        conn.release();
                    })
            }
        })


    },

    getUser(resolve, reject, t) {
        const sql = `select * from user `;
        pool.getConnection((err, conn) => {
            if (err) {
                console.log('conn error', err);
            } else {
                conn.query(sql,
                    function(err, result) {
                        console.log('result', result);
                        if (err) {
                            reject(err);
                        } else
                            resolve({ code: 200, result: result });
                        conn.release();
                    })
            }
        })


    },

    loginVerify(resolve, reject, t) {
        const sql = `select username,creater,createtime,id,sourcenum,permission,userimg from user where username='${t.username}' and password='${t.password}'`
        pool.getConnection((err, conn) => {
            if (err) {
                console.log('conn error', err);
            } else {
                conn.query(sql,
                    function(err, result) {

                        if (err) {
                            reject(err);
                        } else {
                            if (result.length != 0) { //生成token
                                token: token.setToken(t.username, result.id).then(data => {
                                    resolve({ token: data, result: result });
                                })
                            }
                            else {
                                reject({ code: 500, msg: '用户名或者密码错误' });
                            }


                        }
                        conn.release();
                    })
            }

        })


    },
    setUserName(resolve, reject, t) {
        pool.getConnection((err, conn) => {
            conn.query(`select * from user where username='${t.username}'`, (err, result) => {
                if (err) {
                    reject({ code: 500, msg: '出错了', result: result });
                } else {
                    if (result.length) {
                        reject({ code: 500, msg: '用户名重复啦！' });
                    } else {

                        conn.query(`Update user set username='${t.username}' where id='${t.id}'`,
                            function(err, result) {
                                if (err) {
                                    reject({ code: 500, msg: '出错了，请稍后再试', result: result });

                                } else {
                                    resolve({ code: 200, msg: 'ok~', result: result });
                                }
                                conn.release();
                            })



                    }
                }
            })






        })
    },
    tokenVerify(resolve, reject, t) {
        token.verToken(t).then(val => {
            console.log('验证成功');
            resolve(val); //token验证成功
        }, reason => {
            console.log('验证失败', reason);
            reject(reason); //token验证失败
        })
    }

}
module.exports = userHandler;