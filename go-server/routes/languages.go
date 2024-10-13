package routes

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"ouenjs.com/go-server/models"
)

func getLanguages(context *gin.Context) {
	languages, err := models.GetAllLanguages()
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Could not get languages. Try again later.", "error": err})
		return
	}

	context.JSON(http.StatusOK, languages)
}

func getLanguage(context *gin.Context) {
	languageId, err := strconv.ParseInt(context.Param("id"), 10, 64)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Could not parse request data.", "error": err})
		return
	}

	language, err := models.GetLanguageByID(languageId)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Could not get language. Try again later.", "error": err})
		return
	}

	context.JSON(http.StatusOK, language)
}
