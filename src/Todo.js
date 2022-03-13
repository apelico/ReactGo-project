export default function Todo({ todo, toggleTodo }) {

    function handleTodoClick() {
        toggleTodo(todo.id)
    }

  return (
    <div>
        <label>
            <input type='checkbox' checked={todo.status} onChange={handleTodoClick} />
            {todo.name}
        </label>
    </div>
  )
}
