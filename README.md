# Define your api urls <b>once</b>

### Build the routes your client consumes in a type-safe manner
<br/>

## Install 
``npm i @guygolanil/url-schema-builder``

## Usage

### Define your api schema

```javascript
import { schemaBuilder } from '@guygolanil/url-schema-builder';

export const urlBuilder = () => {
    const { 
        endpoint, 
        param, 
        path
    } = schemaBuilder({
        baseUrl: 'http://localhost:3000',
    });

    return {
        api: path('api', () => ({
            todos: path('todos', endpoint({
                todoId: param(endpoint({}))
            })),
        }))
    };
}
```

### Use in your api client modules

```javascript
// todos-api.ts
import { urlBuilder } from './urlBuilder';

export function getTodos() {
    // baseUrl/api/todos
    const getAllTodosUrl = urlBuilder()
        .api()
        .todos()
        .build();

    // rest of client implementation
}

export function getTodo(todoId: string) {
    // baseUrl/api/todos/{todoId}
    const getTodoUrl = 
        urlBuilder()
            .api()
            .todos()
            .todoId(todoId)
            .build();

    // rest of client implementation
}
```

### Appending query params and hash is easy too
```javascript
// todos-api.ts
export function getTodosPaginated(pageSize: number, offset: number) {
    // baseUrl/api/todos?pageSize={pageSize}&offset={offset}
    const getAllTodosPaginatedUrl = 
        urlBuilder()
            .api()
            .todos()
            .build({
                query: {
                    pageSize,
                    offset    
                },
                hash: "firstTodo"
            });
    
    // rest of client implementation
}
```
