const express = require('express')
const router = express.Router()
const db = require('../models')
const Todo = db.Todo
const User = db.User
const { authenticated } = require('../config/auth')

// list all Todo
router.get('/', authenticated, (req, res) => {
  let orderResult = []
  if (req.query.sortTarget && req.query.sortType) {
    orderResult.push([req.query.sortTarget, req.query.sortType])
  }
  console.log(orderResult)
  // get current user
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error("user not found")
      // get current user's todo list
      return Todo.findAll({
        where: { UserId: req.user.id },
        order: orderResult
      })
    })
    .then((todos) => { return res.render('index', { todos: todos, userName: req.user.name }) })
    .catch((error) => { return res.status(422).json(error) })
})
module.exports = router