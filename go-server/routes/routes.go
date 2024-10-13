package routes

import (
	"github.com/gin-gonic/gin"
	"ouenjs.com/go-server/middleware"
)

func RegisterRoutes(server *gin.Engine) {
	mainGroup := server.Group("/api/v2")
	mainGroup.GET("/languages", getLanguages)
	mainGroup.GET("/languages/:id", getLanguage)

	mainGroup.POST("/login", login)
	mainGroup.POST("/create", createAccount)

	authGroup := server.Group("/api/v2")
	authGroup.Use(middleware.Authenticate)
	authGroup.GET("/login", authenticated)
}
