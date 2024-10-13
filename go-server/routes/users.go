package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"ouenjs.com/go-server/models"
	"ouenjs.com/go-server/utils"
)

func login(context *gin.Context) {
	var user models.User
	err := context.ShouldBindJSON(&user)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Could not parse request data.", "error": err})
		return
	}

	err = user.ValidateCredentials()

	if err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid credentials", "error": err})
		return
	}

	token, err := utils.GenerateToken(user.Username, user.ID)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to generate token", "error": err})
	}

	context.SetCookie(
		"token",
		token,
		60*60*24*2,
		"/",
		"localhost",
		false,
		true,
	)

	context.JSON(http.StatusOK, gin.H{"message": "Logged in successfully!"})
}
