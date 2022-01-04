const mysql = require('mysql');
const ConnConfig = {

    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'myblog',
    port: 3306

};
const pool = mysql.createPool(ConnConfig);
module.exports = pool;