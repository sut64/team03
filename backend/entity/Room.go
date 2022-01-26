package entity

import (
	"gorm.io/gorm"
)

//Room
type Room struct {
	gorm.Model

	Name    string
	Maximum uint

	Events []Event `gorm:"foreignKey:RoomID"`
}
