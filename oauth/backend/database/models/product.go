package models

import "gorm.io/gorm"

type Product struct {
	gorm.Model
	Title       string
	Price       uint
	Description string
	id          uint `gorm:"primaryKey;autoIncrement"`
}
