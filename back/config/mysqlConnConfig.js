const mysql = require('mysql');
const ConnConfig = {

    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'myblog',
    port: 3306

};
const connection = mysql.createConnection(ConnConfig); //创建数据库连接
module.exports = connection;