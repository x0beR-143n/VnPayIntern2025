import React, { useState } from 'react';
import TodoInput from './components/TodoInput';
import TodoCounter from './components/TodoCounter';
import TodoList from './components/TodoList';
import { nanoid } from 'nanoid';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    const newTodo = { id: nanoid(), text };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Quản lý công việc</h1>
      <TodoInput onAdd={addTodo} />
      <TodoList todos={todos} onDelete={deleteTodo} />
      <TodoCounter count={todos.length} />
    </div>
  );
}

export default App;
