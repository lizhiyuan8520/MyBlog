var jwt = require('jsonwebtoken');
var jwtScrect = 'first_test_token'; //签名

//登录接口 生成token的方法
var setToken = function(user_name, user_id) {
        return new Promise((resolve, reject) => {
            //expiresln 设置token过期的时间
            //{ user_name: user_name, user_id: user_id } 传入需要解析的值（ 一般为用户名，用户id 等）
            const token = jwt.sign({ user_name: user_name, user_id: user_id }, jwtScrect, { expiresIn: '1h' });
            resolve(token)
        })
    }
    //各个接口需要验证token的方法
var verToken = function(token) {
    return new Promise((resolve, reject) => {
        console.log('进入了verToken........', typeof token);
        var info = jwt.verify(token.split(' ')[1], jwtScrect);
        console.log('执行到token了');
        resolve(info);
    })
}

module.exports = {
    setToken,
    verToken
}