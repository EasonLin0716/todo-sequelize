const db = require('../models')
const Todo = db.Todo
const User = db.User

const userSeeds = [
  {
    name: 'Orc',
    email: 'orc@example.com',
    password: '1234'
  },
  {
    name: 'Human',
    email: 'human@exmaple.com',
    password: '1234'
  }
]

const todoSeeds = [
  {
    name: 'For the horde!',
    done: true,
    UserId: 1
  },
  {
    name: 'Kill an alliance',
    done: false,
    UserId: 1
  },
  {
    name: 'Mourn King Varian',
    done: true,
    UserId: 2
  },
  {
    name: 'Kill a horde',
    done: false,
    UserId: 2
  }
]