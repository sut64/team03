package controller

import (
	"net/http"
	"github.com/sut64/team03/backend/entity"
	"github.com/gin-gonic/gin"
)


func CreateFacility(c *gin.Context) {
	var User entity.User
	var Package entity.Package
	var Trainner entity.Trainner
	var Facility entity.Facility

	
	if err := c.ShouldBindJSON(&Facility); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	
	if tx := entity.DB().Where("id = ?", Facility.UserID).First(&User); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "MedicalTech not found"})
		return
	}

	
	if tx := entity.DB().Where("id = ?", Facility.PackageID).First(&Package); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "MedicalRecord not found"})
		return
	}

	
	if tx := entity.DB().Where("id = ?", Facility.TrainnerID).First(&Trainner); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "LabType not found"})
		return
	}

	
	Fac := entity.Facility{
		User:        User,
		No:          Facility.No,
		PackageTime: Facility.PackageTime,
		Price:       Facility.Price,
		Confirm:     Facility.Confirm,
		Package:     Package,
		Trainner:    Trainner,
	}

	
	if err := entity.DB().Create(&Fac).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Fac})
}

func ListFacility(c *gin.Context) {
	var Facility []*entity.Facility
	if err := entity.DB().Preload("User").Preload("Package").Preload("Trainner").Table("facilities").Find(&Facility).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Facility})
}

func ListPackage(c *gin.Context) {
	var Package []entity.Package
	if err := entity.DB().Table("packages").Find(&Package).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Package})
}