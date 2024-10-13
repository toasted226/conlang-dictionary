package models

import (
	"ouenjs.com/go-server/db"
)

type Language struct {
	ID   int64  `json:"language_id"`
	Name string `binding:"required" json:"name"`
}

func GetAllLanguages() (*[]Language, error) {
	query := "SELECT * FROM languages;"
	rows, err := db.DB.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	languages := make([]Language, 0, 4)
	for rows.Next() {
		var language Language
		err = rows.Scan(&language.ID, &language.Name)
		if err != nil {
			return nil, err
		}
		languages = append(languages, language)
	}

	return &languages, err
}

func GetLanguageByID(id int64) (*Language, error) {
	query := "SELECT name FROM languages WHERE language_id = $1"
	row := db.DB.QueryRow(query, id)

	var language Language
	language.ID = id
	err := row.Scan(&language.Name)
	if err != nil {
		return nil, err
	}

	return &language, nil
}

func (l *Language) Save() error {
	query := "INSERT INTO languages (name) VALUES ($1)"
	stmt, err := db.DB.Prepare(query)
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(l.Name)
	if err != nil {
		return nil
	}

	return nil
}
