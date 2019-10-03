// config/passport.js
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const db = require('../models')
const User = db.User
const bcrypt = require('bcryptjs')
module.exports = passport => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ where: { email: email } })
        .then(user => {
          if (!user) {
            return done(null, false, { message: 'That email is not registered' })
          }
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (isMatch) {
              return done(null, user)
            } else {
              return done(null, false, { message: 'Email and Password incorrect' })
            }
          })
        })
    })
  )

  passport.use(
    new FacebookStrategy({
      clientID: '2531035370328376',
      clientSecret: '63165577d25f6f55ea25ed6307bb817f',
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      profileFields: ['email', 'displayName']
    }, (accessToken, refreshToken, profile, done) => {
      console.log(profile._json)
      User.findOne({ where: { email: profile._json.email } }).then(user => {
        if (!user) {
          let randomPassword = Math.random().toString(36).slice(-8)
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(randomPassword, salt, (err, hash) => {
              User.create({
                name: profile._json.name,
                email: profile._json.email,
                password: hash
              }).then(user => {
                return done(null, user)
              }).catch(err => {
                console.log(err)
              })
            })
          )
        } else {
          return done(null, user)
        }
      })
    }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findByPk(id).then((user) => {
      done(null, user)
    })
  })
}