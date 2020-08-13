const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const routes = require('./routes/index')
const session = require('express-session')
const logger = require('morgan')
const cookieParser = require("cookie-parser")
const flash = require('connect-flash')
const passport = require('./middlewares/passport')
const oldInput = require('old-input');
const cors = require('cors');

// Assets public
app.use(express.static('public'))

// body parser for form 
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())


// set session 
app.use(session({
    secret : 'iniRahasia',
    cookie : {maxAge : 100 * 60 * 60 * 24},
    resave : false,
    saveUninitialized : false,
}))

// cors Origin
app.use(cors())

// set flash message
app.use(flash())

// Old Input Fail validation
app.use(oldInput)

// passport
app.use(passport.initialize())
app.use(passport.session())

// dev logger view
app.use(logger('dev'))

// set view engine using ejs
app.set('view engine', 'ejs')

// set routes
app.use('/', routes)

// Set CSRF
app.use(cookieParser('iniRahasia'))


module.exports = app