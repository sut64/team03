package entity

import (
	"gorm.io/gorm"
)

//Trainner
type Trainner struct {
	gorm.Model

	Name       string
	Gender     string
	Age        uint
	Email      string
	Tel        string
	Experience string

	Events []Event `gorm:"foreignKey:TrainnerID"`
}
