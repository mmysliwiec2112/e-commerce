package go_part

import (
	"github.com/labstack/echo/v4"
	"go_part/database"
	"go_part/routes"
)

func main() {
	db := database.Connect()
	echo_var := echo.New()
	defer db.Close()

	routes.ProductRoutes(echo_var)
	err := echo_var.Start(":8080")
	if err != nil {
		return
	}
}
