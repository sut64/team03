package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
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

	Amount    int       `valid:"required~กรุณากรอกจำนวนคน,positive~จำนวนไม่สามารถติดลบได้"`
	Tel       string    `valid:"required~กรุณากรอกเบอร์โทรศัพท์,matches(^[0]\\d{9}$)~กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง"`
	AddedTime time.Time `valid:"past~ไม่สามารถกรอกเวลาในอนาคต"`

	UserID uint
	User   User `valid:"-"`

	BookingTimeID uint
	BookingTime   BookingTime `valid:"-"`

	FacilityID uint
	Facility   Facility `valid:"-"`
}

type Zone struct {
	gorm.Model
	Name   string
	Status uint

	Court []Court `gorm:"foreignKey:ZoneID"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("past", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.Before(time.Now())
	})

	govalidator.CustomTypeTagMap.Set("future", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.After(time.Now())
	})

	govalidator.CustomTypeTagMap.Set("present", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.Equal(time.Now())
	})

	govalidator.CustomTypeTagMap.Set("positive", func(i interface{}, context interface{}) bool {
		t := i.(int)
		return t > 0
	})
}