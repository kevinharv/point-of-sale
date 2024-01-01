package main

import (
	"log"
	"fmt"
	"net/http"
	"pos/src/database"
	"github.com/a-h/templ"
	"pos/src/components"
)

func main() {
	log.Printf("Starting POS Server")
	db, err := database.Connect()
	if err != nil {
		panic(err)
	}
	defer database.Disconnect(db)

	database.Init(db)


	component := components.Hello("Frank")
	
	http.Handle("/", templ.Handler(component))

	fmt.Println("Listening on :3000")
	http.ListenAndServe(":3000", nil)
}