package database

import (
	"log"
    "gorm.io/gorm"
	"gorm.io/driver/sqlite"
)

func Init() {
	db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to DB")
	}

	// TODO - remove helper function and manually add logging
	applyMigration(db, &Region{})
	applyMigration(db, &SiteGroup{})
	applyMigration(db, &Site{})
	applyMigration(db, &TableGroup{})
	applyMigration(db, &Table{})
	applyMigration(db, &Server{})
	applyMigration(db, &KDS{})
	applyMigration(db, &Workstation{})
	applyMigration(db, &Printer{})
	applyMigration(db, &PaymentProcessor{})
	applyMigration(db, &Ticket{})

	log.Printf("Migration Complete\n")
}

func applyMigration(db *gorm.DB, model interface{}) {
	err := db.AutoMigrate(model)
	if err != nil {
		log.Fatal("Failed to perform migration.")
		panic(err)
	}
}