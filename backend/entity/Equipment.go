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

type RoleItem struct {
	gorm.Model
	Role      string
	Equipment []Equipment `gorm:"foreignKey:RoleItemID"`
}

type Equipment struct {
	gorm.Model

	Name      string `gorm:"uniqueIndex"`
	InputDate time.Time
	Quantity  uint

	SportTypeID *uint
	SportType   SportType	

	CompanyID *uint
	Company   Company 

	RoleItemID *uint
	RoleItem   RoleItem 

	UserID *uint
	User   User
}


