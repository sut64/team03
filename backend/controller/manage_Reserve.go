package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team03/backend/entity"

	"github.com/asaskevich/govalidator"
)

func CreateReserve(c *gin.Context) {

	var Reserve entity.Reserve
	var User entity.User
	var BookingTime entity.BookingTime
	var Facility entity.Facility

	if err := c.ShouldBindJSON(&Reserve); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 10: ค้นหา User ด้วย id
	if tx := entity.DB().Where("id = ?", Reserve.UserID).First(&User); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Reserve  not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", Reserve.FacilityID).First(&Facility); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Facility not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", Reserve.BookingTimeID).First(&BookingTime); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "BookingTime not found"})
		return
	}

	// 12: สร้าง Reserve
	rs := entity.Reserve{
		User:        User,
		Facility:    Facility,
		BookingTime: BookingTime,
		Amount:      Reserve.Amount,
		Tel:         Reserve.Tel,
		AddedTime:   Reserve.AddedTime,
	}

	if _, err := govalidator.ValidateStruct(Reserve); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 13: บันทึก
	if err := entity.DB().Create(&rs).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": rs})
}

// GET /Reserve
func ListReserve(c *gin.Context) {
	var Reserve []*entity.Reserve
	if err :=
		entity.DB().Preload("BookingTime").Preload("BookingTime.Court").Preload("BookingTime.Court.Zone").Preload("User").Table("reserves").Find(&Reserve).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Reserve})
}

func ListZone(c *gin.Context) {
	var Zone []entity.Zone
	if err := entity.DB().Table("zones").Find(&Zone).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Zone})
}

func ListCourt(c *gin.Context) {
	var Court []entity.Court
	ZoneID := c.Param("ZoneID")
	if err := entity.DB().Preload("Zone").Raw("SELECT * FROM courts WHERE zone_id = ?", ZoneID).Find(&Court).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Court})
}

func ListBookingTime(c *gin.Context) {
	var BookingTime []entity.BookingTime
	CourtID := c.Param("CourtID")
	if err := entity.DB().Preload("Court").Raw("SELECT * FROM booking_times WHERE court_id = ?", CourtID).Find(&BookingTime).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": BookingTime})
}

// func ListUser(c *gin.Context) {
// 	var User []entity.User
// 	if err := entity.DB().Table("users").Find(&User).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": User})
// }
func ListZonePac(c *gin.Context) {
	var Zone []entity.Zone
	PacID := c.Param("PacID")
	if err := entity.DB().Raw("SELECT * FROM zones WHERE status <= ?", PacID).Find(&Zone).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Zone})
}
