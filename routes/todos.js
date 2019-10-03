const express = require('express')
const router = express.Router()
const db = require('../models')
const Todo = db.Todo
const User = db.User
const { authenticated } = require('../config/auth')
// list all Todo
router.get('/', authenticated, (req, res) => {
  res.send('列出全部 Todo')
})
// create Todo page
router.get('/new', authenticated, (req, res) => {
  res.send('create a Todo page')
})
// show a Todo detail
router.get('/:id', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error("user not found");

      return Todo.findOne({
        where: {
          UserId: req.user.id,
          Id: req.params.id
        }
      })
    })
    .then((todo) => { return res.render('detail', { todo: todo }) })
    .catch((error) => { return res.status(422).json(error) })
})
// create Todo
router.post('/', authenticated, (req, res) => {
  Todo.create({
    name: req.body.name,
    done: false,
    UserId: req.user.id
  })
    .then((todo) => { return res.redirect('/') })
    .catch((error) => { return res.status(422).json(error) })
})
// edit Todo page
router.get('/:id/edit', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error("user not found")
      return Todo.findOne({
        where: {
          Id: req.params.id,
          UserId: req.user.id,
        }
      })
    })
    .then((todo) => { return res.render('edit', { todo: todo }) })
})
// edit Todo
router.put('/:id', authenticated, (req, res) => {
  Todo.findOne({
    where: {
      Id: req.params.id,
      UserId: req.user.id,
    }
  })
    .then((todo) => {
      todo.name = req.body.name
      todo.done = req.body.done === "on"

      return todo.save()
    })
    .then((todo) => { return res.redirect(`/todos/${req.params.id}`) })
    .catch((error) => { return res.status(422).json(error) })
})
// delete Todo
router.delete('/:id/delete', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error("user not found")

      return Todo.destroy({
        where: {
          UserId: req.user.id,
          Id: req.params.id
        }
      })
    })
    .then((todo) => { return res.redirect('/') })
    .catch((error) => { return res.status(422).json(error) })
})

module.exports = router