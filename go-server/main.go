package main

import (
	"time"

	"github.com/gin-contrib/cors"
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

	gin.SetMode(gin.DebugMode)
	server.SetTrustedProxies([]string{"127.0.0.1"})

	server.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:4200"},
		AllowMethods:     []string{"GET", "POST", "PUT", "OPTIONS", "DELETE", "PATCH"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	routes.RegisterRoutes(server)

	server.Run(":5000")
}
