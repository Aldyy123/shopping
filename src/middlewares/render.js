const model = require('../models/category.model')

const index = (req, res) => {
  req.session.user = req.user
  const success = req.flash('success')
  res.render('index', {
    name: req.session.user,
    success: success,
  })
}

const regis = (req, res, next) => {
  const user = req.session.user
  if (user) {
    if (req.isAuthenticated()) return res.redirect('/profile/' + user._id)
  }
  const message = req.flash()
  res.render('register', {
    name: req.session.user,
    messages: message,
    oldInput: req.oldInput,
  })
  return next()
}

const log = (req, res, next) => {
  const user = req.session.user
  if (user) {
    if (req.isAuthenticated()) return res.redirect('/profile/' + user._id)
  }

  const message = req.flash()
  res.render('login', {
    name: req.session.user,
    messages: message,
    oldInput: req.oldInput,
  })
}

const profile = (req, res, next) => {
  // if (!req.isAuthenticated()) return res.redirect('/login')
  res.render('profile', {
    name: req.session.user,
  })
}

const verify = (req, res) => {
  req.session.user = req.user

  if (!req.isAuthenticated()) {
    return res.redirect('/login')
  }

  if (req.session.user) {
  }

  res.render('verify', {
    name: req.session.user,
  })
}
const forgotPass = (req, res, next) => {
  req.session.user = req.user
  res.render('forgot-pass', {
    name: req.session.user,
  })
  return next()
}

const blogs = (req, res, next) => {
  req.session.user = req.user
  res.render('blogs', {
    name: req.session.user,
  })
  return next()
}

const products = async (req, res, next) => {
  try {
    req.session.user = req.user
    res.render('products', {
      name: req.session.user,
    })
    return next()
  } catch (error) {}
}

const myBlog = (req, res) => {
  res.render('my-blog', {
    name: req.session.user,
  })
}

module.exports = {
  index,
  forgotPass,
  regis,
  log,
  profile,
  verify,
  blogs,
  products,
  myBlog
}
