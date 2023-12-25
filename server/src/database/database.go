package database

import (
	"database/sql"
    "fmt"
	"log"
    _ "github.com/lib/pq"
)

const (
    host     = "database"
    port     = 5432
    user     = "postgres"
    password = "postgres"
    dbname   = "pos-server"
)

func Connect() (*sql.DB, error) {
	connectionString := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)
	log.Println("Connecting to POS DB")

	db, err := sql.Open("postgres", connectionString)
	if err != nil {
		log.Fatalln("Failed to connect to POS DB")
		return nil, err
	}

	log.Println("Connected to POS DB")
	return db, nil
}

func Init() {
	// Create tables

}

func Test() {
	// Insert data
	// Read data
	// Update data
	// Re-read data
	// Delete data
}

func Teardown() {
	// Drop all tables
}

func Disconnect(db *sql.DB) {
	db.Close()
	log.Println("Closed POS DB Connection")
}