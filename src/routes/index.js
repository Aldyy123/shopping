const express = require('express')
const userRoutes = require('./user.route')
const authRoutes = require('./auth.route')
const router = express.Router();
const render = require('../middlewares/render')

router.route('/')
.get(render.index)


router.use('/', authRoutes)
router.use('/', userRoutes)

module.exports = router