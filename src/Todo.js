export default function Todo({ todo, toggleTodo, deleteTodo }) {

    function handleTodoClick() {
        toggleTodo(todo.id)
    }

    function handleDeleteClick() {
      deleteTodo(todo.id)
    }

  return (
    <div>
        <label>
            <input type='checkbox' checked={todo.status} onChange={handleTodoClick} />
            {todo.name}
            <button checked={todo.status} onClick={handleDeleteClick}>X</button>
        </label>
    </div>
  )
}
