package entity

import (
	"time"
	"gorm.io/gorm"
	"github.com/asaskevich/govalidator"
)

type PaymentMethod struct {
	gorm.Model
	Name				string 
	Payments			[]Payment				`gorm:"foreignKey:PaymentMethodID"`
}

type Payment struct {
	gorm.Model
	AddedTime			time.Time				`valid:"past~AddedTime must be in the past"`
	Bill				string					`gorm:"uniqueIndex" valid:"required~Bill cannot be blank,matches(^[R]\\d{6}$)"`	
	Discount			uint					`valid:"range(0|10000)~Discount is between 0 and 10000"`
	Total				uint					`valid:"range(0|10000)~Total is between 0 and 10000"`
	Note				string					`valid:"required~Note cannot be blank"`
	PaymentMethodID		*uint
	PaymentMethod		PaymentMethod			`gorm:"references:id" valid:"-"`
	FacilityID			*uint					`gorm:"uniqueIndex"`
	Facility			Facility				`gorm:"references:id" valid:"-"`
	CustomerPaymentID	*uint
	CustomerPayment		User					`gorm:"references:id" valid:"-"`
	StaffPaymentID		*uint
	StaffPayment		User					`gorm:"references:id" valid:"-"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("past", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.Before(time.Now())
	})
}