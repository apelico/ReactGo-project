package router

import (
	"net/http"
	"server/middleware"
)

func Router() *http.ServeMux {
	mux := http.NewServeMux()

	fileServer := http.FileServer(http.Dir("../build"))
	mux.Handle("/", fileServer)

	mux.HandleFunc("/api/addTodo", middleware.AddTodo)
	mux.HandleFunc("/api/getTodoList", middleware.GetTodoList)
	mux.HandleFunc("/api/updateTodo", middleware.UpdateTodo)

	return mux
}
