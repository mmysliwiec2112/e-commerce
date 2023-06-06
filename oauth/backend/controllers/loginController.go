package controllerspackage

import (
	"backend/database/models"
	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"
	"golang.org/x/exp/slices"
	"log"
	"net/http"
)

type LoginController struct {
	usersList  []models.User
	isLoggedIn bool
}

func (logCtrl *LoginController) UserSignup(context echo.Context) error {
	var user models.User
	email := context.Param("Email")
	password := context.Param("Password")
	user.Email = email
	user.Password = getHash([]byte(password))
	if slices.Contains(logCtrl.usersList, user) {
		return context.JSON(http.StatusBadRequest, "invalid login data")
	}
	logCtrl.usersList = append(logCtrl.usersList, user)
	return context.JSON(http.StatusOK, "registered properly")
}

func (logCtrl *LoginController) UserLogin(context echo.Context) error {
	var user models.User
	email := context.Param("Email")
	password := context.Param("Password")
	user.Email = email
	user.Password = getHash([]byte(password))

	if slices.Contains(logCtrl.usersList, user) {
		logCtrl.isLoggedIn = true
		return context.JSON(http.StatusOK, "logged in properly")
	}
	return context.JSON(http.StatusBadRequest, "invalid login data")
}

func (logCtrl *LoginController) UserLogout(context echo.Context) error {
	logCtrl.isLoggedIn = false
	return context.JSON(http.StatusOK, "logged out properly")
}

func getHash(pwd []byte) string {
	hash, err := bcrypt.GenerateFromPassword(pwd, bcrypt.MinCost)
	if err != nil {
		log.Println(err)
	}
	return string(hash)
}
