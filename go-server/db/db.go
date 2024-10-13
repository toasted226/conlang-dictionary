package db

import (
	"context"
	"database/sql"
	"fmt"
	"os"

	_ "github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/jackc/pgx/v5/stdlib"
)

var DB *sql.DB

func InitDB() {
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbName := os.Getenv("DB_NAME")

	connStr := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable", dbUser, dbPassword, dbHost, dbPort, dbName)

	pool, err := pgxpool.New(context.Background(), connStr)
	if err != nil {
		panic("Failed to initialise pool.")
	}

	DB = stdlib.OpenDBFromPool(pool)

	fmt.Println("Connected to database.")

	createTables()
}

func createTables() {
	createLanguagesTable := `
	CREATE TABLE IF NOT EXISTS languages (
		language_id SERIAL PRIMARY KEY,
		name VARCHAR(50)
	)
	`
	stmt, err := DB.Prepare(createLanguagesTable)
	if err != nil {
		fmt.Println(err)
		panic("Failed to create languages table!")
	}
	_, err = stmt.Exec()
	if err != nil {
		fmt.Println(err)
		panic("Failed to create languages table!")
	}

	createUsersTable := `
	CREATE TABLE IF NOT EXISTS users (
		user_id SERIAL PRIMARY KEY,
		username VARCHAR(20) NOT NULL,
		password VARCHAR(200) NOT NULL
	)
	`
	stmt, err = DB.Prepare(createUsersTable)
	if err != nil {
		fmt.Println(err)
		panic("Failed to create users table!")
	}
	_, err = stmt.Exec()
	if err != nil {
		fmt.Println(err)
		panic("Failed to create users table!")
	}
}
