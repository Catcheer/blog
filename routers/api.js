const express = require('express')
const Cookies = require('cookie')

const router = express.Router()
const User = require('../models/Users')

var responseData;

router.use((req, res, next) => {
    responseData = {
        code: 0,
        message: ''
    }
    next()
})

router.post('/user/register', function (req, res, next) {
    var username = req.body.username
    var userpassword = req.body.userpassword
    var repassword = req.body.repassword
    if (username == '') {
        responseData.code = 1;
        responseData.message = '用户名不能为空'
        res.json(responseData)
        return
    }
    if (userpassword == '') {
        responseData.code = 2;
        responseData.message = '密码不能为空'
        res.json(responseData)
        return
    }
    if (userpassword != repassword) {
        responseData.code = 3;
        responseData.message = '两次密码不一样'
        res.json(responseData)
        return
    }

    User
        .findOne({username: username})
        .then((userInfo) => {
            if (userInfo) {
                responseData.code = 4,
                responseData.message = '该用户名已被注册'
                res.json(responseData)
                return
            }
            var user = new User({username: username, userpassword: userpassword})
            return user.save()

        })
        .then((newUserInfo) => {

            responseData.message = '注册成功'
            res.json(responseData)
            return
        })
})

router.post('/user/login', function (req, res, next) {
    var username = req.body.username
    var userpassword = req.body.userpassword

    if (username == '' || userpassword == '') {
        responseData.code = 1;
        responseData.message = '用户名和密码不能为空'
        res.json(responseData)
        return
    }
    User
        .findOne({username: username, userpassword: userpassword})
        .then((userInfo) => {

            if (!userInfo) {
                responseData.code = 2;
                responseData.message = '用户或密码错误'
                res.json(responseData)
                return
            }
            responseData.message = '登陆成功',
            responseData.userInfo = {
                _id: userInfo._id,
                username: userInfo.username
            }

            res.setHeader('Cookie', Cookies.serialize('userInfo', JSON.stringify({_id: userInfo._id, username: userInfo.username}), {
                // httpOnly: false,
                // maxAge: 600000000 * 60 * 24 * 7 // 1 week
                // expires: 'Mon, 30 Apr 2018 23:27:41 GMT'
            }));
          
           

            // req.cookies.set('userInfo', JSON.stringify({     _id: userInfo._id,
            // username: userInfo.username }))
            res.json(responseData)
            res.end()
            return

        })

})

module.exports = router