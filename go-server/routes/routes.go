package routes

import (
	"github.com/gin-gonic/gin"
	"ouenjs.com/go-server/middleware"
)

func RegisterRoutes(server *gin.Engine) {
	// user routes
	server.POST("/api/v2/users/login", login)
	server.POST("/api/v2/users/create", createAccount)
	server.GET("/api/v2/users/logout", logout)
	// language routes
	server.GET("/api/v2/languages", getLanguages)
	server.GET("/api/v2/languages/:id", getLanguage)
	// word routes
	server.GET("/api/v2/words/:id", getWords)

	// user routes
	server.GET("/api/v2/users/login", middleware.Authenticate, authenticated)
	// language routes
	server.POST("/api/v2/languages", middleware.Authenticate, addLanguage)
	server.PUT("/api/v2/languages/:id", middleware.Authenticate, updateLanguage)
	server.DELETE("/api/v2/languages/:id", middleware.Authenticate, deleteLanguage)
	// word routes
	server.POST("/api/v2/words/:id", middleware.Authenticate, addWord)
	server.PUT("/api/v2/words/:id/:word", middleware.Authenticate, updateWord)
	server.DELETE("/api/v2/words/:id/:word", middleware.Authenticate, deleteWord)
}
