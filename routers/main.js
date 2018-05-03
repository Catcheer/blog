const express = require('express')

const router = express.Router()

router.get('/', function (req, res, next) {
    res.render('index.html',{
        userInfo:req.userInfo
    })
})

module.exports = router