package server

import (
	"log"
	"fmt"
	"net/http"
	"pos/src/database"
)

func main() {
	log.Printf("Starting POS Server")
	db, err := database.Connect()
	if err != nil {
		panic(err)
	}
	defer database.Disconnect(db)

	database.Init(db)

	fmt.Println("Listening on http://localhost:3000")
	http.ListenAndServe(":3000", nil)
}