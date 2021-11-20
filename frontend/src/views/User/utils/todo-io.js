import { local } from '../../../utils'

export const addTodo = (todo = {time: new Date(), title: '', content: ''}) => {
  const oldTodoList = local.get('todoList') || []
  const newTodoList = [
    ...oldTodoList,
    {
      ...todo,
      time: todo.time.toLocaleString()
    },
  ]
  console.log('todoList: ', newTodoList)
  local.set('todoList', newTodoList)
}

export const getTodoList = () => {
  return local.get('todoList') || []
}
