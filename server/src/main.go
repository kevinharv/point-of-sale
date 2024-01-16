package main

import (
	"log"
	// "fmt"
	// "net/http"
	"pos/src/database"
)


func main() {
	log.Printf("Starting POS Server")

	database.Init()	

	// fmt.Println("Listening on http://localhost:3000")
	// http.ListenAndServe(":3000", nil)
}