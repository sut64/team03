package entity

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name     string
	Email    string
	Password string
	Tel      string
	Gender   string
	Brithday time.Time

	// Facility []Facility `gorm:"foreignKey:UserID"`

	RoleID *uint
	Role   Role

	CustomerBorrows []Borrowing `gorm:"foreignKey:CustomerBorrowID"`
	StaffBorrows    []Borrowing `gorm:"foreignKey:StaffBorrowID"`

	EquipmentStaff 	[]Equipment `gorm:"foreignKey:EquipmentStaffID"`

	CustomerPayments []Payment `gorm:"foreignKey:CustomerPaymentID"`
	StaffPayments    []Payment `gorm:"foreignKey:StaffPaymentID"`
}

type Role struct {
	gorm.Model
	Name string
	User []User `gorm:"foreignKey:RoleID"`
}
