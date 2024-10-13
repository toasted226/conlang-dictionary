package routes

import "github.com/gin-gonic/gin"

func RegisterRoutes(server *gin.Engine) {
	server.GET("/api/v2/languages", getLanguages)
	server.GET("/api/v2/languages/:id", getLanguage)
}
