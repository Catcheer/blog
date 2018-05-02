const express = require('express')
const swig = require('swig')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const Cookies = require('cookie')

const app = express()

app.engine('html', swig.renderFile)
app.set('views', './views/')
app.set('view engine', 'html')

app.use('/public', express.static(__dirname + '/public'))
app.use(bodyparser.urlencoded({extended: true}))

swig.setDefaults({cache: false})

app.use(function (req, res, next) {
    var cookies = Cookies.parse(req.headers.cookie || '');
  
    req.userInfo={}
    if(cookies.userInfo){
      try{
        req.userInfo=JSON.parse(cookies.userInfo)
      }catch(e){

      }
    }
    next()
})

app.use('/admin', require('./routers/admin'))
app.use('/api', require('./routers/api'))
app.use('/', require('./routers/main'))


mongoose.connect('mongodb://localhost:27018/blog', (err) => {
    if (err) {
        console.log('err')
    } else {

        app.listen('1234', () => {
            console.log('listening on port 1234')
        })
    }
})
