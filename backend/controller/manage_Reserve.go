package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team03/backend/entity"
)

func CreateReserve(c *gin.Context) {

	var Reserve entity.Reserve
	var User entity.User
	var Zone entity.Zone
	var Court entity.Court
	var BookingTime entity.BookingTime

	if err := c.ShouldBindJSON(&Reserve); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา Court ด้วย id
	if tx := entity.DB().Where("id = ?", Reserve.CourtID).First(&Court); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Court  not found"})
		return
	}

	// 10: ค้นหา User ด้วย id
	if tx := entity.DB().Where("id = ?", Reserve.UserID).First(&User); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Reserve  not found"})
		return
	}

	// 11: ค้นหา Zone ด้วย id
	if tx := entity.DB().Where("id = ?", Reserve.ZoneID).First(&Zone); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "zone not found"})

		return
	}

	if tx := entity.DB().Where("id = ?", Reserve.BookingTimeID).First(&BookingTime); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "BookingTime not found"})
		return
	}

	// 12: สร้าง Reserve
	rs := entity.Reserve{
		User:        User,
		Zone:        Zone,
		Court:       Court,
		BookingTime: BookingTime,
		Amount:      Reserve.Amount,
		Tel:         Reserve.Tel,
		AddedTime:   Reserve.AddedTime,
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
		entity.DB().Preload("Court").Preload("User").Preload("Zone").Preload("Court").Preload("BookingTime").Table("reserves").Find(&Reserve).Error; err != nil {
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