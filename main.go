package main

import (
	"log"
	"net/http"
	"os"

	"server/server/router"
)

func main() {
	port := os.Getenv("PORT")
	defaultPort := "8080"

	if !(port == "") {
		log.Fatal(http.ListenAndServe(":"+port, router.Router()))
	} else {
		log.Fatal(http.ListenAndServe(":"+defaultPort, router.Router()))
	}
}
