package entity

import (
	"gorm.io/gorm"
)

//TypeEvent
type TypeEvent struct {
	gorm.Model

	Name string

	Events []Event `gorm:"foreignKey:TypeEventID"`
}
