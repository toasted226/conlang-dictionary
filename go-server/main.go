package main

import (
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"ouenjs.com/go-server/db"
	"ouenjs.com/go-server/routes"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		panic("Failed to load dotenv.")
	}

	db.InitDB()
	server := gin.Default()

	routes.RegisterRoutes(server)

	server.Run(":5000")
}
