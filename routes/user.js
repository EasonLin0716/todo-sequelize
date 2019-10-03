// routes/user.js
const express = require('express')
const router = express.Router()
const passport = require('passport')
const db = require('../models')
const User = db.User
const bcrypt = require('bcryptjs')

// login page
router.get('/login', (req, res) => {
  res.render('login')
})
// login check
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: req.flash('warning_msg', `Invalid account or password.`)
  })(req, res, next)
})
// register page
router.get('/register', (req, res) => {
  res.render('register')
})
// register check
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  let errors = []
  if (!name || !email || !password || !password2) {
    errors.push({ message: 'You must fill every column!' })
  }
  if (password !== password2) {
    errors.push({ message: 'Please check 2 passwords you typed!' })
  }
  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    })
  } else {
    User.findOne({ where: { email: email } }).then(user => {
      if (user) {
        req.flash('warning_msg', `User already exists.`)
        res.render('register', {
          name,
          email,
          password,
          password2
        })
      } else {
        const newUser = new User({
          name,
          email,
          password,
        })
        bcrypt.genSalt(10, (err, salt) =>
          // combine salt with password output hash
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash
            newUser.save()
              .then(user => {
                res.redirect('/')
              })
              .catch(err => console.log(err))
          }))
      }
    })
  }
})
// logout
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})
module.exports = router