const passport = require('passport');

const google = (req, res, next) => {
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })(req, res, next)
}

const googleAuth = (req, res, next) => {
    passport.authenticate('google', {
        failureRedirect: req.path,
        successRedirect: '/',
        failureFlash: true
    })(req, res, next)
}

module.exports = {
    google,
    googleAuth
}