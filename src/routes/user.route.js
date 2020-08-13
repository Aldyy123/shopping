const express = require('express')
const router = express.Router()
const render = require('../middlewares/render')
const userController = require('../controllers/user.controller')

router
  .route('/profile')
  .get(render.profile)
  .post(userController.uploads.single('picture'), userController.avatar)

router
  .route('/forgotPass')
  .get(render.forgotPass)
  .post(userController.resetPassword)

router.route('/blogs').get(render.blogs)

router.route('/products').get(render.products)

module.exports = router
