package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"ouenjs.com/go-server/models"
	"ouenjs.com/go-server/utils"
)

func login(c *gin.Context) {
	var user models.User
	err := c.ShouldBindJSON(&user)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Could not parse request data.", "error": err})
		return
	}

	err = user.ValidateCredentials()

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid credentials", "error": err})
		return
	}

	token, err := utils.GenerateToken(user.Username, user.ID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to generate token", "error": err})
		return
	}

	// c.SetCookie(
	// 	"token",
	// 	token,
	// 	60*60*24*2,
	// 	"/",
	// 	"localhost",
	// 	false,
	// 	true,
	// )
	cookie := &http.Cookie{
		Name:     "token",
		Value:    token,
		Domain:   "localhost",
		Path:     "/",
		HttpOnly: true,
		Secure:   false,
		SameSite: http.SameSiteLaxMode,
	}
	http.SetCookie(c.Writer, cookie)

	c.JSON(http.StatusOK, gin.H{"message": "Logged in successfully!"})
}

func createAccount(c *gin.Context) {
	var user models.User
	err := c.ShouldBindJSON(&user)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Could not parse request data.", "error": err})
		return
	}

	err = user.Save()

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Could not create account. Try again later.", "error": err})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Successfully created account!"})
}

func authenticated(c *gin.Context) {
	userId := c.GetInt64("userId")
	username, err := models.GetUsername(userId)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Could not get username. Try again later.", "username": username})
		return
	}

	c.JSON(http.StatusOK, gin.H{"username": username})
}
