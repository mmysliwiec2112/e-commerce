package database

import (
	"backend/database/models"
	"database/sql"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func Connect() *sql.DB {
	db, err := gorm.Open(sqlite.Open("database.db"))
	if err != nil {
		panic("Database does not open")
	}

	err = db.AutoMigrate(&models.Product{})
	if err != nil {
		panic("Migration failed")
	}

	db2, err := db.DB()
	if err != nil {
		panic("Conversion failed")
	}

	return db2
}
