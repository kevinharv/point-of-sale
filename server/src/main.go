package main

import (
	"log"
	"fmt"
	// "net/http"
	"gorm.io/gorm"
	"gorm.io/driver/sqlite"
)

type Product struct {
	gorm.Model
	Name string
	Price uint
}

func main() {
	log.Printf("Starting POS Server")

	db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to DB")
	}

	db.AutoMigrate(&Product{})

	// db.Create(&Product{Name: "Second Product", Price: 500})
	var product Product
	db.First(&product, 2)

	fmt.Printf("First Product Name: %s\n", product.Name)

	// fmt.Println("Listening on http://localhost:3000")
	// http.ListenAndServe(":3000", nil)
}