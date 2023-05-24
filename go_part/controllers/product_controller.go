package controllerspackage

import (
	"github.com/labstack/echo/v4"
	"go_part/database/models"
	"gorm.io/gorm"
	"net/http"
	"strconv"
)

const error_str_to_int = "Error converting string to int"

type ProductController struct {
	db *gorm.DB
}

func (prodCtrl *ProductController) GetAllProducts(context echo.Context) error {
	var products []models.Product
	prodCtrl.db.Find(&products)
	return context.JSON(http.StatusOK, &products)
}

func (prodCtrl *ProductController) GetProduct(context echo.Context) error {
	var product models.Product
	id, err := strconv.Atoi(context.Param("id"))
	if err != nil {
		panic(error_str_to_int)
	}
	prodCtrl.db.First(&product, id)
	if product.ID == 0 {
		return context.JSON(http.StatusNotFound, "Error")
	}
	return context.JSON(http.StatusOK, &product)
}

func (prodCtrl *ProductController) UpdateProduct(context echo.Context) error {
	var currentProduct models.Product
	var product models.Product
	if err := context.Bind(&product); err != nil {
		return context.JSON(http.StatusNotFound, "Error")
	}
	id, err2 := strconv.Atoi(context.Param("id"))
	if err2 != nil {
		panic(error_str_to_int)
	}
	prodCtrl.db.First(&currentProduct, id)
	if currentProduct.ID == 0 {
		return context.JSON(http.StatusNotFound, "Error")
	}
	currentProduct.Price = product.Price
	prodCtrl.db.Save(&currentProduct)
	return context.JSON(http.StatusOK, &currentProduct)
}

func (prodCtrl *ProductController) DeleteProduct(context echo.Context) error {
	var product models.Product
	id, err := strconv.Atoi(context.Param("id"))
	if err != nil {
		panic(error_str_to_int)
	}
	prodCtrl.db.First(&product, id)
	if product.ID == 0 {
		return context.JSON(http.StatusNotFound, "Error")
	}
	prodCtrl.db.Delete(&models.Product{}, id)
	return context.NoContent(http.StatusOK)
}

func (prodCtrl *ProductController) CreateProduct(context echo.Context) error {
	var product models.Product
	err := context.Bind(&product)
	if err != nil {
		return context.JSON(http.StatusNotFound, "Error")
	}
	prodCtrl.db.Create(&product)
	return context.JSON(http.StatusOK, &product)
}
