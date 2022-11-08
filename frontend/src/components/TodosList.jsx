import React from 'react'
import {useQuery, useMutation, useQueryClient} from 'react-query'
import { addTodo, getTodos, updateTodo, deleteTodo } from '../api/todosAPI'

import Todo from './Todo'


const TodosList = () =>{


    //Each todo has title, description, isCompleted, and id


    //Create a new todo from the title and description
    const [newTodo, setNewTodo] = React.useState({
        title: '',
        description: '',
    })

    const changeHandler = e => {
        setNewTodo({...newTodo, [e.target.name]: e.target.value})
        //console.log(newTodo);
    }
    

    const queryClient = useQueryClient();

    
    const {
        isLoading,
        isError,
        error,
        data: todos
    } = useQuery('todos', getTodos, {
        select: data => data.sort((a, b) => b.id - a.id)
    })


    //Cache invalidation (Integrate the axios request methods with react-query)
    const addTodoMutation = useMutation(addTodo, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('todos');
        }
    });

    
    const  updateTodoMutation = useMutation(updateTodo, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('todos');

        }
    });


    const  deleteTodoMutation = useMutation(deleteTodo, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('todos');
        }
    });

    const handleSubmit = (e) => {
        // Prevent the page from reloading
        e.preventDefault();

        // Add the new todo to the list
        addTodoMutation.mutate({userId:1, title:newTodo.title, description:newTodo.description, completed: false});

        // Reset the new todo form
        setNewTodo({
            title: '',
            description: '',
        });
        
        //Empty the input fields after submitting
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
    }
   
    

  return (

    <div className='flex flex-col px-5 py-5 mt-3 w-full md:h-[70%] rounded-xl min-h-[80%]'>
        <div className='grid md:grid-cols-2 gap-4'>
            <div className='grid grid-rows-2 gap-2 order-2 md:order-1'>
                <div className='flex flex-col px-5 py-5 rounded-xl  bg-slate-300 dark:bg-slate-900'>
                    <h1 className='text-xl text-white text-center mb-5'>Your todos</h1>
                    {isLoading ? (
                        <div className='text-green-600'>Loading...</div>
                    ) : isError ? (
                        <div className='text-red-600'>Error: {error.message}</div>
                    ) : (
                        <div>
                            {todos.map((todo, index) => (
                                !todo.completed&&
                                <Todo
                                    key={index}
                                    index={index}
                                    todo={todo}
                                    updateTodoMutation={updateTodoMutation}
                                    deleteTodoMutation={deleteTodoMutation}
                                />
                            ))}
                        </div>
                    )}
                    
                </div>
                <div className='flex flex-col px-5 py-5 rounded-xl  bg-slate-300 dark:bg-slate-900'>
                    <h1 className='text-xl text-white text-center mb-5'>Completed todos</h1>
                    {isLoading ? (
                        <div className='text-green-600'>Loading...</div>
                    ) : isError ? (
                        <div className='text-red-600'>Error: {error.message}</div>
                    ) : (
                        <div>
                            {todos.map((todo) => (
                                todo.completed&&
                                <Todo
                                    key={todo.id}
                                    todo={todo}
                                    updateTodoMutation={updateTodoMutation}
                                    deleteTodoMutation={deleteTodoMutation}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className='flex flex-col order-1 max-h-[400px] md:order-2 px-5 py-5 rounded-xl  bg-slate-300 dark:bg-slate-900'>
                <h1 className='text-xl text-white text-center'>Add todo</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Title</label>
                        <input name='title' onChange={changeHandler}
                        type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Go for Running" required/>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Description</label>
                        <textarea name='description' onChange={changeHandler}
                        id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="I will go for running today at 15:00 pm."></textarea>
                    </div>
                    <button type="submit" className="text-white mb-4 right-0 float-right px-10 py-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Go</button>
                </form>
            </div>
        </div>
    </div>
    );
}

export default TodosList;