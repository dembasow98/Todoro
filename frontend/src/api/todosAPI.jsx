import axios from 'axios';


const todosAPI = axios.create({
    baseURL: 'http://localhost:8000',
});

export const getTodos = async () => {
    const response = await todosAPI.get('/todos');
    return response.data;
}


export const addTodo = async (todo) => {
    return await todosAPI.post('/todos', todo);
}


export const updateTodo = async (todo) => {
    return await todosAPI.patch(`/todos/${todo.id}`, todo);
}

export const deleteTodo = async ({id}) => {
    return await todosAPI.delete(`/todos/${id}`, id);
}


export default todosAPI;