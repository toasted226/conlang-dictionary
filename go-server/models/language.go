package models

import (
	"ouenjs.com/go-server/db"
)

type Language struct {
	ID   int64
	Name string `binding:"required"`
}

func GetAllLanguages() (*[]Language, error) {
	query := "SELECT * FROM languages"
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
	query := "SELECT name FROM languages WHERE language_id = ?"
	row := db.DB.QueryRow(query, id)

	var language Language
	language.ID = id
	err := row.Scan(&language.Name)
	if err != nil {
		return nil, err
	}

	return &language, nil
}
