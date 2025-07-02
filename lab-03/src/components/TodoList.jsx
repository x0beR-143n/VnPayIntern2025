import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, onDelete }) {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default TodoList;
