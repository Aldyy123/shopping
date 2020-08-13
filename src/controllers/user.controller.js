const User = require('../models/users.model')
const { sendMailRegister } = require('../middlewares/nodemail')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    console.log(file)
    cb(null, file.fieldname + Date.now() + '.jpg')
  },
})

const uploads = multer({
  storage: storage,
})


const avatar = (req, res, next) => {
  // console.log(req.file)
  // console.log(req.body)
}

const resetPassword = async (req, res, next) => {
  try {
    const email = req.body.email
    if (!email) return await res.send('Email harus di isi')
    const user = await User.findOne({ email })
    if (user === null) {
      await res.send('User Not Found')
      return await user
    }
    const token = await user.token(user)
    await res.send('Berhasil')
    return await sendMailRegister(user, token, true)
  } catch (error) {
    console.log(error.message)
  }
}


module.exports = {
  resetPassword,
  uploads,
  avatar
}
