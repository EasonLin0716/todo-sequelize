const todoList = document.querySelector('#todo-list')

todoList.addEventListener('click', (event) => {
  console.log(event.target)
  if (event.target.tagName === 'INPUT') {
    // get checked id
    const id = event.target.parentNode.parentNode.children[1].children[0].href.slice(28)
  }
})