const mongoose = require('mongoose')

const blogsSchema = new mongoose.Schema({
    title : {
        type : String,
        maxlength : 100
    },
    pictureBlogs : {
        type : String
    },
    description : {
        type : String
    },
    category : {
        type : String
    }
})

module.exports = mongoose.model('Blogs', blogsSchema)