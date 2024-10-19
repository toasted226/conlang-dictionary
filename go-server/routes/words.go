package routes

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"ouenjs.com/go-server/models"
)

func getWords(context *gin.Context) {
	language, err := strconv.ParseInt(context.Param("id"), 10, 64)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Could not parse request data.", "error": err})
		return
	}

	search := context.Query("search")

	words, err := models.GetAllWords(language, search)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Could not get words. Try again later.", "error": err})
		return
	}

	context.JSON(http.StatusOK, words)
}
