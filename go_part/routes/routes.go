package routes

import (
	"github.com/labstack/echo/v4"
	"go_part/controllers"
)

func ProductRoutes(echo *echo.Echo) {
	var productController = controllerspackage.ProductController{}
	echo.GET("/products", productController.GetAllProducts)
	echo.GET("/products/:id", productController.GetProduct)
	echo.PUT("/product/edit/:id/:price", productController.UpdateProduct)
	echo.DELETE("/products/delete/:id", productController.DeleteProduct)
	echo.POST("/product/add", productController.CreateProduct)
}
