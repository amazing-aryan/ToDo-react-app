import React, { useState, useEffect } from "react";
import "./App.css";
import TodoForm from './components/to-do-Form';
import Todo from './components/to-do';
import todoService from './services/todoService'

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    todoService.getAll()
      .then(todolist => {
        setTodos(todolist)
      })
      .catch(error => console.log(error))
  }, [])

  const addTodo = newObject => {
    todoService
      .create(newObject)
      .then(returnedtodo => {
        setTodos(todos.concat(returnedtodo))
      })
      .catch(error => console.log(error))
  };

  const completeTodo = index => {
    const newObject = todos[index]
    const id = newObject.id.toString()
    newObject.isCompleted = true
    todoService
      .updateById(id, newObject)
      .then(returnedtodo => {
        const newTodos = [...todos]
        newTodos[index].isCompleted = true
        setTodos(newTodos)
      })
      .catch(error => console.log(error))
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    const id = newTodos[index].id.toString()
    todoService
      .deleteById(id)
      .then(() => {
        newTodos.splice(index, 1)
        setTodos(newTodos)
      })
  };

  return (
    <div className="app">
      <h1 className="h1"> To Do App</h1>
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;