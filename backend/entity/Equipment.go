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

type Company struct {
	gorm.Model
	Company   string
	Tel       string
	About     string
	Equipment []Equipment `gorm:"foreignKey:CompanyID"`
}


