package routes

import (
	controllerspackage "backend/controllers"
	"github.com/labstack/echo/v4"
)

func ProductRoutes(echo *echo.Echo) {
	var productController = controllerspackage.ProductController{}
	var loginController = controllerspackage.LoginController{}
	echo.GET("/products", productController.GetAllProducts)
	echo.GET("/products/:id", productController.GetProduct)
	echo.PUT("/product/edit/:id/:price", productController.UpdateProduct)
	echo.DELETE("/products/delete/:id", productController.DeleteProduct)
	echo.POST("/product/add", productController.CreateProduct)
	echo.POST("/login", loginController.UserLogin)
	echo.POST("/logout", loginController.UserLogout)
	echo.POST("/signin", loginController.UserSignup)
}
