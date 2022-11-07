import React, {useState, useEffect} from 'react'
import {useQuery, useMutation, useQueryClient} from 'react-query'
import { addTodo, getTodos, updateTodo, deleteTodo } from '../api/todosAPI'
import NewTodo from './NewTodo'


const TodosList = () =>{


    //Each todo has title, description, isCompleted, and id

    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState('')
    
    

    const queryClient = useQueryClient();

    const {data:todos, isLoading, isError, error} = useQuery('todos', getTodos);


    //Cache invalidation (Integrate the axios request methods with react-query)
    const {mutate: addTodoMutation} = useMutation(addTodo, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('todos');
        }
    });
    const {mutate: updateTodoMutation} = useMutation(updateTodo, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('todos');
        }
    });
    const {mutate: deleteTodoMutation} = useMutation(deleteTodo, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('todos');
        }
    });

    const handleSubmit = (e) => {
        // Prevent the page from reloading
        e.preventDefault();

        // Add the new todo to the list
        addTodoMutation.mutate({title: title, description: description, completed: false});

        // Reset the input field
        setTitle('');
        setDescription('');
    }

    //let todosList = JSON.stringify(todos)
    let todosList;
    if (isLoading) {
        todosList = <div className='text-green-600'>Loading...</div>
    } else if (isError) {
        todosList = <div className='text-red-600'>Error: {error.message}</div>
    } else {
        todosList = JSON.stringify(todos);
        {/*<div>
            {todos.map((todo, index) => (
                <NewTodo
                    key={index}
                    index={index}
                    todo={todo}
                    updateTodo={updateTodoMutation}
                    deleteTodo={deleteTodoMutation}
                />
            ))}
            </div>*/}
    }

  return (

    <div className='flex flex-col px-5 py-5 mt-3 w-full md:h-[70%] rounded-xl min-h-[80%]'>
        <div className='grid md:grid-cols-2 gap-4'>
            <div className='grid grid-rows-2 gap-2 order-2 md:order-1'>
                <div className='flex flex-col px-5 py-5 rounded-xl  bg-slate-300 dark:bg-slate-900'>
                    <h1 className='text-xl text-white text-center'>Your todos</h1>
                    {todosList}
                </div>
                <div className='flex flex-col px-5 py-5 rounded-xl  bg-slate-300 dark:bg-slate-900'>
                    <h1 className='text-xl text-white text-center'>Completed todos</h1>
                    {isLoading ? (
                        <div className='text-green-600'>Loading...</div>
                    ) : isError ? (
                        <div className='text-red-600'>Error: {error.message}</div>
                    ) : (
                        <div>
                            <h1>All Todos</h1>
                            {todos.map((todo, index) => (
                                <NewTodo
                                    key={index}
                                    index={index}
                                    todo={todo}
                                    updateTodo={updateTodoMutation}
                                    deleteTodo={deleteTodoMutation}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className='flex flex-col order-1 md:order-2 px-5 py-5 rounded-xl  bg-slate-300 dark:bg-slate-900'>
                <h1 className='text-xl text-white text-center'>Add todo</h1>
                <form onSubmit={handleSubmit}>
                    <div class="mb-6">
                        <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Title</label>
                        <input value={title} onChange={(e) => setTitle(e.target.value)}
                        type="text" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Go for Running" required/>
                    </div>
                    <div class="mb-6">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                        id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="I will go for running today at 15:00 pm."></textarea>
                        
                    </div>
                    <button type="submit" class="text-white mb-4 right-0 float-right px-10 py-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Go</button>
                </form>
            </div>
        </div>
    </div>
    );
}

export default TodosList;