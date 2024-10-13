package main

import (
	"github.com/gin-gonic/gin"
	"ouenjs.com/go-server/db"
	"ouenjs.com/go-server/routes"
)

func main() {
	db.InitDB()
	server := gin.Default()

	routes.RegisterRoutes(server)

	server.Run(":5000")
}
