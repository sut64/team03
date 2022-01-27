package entity

import (
	"gorm.io/gorm"
	"time"
)

type BookingTime struct {
	gorm.Model
	Name   string
	Time   string
	Amount uint
	Avalable uint

	CourtID uint
	Court   Court

	Reserve  []Reserve  `gorm:"foreignKey:BookingTimeID"`

	
	
}

type Court struct {
	gorm.Model
	Name           string
	
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

	ZoneID uint
	Zone   Zone

	CourtID uint
	Court   Court

	BookingTimeID uint
	BookingTime   BookingTime
}



type Zone struct {
	gorm.Model
	Name   string

	Reserve  []Reserve  `gorm:"foreignKey:ZoneID"`
	Court    []Court  `gorm:"foreignKey:ZoneID"`
}