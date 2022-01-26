package entity

import (
	"time"

	"gorm.io/gorm"
)

type Borrowing struct {
	gorm.Model
	Borrowtime       time.Time
	Comment          string
	Quantity         uint
	Contact          string
	BorrowStatusID   *uint
	BorrowStatus     BorrowStatus
	EquipmentID      *uint
	Equipment        Equipment
	CustomerBorrowID *uint
	CustomerBorrow   User
	StaffBorrowID    *uint
	StaffBorrow      User
}

type BorrowStatus struct {
	gorm.Model
	Status     string
	Borrowings []Borrowing `gorm:"foreignKey:BorrowStatusID"`
}
