/* ----- Basic Setting ----- */
const express = require('express')
const app = express()
const port = 3000

/* ----- Require middleware ----- */
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

/* ----- Require db data ----- */
const db = require('./models')
const Todo = db.Todo
const User = db.User


/* ----- Set view engine ----- */
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

/* ----- Set middleware ----- */
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

/* ----- Set routes ----- */
// home
app.get('/', (req, res) => {
  res.send('hello world')
})
// login page
app.get('/users/login', (req, res) => {
  res.render('login')
})
// login check
app.post('/users/login', (req, res) => {
  res.send('login')
})
// register page
app.get('/users/register', (req, res) => {
  res.render('register')
})
// register check
app.post('/users/register', (req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }).then(user => res.redirect('/'))
})
// logout
app.get('/users/logout', (req, res) => {
  res.send('logout')
})

/* ----- listen to port 3000 ----- */
app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})