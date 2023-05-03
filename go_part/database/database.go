package database

import (
	"go_part/database/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func Connect() *gorm.DB {
	db, err := gorm.Open(sqlite.Open("database.db"))
	if err != nil {
		panic("Database does not open")
	}

	err = db.AutoMigrate(&models.Product{})
	if err != nil {
		panic("Migration failed")
	}
	return db
}
