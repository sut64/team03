package entity

import (
	"fmt"
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type Package struct {
	gorm.Model
	Name     string
	Facility []Facility `gorm:"foreignKey:PackageID"`
}

type Facility struct {
	gorm.Model

	UserID *uint
	User   User

	No          string    `gorm:"uniqueIndex" valid:"matches(^[A]\\d{6}$)~หมายเลขรายการต้องขึ้นต้นด้วย A ตามด้วยตัวเลข 6 หลัก"`
	PackageTime time.Time `valid:"notpast~PackageTime must not be in the past"`
	Price       int       `valid:"uint~Price must be uint"`
	Confirm     bool

	PackageID *uint
	Package   Package

	TrainnerID *uint
	Trainner   Trainner

	Reserve []Reserve `gorm:"foreignKey:FacilityID"`
}

func CheckBool(t bool) (bool, error) {
	if t == true {
		return true, nil
	} else {
		return false, fmt.Errorf("Confirm must be true")
	}
}

func init() {
	govalidator.CustomTypeTagMap.Set("notpast", func(i interface{}, o interface{}) bool {
		t := i.(time.Time)
		return t.After(time.Now().AddDate(0, 0, -1))
	})
	govalidator.CustomTypeTagMap.Set("uint", func(i interface{}, o interface{}) bool {
		a := i.(int)
		return a >= 0
	})

}
