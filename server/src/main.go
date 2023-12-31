package main

import (
	"log"
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


	
}