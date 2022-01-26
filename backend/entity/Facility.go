package entity

import (

	"gorm.io/gorm"
)

type Package struct {
	gorm.Model
	Name string
	// Facility []Facility `gorm:"foreignKey:PackageID"`

}