/* ----- Basic Setting ----- */
const express = require('express')
const app = express()
const port = 3000

/* ----- Require middleware ----- */
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')

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
app.use(session({
  secret: 'your secret key',
  resave: 'false',
  saveUninitialized: 'false',
}))
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)
app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})

/* ----- Set routes ----- */
// home
app.use('/', require('./routes/home'))
app.use('/users', require('./routes/user'))
app.use('/todos', require('./routes/todos'))

/* ----- listen to port 3000 ----- */
app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})