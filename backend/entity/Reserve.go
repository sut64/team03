package entity

import (
	"time"

	"gorm.io/gorm"
)

type BookingTime struct {
	gorm.Model
	Name     string
	Time     string
	Amount   uint
	Avalable uint

	CourtID uint
	Court   Court

	Reserve []Reserve `gorm:"foreignKey:BookingTimeID"`
}

type Court struct {
	gorm.Model
	Name string

	ZoneID uint
	Zone   Zone

	BookingTime []BookingTime `gorm:"foreignKey:CourtID"`
}

type Reserve struct {
	gorm.Model

	Amount    uint
	Tel       string
	AddedTime time.Time

	UserID uint
	User   User

	BookingTimeID uint
	BookingTime   BookingTime

	FacilityID uint
	Facility   Facility
}

type Zone struct {
	gorm.Model
	Name   string
	Status uint

	Court []Court `gorm:"foreignKey:ZoneID"`
}
