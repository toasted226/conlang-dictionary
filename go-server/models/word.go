package models

import "ouenjs.com/go-server/db"

type Word struct {
	ID                    int64  `json:"word_id"`
	LanguageID            int64  `json:"language_id"`
	Word                  string `binding:"required" json:"word"`
	Translation           string `binding:"required" json:"translation"`
	PartOfSpeech          string `binding:"required" json:"part_of_speech"`
	Example               string `json:"example"`
	ExampleTranslation    string `json:"example_translation"`
	PhoneticTranscription string `json:"phonetic_transcription"`
}

func (w *Word) Save(languageId int64) (int64, error) {
	query := `
	INSERT INTO words (
		language_id, 
		word, 
		translation, 
		part_of_speech, 
		example, 
		example_translation, 
		phonetic_transcription
	) VALUES ($1, $2, $3, $4, $5, $6, $7)
	`
	stmt, err := db.DB.Prepare(query)
	if err != nil {
		return 0, err
	}
	defer stmt.Close()

	res, err := stmt.Exec(languageId, w.Word, w.Translation, w.PartOfSpeech, w.Example, w.ExampleTranslation, w.PhoneticTranscription)
	if err != nil {
		return 0, err
	}

	id, err := res.LastInsertId()
	return id, err
}

func (w *Word) GetAllWords(languageId int64, search string) (*[]Word, error) {
	query := "SELECT * FROM words WHERE language_id = $1 "
	ordering := "ORDER BY word ASC"
	args := []any{languageId}

	if search != "" {
		search += "%"
		exampleSearch := "%" + search
		query += "AND LOWER(word) LIKE $2 OR language_id = $1 AND LOWER(example) LIKE $3"
		args = append(args, search)
		args = append(args, exampleSearch)
	}

	query += ordering

	stmt, err := db.DB.Prepare(query)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	rows, err := stmt.Query(args...)
	if err != nil {
		return nil, err
	}

	words := make([]Word, 0)
	for rows.Next() {
		var w Word
		err = rows.Scan(&w.ID, &w.LanguageID, &w.Word, &w.Translation, &w.PartOfSpeech, &w.Example, &w.ExampleTranslation, &w.PhoneticTranscription)
		if err != nil {
			return nil, err
		}
		words = append(words, w)
	}

	return &words, nil
}
