const todoList = document.querySelector('#todo-list')


todoList.addEventListener('click', (event) => {
  console.log(event.target)
  if (event.target.tagName === 'INPUT') {
    // get checked id
    // const id = event.target.parentNode.parentNode.children[1].children[0].href.slice(28)
    // fetch('http://localhost:3000/todos')
    //   .then(function (response) {
    //     return response.json()
    //   })
    //   .then(function (myJson) {
    //     myJson[id - 1].done = true
    //   })
    // console.log(id)
    const labelName = event.target.parentNode.children[1]
    labelName.classList.toggle('isDone')
    const selectedForm = event.target.parentNode
    selectedForm.submit()
  }
})