package routes

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"ouenjs.com/go-server/models"
)

func getLanguages(c *gin.Context) {
	languages, err := models.GetAllLanguages()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Could not get languages. Try again later.", "error": err})
		return
	}

	c.JSON(http.StatusOK, languages)
}

func getLanguage(c *gin.Context) {
	languageId, err := strconv.ParseInt(c.Param("id"), 10, 64)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Could not parse request data.", "error": err})
		return
	}

	language, err := models.GetLanguageByID(languageId)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Could not get language. Try again later.", "error": err})
		return
	}

	c.JSON(http.StatusOK, language)
}

func addLanguage(c *gin.Context) {
	var language models.Language
	err := c.ShouldBindJSON(&language)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Could not parse request data.", "error": err})
		return
	}

	err = language.Save()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Could not add language. Try again later.", "error": err})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Language added successfully!"})
}

func updateLanguage(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Could not parse request data.", "error": err})
		return
	}

	var updatedLanguage models.Language
	err = c.ShouldBindJSON(&updatedLanguage)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Could not parse request data.", "error": err})
		return
	}

	updatedLanguage.ID = id
	err = updatedLanguage.Update()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Could not update language. Try again later.", "error": err})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Language updated successfully!"})
}

func deleteLanguage(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Could not parse request data.", "error": err})
		return
	}

	var language models.Language
	language.ID = id
	err = language.Delete()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Could not delete language.", "error": err})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Successfully deleted language!"})
}
