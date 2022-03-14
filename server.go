package main

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"
	"server/server/middleware"
)

func main() {
	port := os.Getenv("PORT")
	defaultPort := "8080"
	http.Handle("/", http.FileServer(http.Dir("./build")))

	http.HandleFunc("/api/addTodo", middleware.AddTodo)
	http.HandleFunc("/api/getTodoList", middleware.GetTodoList)
	http.HandleFunc("/api/updateTodo", middleware.UpdateTodo)

	if !(port == "") {
		log.Fatal(http.ListenAndServe(":"+port, nil))
	} else {
		log.Fatal(http.ListenAndServe(":"+defaultPort, nil))
	}
}

func AddTodo(w http.ResponseWriter, r *http.Request) {

	body, err := io.ReadAll(r.Body)

	if err != nil {
		log.Fatalln(err)
	}

	var data map[string]interface{}

	json.Unmarshal([]byte(body), &data)

	//DB.InsertOne(context.TODO(), data)
}
