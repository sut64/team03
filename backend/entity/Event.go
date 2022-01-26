package entity

import (
	"time"

	"gorm.io/gorm"
)

//Event
type Event struct {
	gorm.Model

	Name      string
	Details   string
	TimeStart time.Time
	TimeEnd   time.Time
	Amount    uint

	TrainnerID *uint
	Trainner   Trainner

	RoomID *uint
	Room   Room

	TypeEventID *uint
	TypeEvent   TypeEvent
}
