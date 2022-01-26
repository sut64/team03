package entity

import (
	"time"

	"gorm.io/gorm"
)

type Package struct {
	gorm.Model
	Name     string
	Facility []Facility `gorm:"foreignKey:PackageID"`
}

type Facility struct {
	gorm.Model

	UserID *uint
	User   User

	No          string
	PackageTime time.Time
	Price       int
	Confirm     bool

	PackageID *uint
	Package   Package

	TrainnerID *uint
	Trainner   Trainner
}
