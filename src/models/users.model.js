const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const findOrCreate = require('mongoose-findorcreate')


const userSchema = new mongoose.Schema({
    name : {
        type: String
    },
    username: {
        type: String,
        unique: true,
    },
    email : {
        type : String,
        unique : true
    },
    password : {
        type : String,
        minlength : 6,
    },
    verification : {
        type : Boolean,
        default : false
    },
    picture : {
        type: String
    }
})



userSchema.methods = {
    async token({email, _id}){

        const payload = {
            id : _id,
            email : email
        }

        try {
            return await jwt.sign(payload, 'iniRahasia', {expiresIn : '30m'})
        } catch (error) {
            throw error
        }
    },
    async comparePass(password){
        try {
            return await bcrypt.compare(password, this.password)
        } catch (error) {
            return error
        }
    }
}

userSchema.statics = {
    async createAndHash(req, res){
        const {email, name, username, password} = req.body
        try {
            const hash = await bcrypt.hash(password, 10)
            const user = {
                email, name, username,
                password : hash
            }
            return await this.create(user)
        } catch (error) {
            if (error.name === 'MongoError' && error.code === 11000) {
                req.flash('error', 'Email is already exist')
                return res.redirect('/register')
            }
            return error;
        }   
    },
    async verification({email, id}){
        try {
            const user = await this.updateOne({email : email}, {verification : true})
            return user
        } catch (error) {
            throw error
        }
    },
    async findUserId(id){
        try {
            let user
            if (mongoose.Types.ObjectId.isValid(id)) {
                user = await this.findById(id).exec()
            }

            if(user) return user

            
        } catch (error) {
            
        }
    },
}

mongoose.plugin(findOrCreate)

module.exports = mongoose.model('Users', userSchema)