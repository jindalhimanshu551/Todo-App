import { useEffect, useState } from 'react'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'


function App() {

  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/todos")
      .then(async function(res) {
      const json = await res.json();
      setTodos(json.result)
    })
  })

  return (
    <div>
      <CreateTodo></CreateTodo>
      <Todos todos={todos}></Todos>
    </div>
  )
}

export default App
