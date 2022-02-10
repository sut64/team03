package entity

import (
	"time"

	"gorm.io/gorm"

	"github.com/asaskevich/govalidator"
)

//Event
type Event struct {
	gorm.Model

	Name      string `valid:"required~Name cannot be blank"`
	Details   string
	TimeStart time.Time `valid:"future~TimeStart must be in the future"`
	TimeEnd   time.Time `valid:"future~TimeEnd must be in the future"`
	Amount    int       `valid:"minamount~Amount must not be negotive, required~Amount must not be zero"`

	TrainnerID *uint
	Trainner   Trainner

	RoomID *uint
	Room   Room

	TypeEventID *uint
	TypeEvent   TypeEvent
}

func init() {
	govalidator.CustomTypeTagMap.Set("future", func(i, o interface{}) bool {
		t := i.(time.Time)
		return t.After(time.Now())
	})

	govalidator.CustomTypeTagMap.Set("minamount", func(i, o interface{}) bool {
		a := i.(int)
		return a >= 1
	})
}
