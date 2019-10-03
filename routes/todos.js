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
  res.send('show a Todo detail')
})
// create Todo
router.post('/', authenticated, (req, res) => {
  res.send('create a Todo')
})
// edit Todo page
router.get('/:id/edit', authenticated, (req, res) => {
  res.send('edit Todo page')
})
// edit Todo
router.put('/:id', authenticated, (req, res) => {
  res.send('edit Todo')
})
// delete Todo
router.delete('/:id/delete', authenticated, (req, res) => {
  res.send('delete Todo')
})

module.exports = router