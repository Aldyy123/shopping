const LocalSrategy = require('passport-local').Strategy
const passport = require('passport')
const User = require('../models/users.model')
const bcrypt = require('bcrypt')
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy

passport.use(
  new LocalSrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email: email }, (err, data) => {
      if (err) throw err
      if (!data) {
        return done(null, false, {
          message: 'User Not Found, check your email',
        })
      }
      bcrypt.compare(password, data.password, (err, match) => {
        if (err) return done(null, false)
        if (!match)
          return done(null, false, {
            message: 'Password not Match, try password again',
          })
        if (match) return done(null, data)
      })
    })
  }),
)

passport.use(
  new FacebookStrategy(
    {
      clientID: 1099712737091629,
      clientSecret: 'a3b60547e990261ffdd61742ecac0477',
      callbackURL: 'http://localhost:4000/auth/facebook/callback',
      profileFields: ['id', 'email', 'displayName', 'photos'],
      enableProof: true,
    },
    async (accesToken, refreshToken, profile, done) => {
      try {
        console.log(profile)
        const {email, name, picture} = profile._json
        const urlPic = picture.data.url
        const user = await User.findOrCreate({ email: email }, {email, name, picture : urlPic})
        console.log(user)
        if (user.created) {
          return done(null, user.doc)
        }
        const exist = await User.findOne({ email: user.doc.email })
        return done(null, exist)
      } catch (error) {
        return done(error, null)
      }
    },
  ),
)

passport.use(
  new GoogleStrategy(
    {
      clientID:
        '778049129060-699sgm9eksni35mhck64ggnld1gtl1cd.apps.googleusercontent.com',
      clientSecret: 'KTMs-R1J7PvkYsSEqmySWp4X',
      callbackURL: 'http://127.0.0.1:4000/auth/google/callback',
    },
    async (accesToken, refreshToken, profile, done) => {
      try {
        console.log(profile)
        const {email, name, picture, email_verified} = profile._json
        const user = await User.findOrCreate({ email: email }, {
          email, name, picture, verification : email_verified
        })
        console.log(user)
        if (user.created) {
          return done(null, user.doc)
        }
        const exist = await User.findOne({ email: user.doc.email })
        return done(null, exist)
      } catch (error) {
        return done(error, null)
      }
    },
  ),
)

passport.serializeUser((User, cb) => {
  cb(null, User.id)
})

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    cb(err, user)
  })
})

module.exports = passport
