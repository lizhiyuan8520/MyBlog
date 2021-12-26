const { json } = require('body-parser');
const conn = require('../config/mysqlConnConfig');
// conn.connect(); //打开数据库连接
const userHandler = {
    querySql(sql, resolve, reject) {
        conn.query(sql, function(err, result) {
            if (err) {
                console.log('error', err);
                reject(err);

            } else {
                resolve({ code: 200, msg: 'ok~', result: result });
            }

        })
    },
    addUser(resolve, reject, t) {
        this.querySql(`insert into user(id,username,password,createtime,creater,permission) values ('${t.id}','${t.username}','${t.password}','${t.createtime}','${t.creater}','${t.permission}')`, resolve, reject, false);
    },

}
module.exports = userHandler;