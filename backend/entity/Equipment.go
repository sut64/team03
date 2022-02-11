package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type SportType struct {
	gorm.Model
	Type      string
	Equipment []Equipment `gorm:"foreignKey:SportTypeID"`
}

type Company struct {
	gorm.Model
	Company   string
	Tel       string
	About     string
	Equipment []Equipment `gorm:"foreignKey:CompanyID"`
}

type RoleItem struct {
	gorm.Model
	Role      string
	Equipment []Equipment `gorm:"foreignKey:RoleItemID"`
}

type Equipment struct {
	gorm.Model

	Name      string `gorm:"uniqueIndex" valid:"required~กรุณากรอกชื่ออุปกรณ์"`
	InputDate time.Time `valid:"past~วันที่นำเข้าอุปกรณ์ไม่สามารถเป็นอนาคต"`
	Quantity  int `valid:"required~กรุณากรอกจำนวนอุปกรณ์ที่ต้องการเพิ่ม, range(1|1000)~จำนวนที่เพิ่มต้องมากกว่า 0 และน้อยกว่า 1000"`

	SportTypeID *uint
	SportType   SportType

	CompanyID *uint
	Company   Company

	RoleItemID *uint
	RoleItem   RoleItem

	EquipmentStaffID *uint
	EquipmentStaff   User

	Borrowings []Borrowing `gorm:"foreignKey:EquipmentID"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("past", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		now := time.Now()
		return now.After(t)
	})

}

