package router

import (
	"net/http"
	"server/server/middleware"
)

func Router() *http.ServeMux {
	mux := http.NewServeMux()

	mux.Handle("/", http.FileServer(http.Dir("./build")))

	mux.HandleFunc("/api/addTodo", middleware.AddTodo)
	mux.HandleFunc("/api/getTodoList", middleware.GetTodoList)
	mux.HandleFunc("/api/updateTodo", middleware.UpdateTodo)
	mux.HandleFunc("/api/deleteTodo", middleware.DeleteTodo)

	return mux
}
