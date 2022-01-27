package entity

import (
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("projectSe.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	database.AutoMigrate(
		&User{}, &Package{}, &Trainner{}, Facility{},
	)

	db = database

	Role1 := Role{
		Name: "member",
	}
	db.Model(&Role{}).Create(&Role1)
	Role2 := Role{
		Name: "admin",
	}
	db.Model(&Role{}).Create(&Role2)

	PasswordUser1, err := bcrypt.GenerateFromPassword([]byte("1234"), 14)
	User1 := User{
		Name:     "asdf",
		Password: string(PasswordUser1),
		Email:    "bos@gmail.com",
		Tel:      "asdfasdf",
		Gender:   "asdfasdf",
		Brithday: time.Now(),
		Role:     Role1,
	}
	db.Model(&User{}).Create(&User1)
	PasswordUser2, err := bcrypt.GenerateFromPassword([]byte("1111"), 14)
	User2 := User{
		Name:     "qwer",
		Password: string(PasswordUser2),
		Email:    "admin@gmail.com",
		Tel:      "asdfasdf",
		Gender:   "asdfasdf",
		Brithday: time.Now(),
		Role:     Role2,
	}
	db.Model(&User{}).Create(&User2)

	PasswordUser3, err := bcrypt.GenerateFromPassword([]byte("2222"), 14)
	User3 := User{
		Name:     "memmm",
		Password: string(PasswordUser3),
		Email:    "member@gmail.com",
		Tel:      "asdfasdf",
		Gender:   "asdfasdf",
		Brithday: time.Now(),
		Role:     Role1,
	}
	db.Model(&User{}).Create(&User3)

	Package1 := Package{
		Name: "Gold",
	}
	db.Model(&Package{}).Create(&Package1)

	Trainner1 := Trainner{
		Name:       "Bos",
		Gender:     "Female",
		Age:        21,
		Email:      "asdf@",
		Tel:        "092923134",
		Experience: "asdfasd",
	}
	db.Model(&Trainner{}).Create(&Trainner1)

	Facility1 := Facility{
		User:        User1,
		No:          "A000000",
		PackageTime: time.Now(),
		Price:       1234,
		Confirm:     true,
		Package:     Package1,
		Trainner:    Trainner1,
	}
	db.Model(&Facility{}).Create(&Facility1)

}
