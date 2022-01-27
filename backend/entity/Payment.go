package entity

import (
	
	"gorm.io/gorm"
)

type PaymentMethod struct {
	gorm.Model
	Name				string 
	//Payments			[]Payment				`gorm:"foreignKey:PaymentMethodID"`
}