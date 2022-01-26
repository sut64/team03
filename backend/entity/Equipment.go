package entity

import (
	"time"

	"gorm.io/gorm"
)


type SportType struct {
	gorm.Model
	Type      string
	Equipment []Equipment `gorm:"foreignKey:SportTypeID"`
}


