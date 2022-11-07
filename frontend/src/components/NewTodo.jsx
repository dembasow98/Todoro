

const NewTodo = ({ todo, index, updateTodo, completeTodo, removeTodo }) => {
    return (
        <div
        className="todo"
        style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
        >
        {todo.text}
        <div>
            <button onClick={() => completeTodo(index)}>
                Complete
            </button>
            <button onClick={() => updateTodo(index)}>
                Edit
            </button>
            <button onClick={() => removeTodo(index)}>
                Remove
            </button>
        </div>
        </div>
    );
};



export default NewTodo;