import { urlBuilder } from './urlBuilder';

// baseUrl/api/todos
const getAllTodos = 
    urlBuilder()
        .api()
        .todos()
        .build();
    
// baseUrl/api/todos/todo_id
const getTodo = 
    urlBuilder()
        .api()
        .todos()
        .todoId("todo_id")
        .build();