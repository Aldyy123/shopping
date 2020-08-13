const passport = require('passport')

const Facebook = (req, res, next) => {
    passport.authenticate('facebook', {
        scope: ['email']
    })(req, res, next)
}

const authFacebook = (req, res, next) => {
    passport.authenticate('facebook', {
        failureFlash: true,
        failureRedirect: '/login',
        successRedirect: '/'
    })(req, res, next)
}

module.exports = {
    Facebook,
    authFacebook
}