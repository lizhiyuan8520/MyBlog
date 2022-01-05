const express = require('express');
const BASE_URL = 'http://localhost:8008/';
const uploadRouter = express.Router();
const uploadHandler = require('../model/uploadHandler');
const multer = require('multer'); //引入multer中间件来处理上传的文件
//创建不同的upload对象处理不同请求
const upload_userimg = multer({ //用户头像
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './public/userimgs/')
        },
        filename: function(req, file, cb) {
            cb(null, file.fieldname + '_' + Date.now() + file.originalname.substring(file.originalname.indexOf('.')))
        }
    }),
});
uploadRouter.post('/upload/userimg', upload_userimg.single('userimg'), (req, res) => {
    let img_url = BASE_URL + req.file.path.replaceAll('/^\\$/', '/');
    new Promise((resolve, reject) => {
        uploadHandler.setUserimg(resolve, reject, { id: req.body.id, path: img_url });

    }).then(val => {
        res.send({ code: 200, img_url });
    }).catch(reason => {
        console.log('reason', reason);
        res.send({ code: 500 });
    })


})
const upload_Source = multer({ //资源位置
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './public/Source/')
        },
        filename: function(req, file, cb) {
            cb(null, file.fieldname + '_' + Date.now() + file.originalname.substring(file.originalname.indexOf('.')))
        }
    }),
});
uploadRouter.post('/upload/Source', upload_Source.single('Source'), (req, res) => {
        let path = BASE_URL + req.file.path.split('\\').join('/');
        new Promise((resolve, reject) => {
            uploadHandler.uploadSource(resolve, reject, req, path);

        }).then(val => {
            res.send({ code: 200, source_id: val });
        }).catch(reason => {
            console.log('reason', reason);
            res.statusCode = 500;
        })


    })
    //资源图片处理
const upload_SourceImg = multer({ //资源位置
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './public/SourceImg')
        },
        filename: function(req, file, cb) {
            cb(null, file.fieldname + '_' + Date.now() + file.originalname.substring(file.originalname.indexOf('.')))
        }
    }),
});
uploadRouter.post('/upload/SourceImg', upload_Source.single('SourceImg'), (req, res) => {
    let path = BASE_URL + req.file.path.split('\\').join('/');
    new Promise((resolve, reject) => {
        uploadHandler.uploadSource(resolve, reject, req, path);

    }).then(val => {
        res.send({ code: 200, msg: 'OK~' });
    }).catch(reason => {
        console.log('reason', reason);
        res.statusCode = 500;
    })


})

module.exports = uploadRouter