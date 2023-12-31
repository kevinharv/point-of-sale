package database

import (
	"database/sql"
    "fmt"
	"log"
    _ "github.com/lib/pq"
)

const (
    host     = "localhost"
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
	} else {
		log.Println("Connected to POS DB")
	}

	return db, nil
}

// Create tables
func Init(db *sql.DB) {
	_, err := db.Exec(`CREATE TABLE IF NOT EXISTS users(
		id          BIGSERIAL PRIMARY KEY,
		first_name  VARCHAR(255),
		middle_name VARCHAR(255),
		last_name   VARCHAR(255),
		birthdate   TIMESTAMP
	)`)

	if err != nil {
		log.Println("Failed to create users table in DB")
		log.Printf("%s", err)
	} else {
		log.Println("Created users table in DB")
	}

	_, err = db.Exec(`CREATE TABLE IF NOT EXISTS permissions(
		id            BIGSERIAL PRIMARY KEY,
		userID        BIGSERIAL REFERENCES users(id),
		administrator BOOLEAN
	)`)

	if err != nil {
		log.Println("Failed to create permissions table in DB")
		log.Printf("%s", err)
	} else {
		log.Println("Created permissions table in DB")
	}
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