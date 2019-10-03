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
app.use('/users', require('./routes/user'))

/* ----- listen to port 3000 ----- */
app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})