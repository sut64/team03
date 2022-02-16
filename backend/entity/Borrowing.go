package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type BorrowStatus struct {
	gorm.Model
	Status     string
	Borrowings []Borrowing `gorm:"foreignKey:BorrowStatusID"`
}

type Borrowing struct {
	gorm.Model
	Borrowtime       time.Time `valid:"required~กรุณากรอกวันที่-เวลา,past~ไม่สามารถกรอกเวลาในอนาคต"`
	Backtime		 time.Time 
	Comment          string
	Quantity         int    `valid:"required~จำนวนอุปกรณ์ไม่สามารถเป็นศูนย์,positive~จำนวนอุปกรณ์ไม่สามารถติดลบได้"`
	Contact          string `valid:"required~กรุณากรอกเบอร์โทรศัพท์,matches(^[0]\\d{9}$)~กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง,matches(^[0][689]\\d{8}$)~เบอร์โทรศัพท์ต้องขึ้นต้นด้วย 06|08|09"`
	BorrowStatusID   *uint
	BorrowStatus     BorrowStatus `valid:"-"`
	EquipmentID      *uint
	Equipment        Equipment `valid:"-"`
	CustomerBorrowID *uint
	CustomerBorrow   User `valid:"-"`
	StaffBorrowID    *uint
	StaffBorrow      User `valid:"-"`
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
		return t >= 1
	})

}
