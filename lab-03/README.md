AppComponent truyền như sau
- TodoInputComponent props là 1 function onAdd={addTodo}
- TodoList props là 1 biến useState: todos={todos} và 1 function: onDelete={deleteTodo} 
- TodoCounter props là 1 biến useState: count={todos.length}

Khi các biến useState thay đổi ở component cha, thì nếu nó được truyền xuống component con như count={todos.length}, thì nếu giá trị của biến được thay đổi bằng setState thì giá trị props truyền xuống cũng sẽ thay đổi theo
Các component con giao tiếp với component cha bằng các hàm được truyền, trong các hàm đó nhận vào biến, ví dụ như 1 biến text, và nó sẽ thay đổi 1 biến useState, từ đó 1 component con có thể thay đổi giá trị biến ở component cha mà không cần ở chung trong 1 components.
