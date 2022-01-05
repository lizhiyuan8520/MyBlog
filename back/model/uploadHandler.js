const { nanoid } = require('nanoid');
const pool = require('../config/mysqlConnConfig');
const BASE_URL = 'http://localhost:8008/';
const uploadHandler = {
    setUserimg(resolve, reject, data) {
        pool.getConnection((err, conn) => {
            conn.query(`update user set userimg="${data.path}" where id ='${data.id}'`, (err, result) => {
                if (err)
                    reject(err)
                else
                    resolve();
            })
        })
    },
    uploadSource(resolve, reject, req, path) {
        let data = req.body;
        let id = nanoid().substring(0, 20);
        const sql = `insert into source(id,title,description,author,uploader,category,uploadtime,size,path) 
        values('${id}','${data.title}','${data.description}','${data.author}','${data.uploader}','${data.category}',
        '${data.uploadtime}','${data.size}','${path}'
        )`;
        pool.getConnection((err, conn) => {
            conn.query(sql, (err, result) => {
                if (err)
                    reject(err)
                else
                    resolve(req.id);
            })
        })
    },
    uploadSourceImg(resolve, reject, req, path) {
        let data = req.body;
        const sql = `updata source set imgpath=`;
        pool.getConnection((err, conn) => {
            conn.query(sql, (err, result) => {
                if (err)
                    reject(err)
                else
                    resolve();
            })
        })
    },

}
module.exports = uploadHandler