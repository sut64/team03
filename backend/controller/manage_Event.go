package controller

import (
	"github.com/sut64/team03/backend/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

func CreateEvent(c *gin.Context) {

	var Event entity.Event
	var Trainner entity.Trainner
	var TypeEvent entity.TypeEvent
	var Room entity.Room

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 7 จะถูก bind เข้าตัวแปร Screening
	if err := c.ShouldBindJSON(&Event); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 8: ค้นหา Trainner ด้วย id
	if tx := entity.DB().Where("id = ?", Event.TrainnerID).First(&Trainner); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Trainner not found"})
		return
	}

	// 9: ค้นหา Room ด้วย id
	if tx := entity.DB().Where("id = ?", Event.RoomID).First(&Room); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Room not found"})
		return
	}

	// 10: ค้นหา TypeEvent ด้วย id
	if tx := entity.DB().Where("id = ?", Event.TypeEventID).First(&TypeEvent); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "TypeEvent not found"})
		return
	}
	// 11: สร้าง Screening
	Ev := entity.Event{

		Name:      Event.Name,
		Details:   Event.Details,
		TimeStart: Event.TimeStart,
		TimeEnd:   Event.TimeEnd,
		Amount:    Event.Amount,

		Trainner:  Trainner,
		Room:      Room,
		TypeEvent: TypeEvent,
	}

	// 12: บันทึก
	if err := entity.DB().Create(&Ev).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Ev})

}

//Get ListScreenings
func ListEvent(c *gin.Context) {
	var Events []entity.Event
	if err := entity.DB().Preload("Trainner").Preload("Room").Preload("TypeEvent").Raw("SELECT * FROM events").Find(&Events).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Events})
}

// GET ListTrainner
func ListTrainner(c *gin.Context) {
	var Trainners []entity.Trainner
	if err := entity.DB().Raw("SELECT * FROM trainners").Scan(&Trainners).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Trainners})
}

// GET ListTypeEvent
func ListTypeEvent(c *gin.Context) {
	var typeEvent []entity.TypeEvent
	if err := entity.DB().Raw("SELECT * FROM type_events").Scan(&typeEvent).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": typeEvent})
}

// GET ListRoom
func ListRoom(c *gin.Context) {
	var rooms []entity.Room
	if err := entity.DB().Raw("SELECT * FROM rooms").Scan(&rooms).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": rooms})
}
