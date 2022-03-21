export default function Todo({ todo, toggleTodo, deleteTodo }) {

    function handleTodoClick() {
        toggleTodo(todo.id)
    }

    function handleDeleteClick() {
      deleteTodo(todo.id)
    }

    function DisplayDelete(prop){
      const isDisplayed = prop.isDisplayed
      if(isDisplayed === true){
        return <button checked={todo.status} onClick={handleDeleteClick}>X</button>
      }

      return <></>
    }

  return (
    <div>
        <label>
            <input type='checkbox' checked={todo.status} onChange={handleTodoClick} />
            {todo.name}
            <DisplayDelete isDisplayed={todo.status}/>
        </label>
    </div>
  )
}
