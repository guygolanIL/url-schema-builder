import { schemaBuilder } from '../schemaBuilder';

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