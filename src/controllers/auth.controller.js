const User = require('../models/users.model')
const { sendMailRegister } = require('../middlewares/nodemail')
const jwt = require('jsonwebtoken')
const passport = require('passport')

const register = async (req, res, next) => {
   try {
       const user = await User.createAndHash(req, res)
       const token = await user.token(user)
       await sendMailRegister(user, token)
       await res.redirect('/login')
       return next()
   } catch (error) {
       return error
   }
}

const login = (req, res, next) => {
    passport.authenticate('local', {
        failureFlash : true,
        failureRedirect: '/login'
    })(req, res, next)
}

const logout = async (req, res, next) => {
    try {
        await req.session.destroy(err => {
            return res.redirect('/')
        })
        return next()
    } catch (error) {
        return next(error.message)
    }
}

const verify = async (req, res, next) => {
    try {
        const decode = await jwt.verify(req.query.token, 'iniRahasia')
        await User.verification(decode)
        res.render('verifyUser')
        return next()
    } catch (error) {
        if(error.name === 'JsonWebTokenError'){
            res.redirect('/')
        }
    }
}

const sendEmailVerify = async (req, res, next) => {
    try {
        const {_id} = req.session.user
        const user = await User.findUserId(_id)
        const token = await user.token(user)
        await sendMailRegister(user, token)
        await res.redirect('/')
        return next()
    } catch (error) {
        return error
    }
}

module.exports = {
    register,
    login,
    logout,
    verify,
    sendEmailVerify
}