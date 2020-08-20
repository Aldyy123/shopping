const Blogs = require('../models/blogs.model')

const newBlogs = async (req, res, next) => {
    try {
        const blog = await new Blogs(req.body).save()
        console.log(blog)
        res.send(blog)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    newBlogs
}