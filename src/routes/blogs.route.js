const express = require('express');
const router = express.Router()
const blogController = require('../controllers/blog.controller')

router.route('/create')
.post(blogController.newBlogs)

module.exports = router