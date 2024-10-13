package middleware

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"ouenjs.com/go-server/utils"
)

func Authenticate(context *gin.Context) {
	if context.Request.Method == "OPTIONS" {
		context.Next() // Skip auth for preflight requests
		return
	}

	// token := context.Request.Header.Get("Authorization")
	token, err := context.Cookie("token")
	if err != nil {
		fmt.Println("Failed to get cookie")
		context.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"authenticated": false})
		return
	}
	fmt.Println("Here's the token: ", token)

	if token == "" {
		context.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"authenticated": false})
		return
	}

	userId, err := utils.VerifyToken(token)

	if err != nil {
		context.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"authenticated": false})
		return
	}

	context.Set("userId", userId)
	context.Next()
}
