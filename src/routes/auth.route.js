const express = require('express')
const router = express.Router()
const render = require('../middlewares/render')
const auth = require('../controllers/auth.controller')
const {formValidate, validateVerification, usernameValidate} = require('../validation/validation.user')
const {Facebook, authFacebook} = require('../providers/fb.auth')
const {google, googleAuth} = require('../providers/google.auth')

router.route('/register')
.get(render.regis)
.post(usernameValidate, formValidate, auth.register)

router.route('/login')
.get(render.log, Facebook)
.post(formValidate, auth.login, validateVerification)

router.get('/auth/facebook', Facebook)

router.get('/auth/facebook/callback', authFacebook)

router.get('/auth/google', google)

router.get('/auth/google/callback', googleAuth)

router.route('/verify/user')
.get(auth.verify)

router.route('/verify')
.get(render.verify)
.post(auth.sendEmailVerify)

router.route('/profile')
.get(render.profile)

router.route('/logout')
.get(auth.logout)

module.exports = router