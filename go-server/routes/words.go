package routes

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"ouenjs.com/go-server/models"
)

func getWords(c *gin.Context) {
	language, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Could not parse request data.", "error": err})
		return
	}

	search := c.Query("search")

	words, err := models.GetAllWords(language, search)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Could not get words. Try again later.", "error": err})
		return
	}

	c.JSON(http.StatusOK, words)
}

func addWord(c *gin.Context) {
	language, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"message": "Could not parse request data.", "error": err})
		return
	}

	var word models.Word
	err = c.ShouldBindJSON(&word)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"message": "Could not parse request data", "error": err})
		return
	}

	word.LanguageID = language
	err = word.Save()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Could not add word. Try again later.", "error": err})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Word added successfully!"})
}

func updateWord(c *gin.Context) {
	language, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Could not parse request data.", "error": err})
		return
	}

	wordId, err := strconv.ParseInt(c.Param("word"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Could not parse request data.", "error": err})
		return
	}

	var word models.Word
	c.ShouldBindJSON(&word)
	word.ID = wordId
	word.LanguageID = language
	err = word.Update()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Could not update word. Try again later.", "error": err})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated word successfully!"})
}

func deleteWord(c *gin.Context) {
	language, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Could not parse request data.", "error": err})
		return
	}

	wordId, err := strconv.ParseInt(c.Param("word"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Could not parse request data.", "error": err})
		return
	}

	var word models.Word
	word.ID = wordId
	word.LanguageID = language
	err = word.Delete()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Could not delete word.", "error": err})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Word deleted successfully!"})
}
