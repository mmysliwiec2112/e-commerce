package main

import (
	"backend/database"
	"backend/routes"
	"github.com/labstack/echo/v4"
)

func main() {
	db := database.Connect()
	echoVar := echo.New()

	routes.ProductRoutes(echoVar)
	err := echoVar.Start(":8080")
	if err != nil {
		return
	}

	err = db.Close()
	if err != nil {
		panic("Closing database failed")
	}
}
