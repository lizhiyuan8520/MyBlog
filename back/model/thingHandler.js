// const { json } = require('body-parser');
const pool = require('../config/mysqlConnConfig');
// const thingsRouter = require('../router/thingsRouter');
// conn.connect(); //打开数据库连接
const thingHandler = {
    querySql(sql, resolve, reject, queryFlag) {
        pool.getConnection((err, conn) => {
            conn.query(sql, function(err, result) {
                if (err) {
                    console.log('error', err);
                    reject(err);

                } else {
                    if (queryFlag) //只有执行到查询才返回数据进行渲染
                        resolve({ code: 200, msg: 'ok~', result: result });
                }
                conn.release(); //释放连接
            })
        })

    },
    addThing(resolve, reject, t) {
        this.querySql(`insert into thing(id,text) values ('${t.id}','${t.text}')`, resolve, reject, false);
    },
    delThing(resolve, reject, t) {
        this.querySql(`delete from thing where id in ('${t.id}')`, resolve, reject, false);
    },
    getAllThing(resolve, reject) {
        this.querySql(`select * from thing`, resolve, reject, true);
    },
    setThing(resolve, reject, t) {
        this.querySql(`update thing t set t.text='${t.text}' where t.id='${t.id}' `, resolve, reject, false);
    },
    setImportant(resolve, reject, t) {
        this.querySql(`update thing t set t.important='${t.imp}' where t.id='${t.id}' `, resolve, reject, false);
    }
}
module.exports = thingHandler;