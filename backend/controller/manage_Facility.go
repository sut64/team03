package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut64/team03/backend/entity"
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
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", Facility.PackageID).First(&Package); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Package not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", Facility.TrainnerID).First(&Trainner); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Trainner not found"})
		return
	}

	Fac := entity.Facility{
		User:        User,
		No:          Facility.No,
		PackageTime: Facility.PackageTime.Local(),
		Price:       Facility.Price,
		Confirm:     Facility.Confirm,
		Package:     Package,
		Trainner:    Trainner,
	}

	if _, err := govalidator.ValidateStruct(Fac); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := entity.CheckBool(Fac.Confirm); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
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

func ListFacilityForMember(c *gin.Context) {
	var Facility []*entity.Facility
	UserID := c.Param("UserID")
	if err := entity.DB().Preload("User").Preload("Package").Preload("Trainner").Raw("SELECT * FROM facilities WHERE user_id = ?", UserID).Find(&Facility).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Facility})
}

//-----------------reserve
func ListFacilityZone(c *gin.Context) {
	var Facility []entity.Facility
	// var Package []entity.Package
	UserID := c.Param("UserID")
	if err := entity.DB().Preload("Package").Raw("SELECT * FROM facilities WHERE user_id = ?", UserID).Find(&Facility).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// if err := entity.DB().Preload("Package").Raw("SELECT * FROM facilities WHERE user_id = ?", UserID).Find(&Package).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	c.JSON(http.StatusOK, gin.H{"data": Facility})
}

// func ListPackageZone(c *gin.Context) {
// 	var Court []entity.Court
// 	ZoneID := c.Param("ZoneID")
// 	if err := entity.DB().Preload("Zone").Raw("SELECT * FROM courts WHERE zone_id = ?", ZoneID).Find(&Court).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": Court})
// }
