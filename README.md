# Todo Sequelize
Classic Todo list built with express.js and MySQL
## Features
1. Create your todo things
2. Read, edit or delete it
## Preview
![Cover](https://github.com/EasonLin0716/todo-sequelize/blob/master/previews/cover.JPG)
## Environment set up
1. Node.js
2. MySQL
## Installation
1. Clone me at https://github.com/EasonLin0716/todo-sequelize.git
2. Open a terminal
3. cd file location
4. npm install
5. go to ./config/, create a file named 'keys.js', paste the following codes:
```
module.exports = {
  facebook: {
    clientID: 'Your facebook key',
    clientSecret: 'Your facebook secret'
  }
}
```
Otherwise npm run dev would crush.

6. npm run dev
7. See it on http://localhost:3000
