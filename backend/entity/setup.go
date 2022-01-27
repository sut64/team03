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
		&User{}, &Package{}, &Trainner{}, &Facility{}, &Room{}, &TypeEvent{}, &Event{}, &BookingTime{}, &Equipment{}, &Payment{}, &Reserve{},
		&SportType{}, &Company{}, &RoleItem{}, &BookingTime{}, &Court{}, &Zone{}, &BorrowStatus{}, &PaymentMethod{}, Borrowing{},
	)

	db = database

	// setupRole-----------------------------------------------------------------------
	Role1 := Role{
		Name: "member",
	}
	db.Model(&Role{}).Create(&Role1)
	Role2 := Role{
		Name: "admin",
	}
	db.Model(&Role{}).Create(&Role2)

	//setup User ----------------------------------------------------------------------
	PasswordUser1, err := bcrypt.GenerateFromPassword([]byte("1234"), 14)
	User1 := User{
		Name:     "Boss",
		Password: string(PasswordUser1),
		Email:    "Boss@gmail.com",
		Tel:      "082-XXXXXXX",
		Gender:   "Male",
		Brithday: time.Now().AddDate(-21, -8, 2),
		Role:     Role2,
	}
	db.Model(&User{}).Create(&User1)

	PasswordUser2, err := bcrypt.GenerateFromPassword([]byte("1234"), 14)
	User2 := User{
		Name:     "Nueng",
		Password: string(PasswordUser2),
		Email:    "Nueng@gmail.com",
		Tel:      "097-XXXXXXX",
		Gender:   "Male",
		Brithday: time.Now().AddDate(-21, -5, 6),
		Role:     Role2,
	}
	db.Model(&User{}).Create(&User2)

	PasswordUser3, err := bcrypt.GenerateFromPassword([]byte("1234"), 14)
	User3 := User{
		Name:     "Gnnim",
		Password: string(PasswordUser3),
		Email:    "Gnnim@gmail.com",
		Tel:      "045-XXXXXXX",
		Gender:   "Female",
		Brithday: time.Now().AddDate(-21, -11, 5),
		Role:     Role2,
	}
	db.Model(&User{}).Create(&User3)

	PasswordUser4, err := bcrypt.GenerateFromPassword([]byte("1234"), 14)
	User4 := User{
		Name:     "Faii",
		Password: string(PasswordUser4),
		Email:    "Faii@gmail.com",
		Tel:      "054-XXXXXXX",
		Gender:   "Female",
		Brithday: time.Now().AddDate(-21, -4, 5),
		Role:     Role2,
	}
	db.Model(&User{}).Create(&User4)

	PasswordUser5, err := bcrypt.GenerateFromPassword([]byte("1234"), 14)
	User5 := User{
		Name:     "Oeng",
		Password: string(PasswordUser5),
		Email:    "Oeng@gmail.com",
		Tel:      "074-XXXXXXX",
		Gender:   "Female",
		Brithday: time.Now().AddDate(-21, -4, 5),
		Role:     Role2,
	}
	db.Model(&User{}).Create(&User5)

	PasswordUser6, err := bcrypt.GenerateFromPassword([]byte("1234"), 14)
	User6 := User{
		Name:     "Big",
		Password: string(PasswordUser6),
		Email:    "Big@gmail.com",
		Tel:      "036-XXXXXXX",
		Gender:   "Male",
		Brithday: time.Now().AddDate(-21, -5, 5),
		Role:     Role2,
	}
	db.Model(&User{}).Create(&User6)

	PasswordUser7, err := bcrypt.GenerateFromPassword([]byte("1234"), 14)
	User7 := User{
		Name:     "Owen",
		Password: string(PasswordUser7),
		Email:    "Member@gmail.com",
		Tel:      "036-XXXXXXX",
		Gender:   "Female",
		Brithday: time.Now().AddDate(-1, -2, 5),
		Role:     Role1,
	}
	db.Model(&User{}).Create(&User7)

	PasswordUser8, err := bcrypt.GenerateFromPassword([]byte("1234"), 14)
	User8 := User{
		Name:     "Xander",
		Password: string(PasswordUser8),
		Email:    "Member2@gmail.com",
		Tel:      "036-XXXXXXX",
		Gender:   "Female",
		Brithday: time.Now().AddDate(-1, -4, 5),
		Role:     Role1,
	}
	db.Model(&User{}).Create(&User8)

	PasswordUser9, err := bcrypt.GenerateFromPassword([]byte("1234"), 14)
	User9 := User{
		Name:     "Zayden",
		Password: string(PasswordUser9),
		Email:    "Member3@gmail.com",
		Tel:      "036-XXXXXXX",
		Gender:   "Female",
		Brithday: time.Now().AddDate(-1, -1, 9),
		Role:     Role1,
	}
	db.Model(&User{}).Create(&User9)

	PasswordUser10, err := bcrypt.GenerateFromPassword([]byte("1234"), 14)
	User10 := User{
		Name:     "Matteo",
		Password: string(PasswordUser10),
		Email:    "Member4@gmail.com",
		Tel:      "036-XXXXXXX",
		Gender:   "Female",
		Brithday: time.Now().AddDate(-1, -7, 9),
		Role:     Role1,
	}
	db.Model(&User{}).Create(&User10)

	// setup Package -------------------------------------------------------------------
	Package1 := Package{
		Name: "Silver",
	}
	db.Model(&Package{}).Create(&Package1)

	Package2 := Package{
		Name: "Gold",
	}
	db.Model(&Package{}).Create(&Package2)

	Package3 := Package{
		Name: "Platinum",
	}
	db.Model(&Package{}).Create(&Package3)

	//setup TypeEvent --------------------------------------------------------------------
	TypeEvent1 := TypeEvent{
		Name: "Sport",
	}
	db.Model(&TypeEvent{}).Create(&TypeEvent1)

	TypeEvent2 := TypeEvent{
		Name: "Training",
	}
	db.Model(&TypeEvent{}).Create(&TypeEvent2)

	TypeEvent3 := TypeEvent{
		Name: "Social activities",
	}
	db.Model(&TypeEvent{}).Create(&TypeEvent3)

	TypeEvent4 := TypeEvent{
		Name: "Voluntary Recreation",
	}
	db.Model(&TypeEvent{}).Create(&TypeEvent4)

	//setup Room ---------------------------------------------------------------------------
	Room1 := Room{
		Name:    "Room1",
		Maximum: 20,
	}
	db.Model(&Room{}).Create(&Room1)

	Room2 := Room{
		Name:    "Room2",
		Maximum: 20,
	}
	db.Model(&Room{}).Create(&Room2)

	Room3 := Room{
		Name:    "Room3",
		Maximum: 40,
	}
	db.Model(&Room{}).Create(&Room3)

	Room4 := Room{
		Name:    "Meeting Room1",
		Maximum: 10,
	}
	db.Model(&Room{}).Create(&Room4)

	Room5 := Room{
		Name:    "Meeting Room2",
		Maximum: 20,
	}
	db.Model(&Room{}).Create(&Room5)

	//setup Trainner -------------------------------------------------------------------------
	Trainner1 := Trainner{
		Name:       "Diego Vest",
		Gender:     "Male",
		Age:        26,
		Email:      "Diego@xmail.com",
		Tel:        "0XX-xxxxx",
		Experience: "Yoga",
	}
	db.Model(&Trainner{}).Create(&Trainner1)

	Trainner2 := Trainner{
		Name:       "William Hurtado",
		Gender:     "Male",
		Age:        26,
		Email:      "William@xmail.com",
		Tel:        "085-xxxxx",
		Experience: "Aerobics",
	}
	db.Model(&Trainner{}).Create(&Trainner2)

	Trainner3 := Trainner{
		Name:       "Ethan Dennis",
		Gender:     "Male",
		Age:        26,
		Email:      "XXXX@xmail.com",
		Tel:        "094-xxxxx",
		Experience: "Bodybuilding",
	}
	db.Model(&Trainner{}).Create(&Trainner3)

	Trainner4 := Trainner{
		Name:       "Jonathan Lanier",
		Gender:     "Male",
		Age:        26,
		Email:      "Jonathan@xmail.com",
		Tel:        "092-xxxxx",
		Experience: "Climbing",
	}
	db.Model(&Trainner{}).Create(&Trainner4)

	//Set up BorrowStatus -------------------------------------------------------------------------
	BorrowStatus1 := BorrowStatus{
		Status: "Borrowing",
	}
	db.Model(&BorrowStatus{}).Create(&BorrowStatus1)

	BorrowStatus2 := BorrowStatus{
		Status: "Finished",
	}
	db.Model(&BorrowStatus{}).Create(&BorrowStatus2)

	BorrowStatus3 := BorrowStatus{
		Status: "Missed",
	}
	db.Model(&BorrowStatus{}).Create(&BorrowStatus3)

	// setup PaymentMethod -------------------------------------------------------------------------
	PaymentMethod1 := PaymentMethod{
		Name: "Visa",
	}
	db.Model(&PaymentMethod{}).Create(&PaymentMethod1)

	PaymentMethod2 := PaymentMethod{
		Name: "เงินสด",
	}
	db.Model(&PaymentMethod{}).Create(&PaymentMethod2)

	PaymentMethod3 := PaymentMethod{
		Name: "TrueMoney Wallet",
	}
	db.Model(&PaymentMethod{}).Create(&PaymentMethod3)

	// setup SportType
	SportType1 := SportType{
		Type: "ฟุตบอล",
	}
	db.Model(&SportType{}).Create(&SportType1)

	SportType2 := SportType{
		Type: "ฟุตซอล",
	}
	db.Model(&SportType{}).Create(&SportType2)

	SportType3 := SportType{
		Type: "แบตมินตัน",
	}
	db.Model(&SportType{}).Create(&SportType3)

	SportType4 := SportType{
		Type: "เทนนิส",
	}
	db.Model(&SportType{}).Create(&SportType4)

	SportType5 := SportType{
		Type: "บาสเก็ตบอล",
	}
	db.Model(&SportType{}).Create(&SportType5)

	SportType6 := SportType{
		Type: "วอลเล่บอล",
	}
	db.Model(&SportType{}).Create(&SportType6)

	SportType7 := SportType{
		Type: "ยกนำหนัก",
	}
	db.Model(&SportType{}).Create(&SportType7)

	SportType8 := SportType{
		Type: "ปิงปอง",
	}
	db.Model(&SportType{}).Create(&SportType8)

	SportType9 := SportType{
		Type: "ว่ายน้ำ",
	}
	db.Model(&SportType{}).Create(&SportType9)

	SportType10 := SportType{
		Type: "อุปกรณ์ฟิตเนส",
	}
	db.Model(&SportType{}).Create(&SportType10)

	//Company
	Company1 := Company{
		Company: "JN Sport",
		Tel:     "0954645512",
		About:   "จำหน่ายอุปกรณ์กีฬาทางบกทุกประเภท",
	}
	db.Model(&Company{}).Create(&Company1)

	Company2 := Company{
		Company: "Sport T",
		Tel:     "0854147895",
		About:   "จำหน่ายอุปกรณ์กีฬาทางน้ำทุกประเภท",
	}
	db.Model(&Company{}).Create(&Company2)

	Company3 := Company{
		Company: "Fitness.Me",
		Tel:     "0916258543",
		About:   "จำหน่ายอุปกรณ์ฟิตเนสทุกประเภท",
	}
	db.Model(&Company{}).Create(&Company3)

	//RoleItem
	RoleItem1 := RoleItem{
		Role: "ยืมได้",
	}
	db.Model(&RoleItem{}).Create(&RoleItem1)

	RoleItem2 := RoleItem{
		Role: "ยืมไม่ได้",
	}
	db.Model(&RoleItem{}).Create(&RoleItem2)

	// ----------------------------------   setup ตารางหลัก   ----------------------------------------- \\

	//Facility
	Facility1 := Facility{
		User:        User1,
		No:          "A000000",
		PackageTime: time.Date(2022, 2, 23, 8, 30, 30, 30, time.Local),
		Price:       199,
		Confirm:     true,
		Package:     Package1,
		Trainner:    Trainner1,
	}
	db.Model(&Facility{}).Create(&Facility1)

	Event1 := Event{
		Name:      "Yago",
		Details:   "Practicing yoga is the process of training the body",
		TimeStart: time.Date(2022, 2, 7, 8, 30, 30, 30, time.Local),
		TimeEnd:   time.Date(2022, 2, 7, 12, 0, 30, 30, time.Local),
		Amount:    26,

		Trainner:  Trainner2,
		TypeEvent: TypeEvent1,
		Room:      Room1,
	}
	db.Model(&Event{}).Create(&Event1)

	//Equipment
	Equipment1 := Equipment{
		Name:           "ลูกบาส01",
		Quantity:       50,
		SportType:      SportType5,
		Company:        Company1,
		RoleItem:       RoleItem1,
		EquipmentStaff: User3,
		InputDate:      time.Now(),
	}
	db.Model(&Equipment{}).Create(&Equipment1)

	Equipment2 := Equipment{
		Name:           "ลูกแบต01",
		Quantity:       40,
		SportType:      SportType3,
		Company:        Company1,
		RoleItem:       RoleItem1,
		EquipmentStaff: User3,
		InputDate:      time.Now(),
	}
	db.Model(&Equipment{}).Create(&Equipment2)

	Equipment3 := Equipment{
		Name:           "ชุดว่ายน้ำ ชาย01",
		Quantity:       30,
		SportTypeID:    &SportType9.ID,
		CompanyID:      &Company2.ID,
		RoleItemID:     &RoleItem1.ID,
		EquipmentStaff: User3,
		InputDate:      time.Now(),
	}
	db.Model(&Equipment{}).Create(&Equipment3)

	Equipment4 := Equipment{
		Name:           "ลู่วิ่ง01",
		Quantity:       20,
		SportTypeID:    &SportType10.ID,
		CompanyID:      &Company3.ID,
		RoleItemID:     &RoleItem2.ID,
		EquipmentStaff: User3,
		InputDate:      time.Now(),
	}
	db.Model(&Equipment{}).Create(&Equipment4)

	//Borrowing
	Borrowing1 := Borrowing{
		Borrowtime:     time.Now(),
		Comment:        "-",
		Quantity:       1,
		Contact:        "0908208456",
		BorrowStatus:   BorrowStatus1,
		Equipment:      Equipment1,
		CustomerBorrow: User7,
		StaffBorrow:    User5,
	}
	db.Model(&Borrowing{}).Create(&Borrowing1)

	//Payment
	Payment1 := Payment{
		Bill:            "R000001",
		CustomerPayment: User2,
		StaffPayment:    User1,
		Facility:        Facility1,
		PaymentMethod:   PaymentMethod2,
		AddedTime:       time.Date(2022, 5, 7, 10, 29, 20, 10, time.Local),
		Discount:        20,
		Total:           280,
	}
	db.Model(&Payment{}).Create(&Payment1)

}
