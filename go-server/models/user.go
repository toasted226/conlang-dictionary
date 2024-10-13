package models

import (
	"errors"

	"ouenjs.com/go-server/db"
	"ouenjs.com/go-server/utils"
)

type User struct {
	ID       int64  `json:"user_id"`
	Username string `binding:"required" json:"username"`
	Password string `binding:"required" json:"password"`
}

func GetUsername(userId int64) (string, error) {
	query := "SELECT username FROM users WHERE user_id = $1"
	row := db.DB.QueryRow(query, userId)

	var username string
	err := row.Scan(&username)
	if err != nil {
		return "", err
	}

	return username, nil
}

func (u *User) ValidateCredentials() error {
	query := "SELECT user_id, password FROM users WHERE username = $1"
	row := db.DB.QueryRow(query, u.Username)

	var retrievedPassword string
	err := row.Scan(&u.ID, &retrievedPassword)
	if err != nil {
		return errors.New("invalid credentials")
	}

	credentialsValid := utils.CheckPasswordHash(u.Password, retrievedPassword)
	if !credentialsValid {
		return errors.New("invalid credentials")
	}

	return nil
}

func (u *User) Save() error {
	query := "INSERT INTO users (username, password) VALUES ($1, $2)"
	stmt, err := db.DB.Prepare(query)
	if err != nil {
		return err
	}
	defer stmt.Close()

	res, err := stmt.Exec(u.Username, u.Password)
	if err != nil {
		return err
	}

	userId, err := res.LastInsertId()
	if err != nil {
		return err
	}
	u.ID = userId

	return nil
}
