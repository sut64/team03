package entity

import (
	"time"
	"gorm.io/gorm"
)

type PaymentMethod struct {
	gorm.Model
	Name				string 
	Payments			[]Payment				`gorm:"foreignKey:PaymentMethodID"`
}

type Payment struct {
	gorm.Model
	AddedTime			time.Time
	Bill				string					
	Discount			uint					
	Total				uint
	PaymentMethodID		*uint
	PaymentMethod		PaymentMethod
	FacilityID			*uint
	Facility			Facility
	CustomerPaymentID	*uint
	CustomerPayment		User
	StaffPaymentID		*uint
	StaffPayment		User
}