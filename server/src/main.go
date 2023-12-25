package main

import (
	"log"
	"pos/src/database"
)

func main() {
	log.Printf("Starting POS Server")
	db, err := database.Connect()
	if err != nil {
		panic(err)
	}

	database.Disconnect(db)
}