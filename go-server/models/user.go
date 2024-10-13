package models

import (
	"errors"

	"ouenjs.com/go-server/db"
	"ouenjs.com/go-server/utils"
)

type User struct {
	ID       int64
	Username string `binding:"required"`
	Password string `binding:"required"`
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
