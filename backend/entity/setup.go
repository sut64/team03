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
		Role:     Role1,
	}
	db.Model(&User{}).Create(&User4)

	PasswordUser5, err := bcrypt.GenerateFromPassword([]byte("1234"), 14)
	User5 := User{
		Name:     "Member",
		Password: string(PasswordUser5),
		Email:    "member@gmail.com",
		Tel:      "074-XXXXXXX",
		Gender:   "Female",
		Brithday: time.Now().AddDate(-21, -4, 5),
		Role:     Role1,
	}
	db.Model(&User{}).Create(&User5)

	PasswordUser6, err := bcrypt.GenerateFromPassword([]byte("1234"), 14)
	User6 := User{
		Name:     "Admin",
		Password: string(PasswordUser6),
		Email:    "admin@gmail.com",
		Tel:      "036-XXXXXXX",
		Gender:   "Male",
		Brithday: time.Now().AddDate(-21, -5, 5),
		Role:     Role2,
	}
	db.Model(&User{}).Create(&User6)

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
		Role: "Borrow allow",
	}
	db.Model(&RoleItem{}).Create(&RoleItem1)

	RoleItem2 := RoleItem{
		Role: "Borrow not allow",
	}
	db.Model(&RoleItem{}).Create(&RoleItem2)

	// ----------------------------------   setup ตารางหลัก   ----------------------------------------- \\

	//Facility
	Facility1 := Facility{
		User:        User1,
		No:          "A000001",
		PackageTime: time.Date(2022, 2, 23, 8, 30, 30, 30, time.Local),
		Price:       199,
		Confirm:     true,
		Package:     Package1,
		Trainner:    Trainner1,
	}
	db.Model(&Facility{}).Create(&Facility1)

	Facility2 := Facility{
		User:        User2,
		No:          "A000002",
		PackageTime: time.Date(2022, 3, 23, 8, 30, 20, 30, time.Local),
		Price:       250,
		Confirm:     true,
		Package:     Package2,
		Trainner:    Trainner3,
	}
	db.Model(&Facility{}).Create(&Facility2)

	Facility3 := Facility{
		User:        User3,
		No:          "A000003",
		PackageTime: time.Date(2021, 3, 23, 8, 30, 20, 30, time.Local),
		Price:       1234,
		Confirm:     true,
		Package:     Package3,
		Trainner:    Trainner2,
	}
	db.Model(&Facility{}).Create(&Facility3)

	Facility4 := Facility{
		User:        User4,
		No:          "A000004",
		PackageTime: time.Date(2021, 3, 23, 7, 30, 20, 30, time.Local),
		Price:       1523,
		Confirm:     true,
		Package:     Package1,
		Trainner:    Trainner2,
	}
	db.Model(&Facility{}).Create(&Facility4)

	Facility5 := Facility{
		User:        User5,
		No:          "A000005",
		PackageTime: time.Date(2021, 2, 23, 7, 30, 20, 30, time.Local),
		Price:       1523,
		Confirm:     true,
		Package:     Package2,
		Trainner:    Trainner4,
	}
	db.Model(&Facility{}).Create(&Facility5)

	Facility6 := Facility{
		User:        User6,
		No:          "A000006",
		PackageTime: time.Date(2021, 2, 2, 7, 30, 20, 30, time.Local),
		Price:       5000,
		Confirm:     true,
		Package:     Package3,
		Trainner:    Trainner4,
	}
	db.Model(&Facility{}).Create(&Facility6)

	Facility7 := Facility{
		User:        User1,
		No:          "A000007",
		PackageTime: time.Date(2021, 2, 2, 7, 30, 20, 30, time.Local),
		Price:       5200,
		Confirm:     true,
		Package:     Package3,
		Trainner:    Trainner4,
	}
	db.Model(&Facility{}).Create(&Facility7)

	Facility8 := Facility{
		User:        User1,
		No:          "A000008",
		PackageTime: time.Date(2021, 2, 2, 6, 30, 20, 30, time.Local),
		Price:       5200,
		Confirm:     true,
		Package:     Package2,
		Trainner:    Trainner1,
	}
	db.Model(&Facility{}).Create(&Facility8)

	Event1 := Event{
		Name:      "Yoga",
		Details:   "Practicing yoga is the process of training the body",
		TimeStart: time.Date(2022, 2, 7, 8, 30, 30, 30, time.Local),
		TimeEnd:   time.Date(2022, 2, 7, 12, 0, 30, 30, time.Local),
		Amount:    26,

		Trainner:  Trainner2,
		TypeEvent: TypeEvent1,
		Room:      Room1,
	}
	db.Model(&Event{}).Create(&Event1)

	Event2 := Event{
		Name:      "Dance Class",
		Details:   "Practicing your KPOP Dance",
		TimeStart: time.Date(2022, 2, 7, 8, 30, 30, 30, time.Local),
		TimeEnd:   time.Date(2022, 2, 7, 12, 0, 30, 30, time.Local),
		Amount:    26,

		Trainner:  Trainner1,
		TypeEvent: TypeEvent3,
		Room:      Room1,
	}
	db.Model(&Event{}).Create(&Event2)

	//Equipment
	Equipment1 := Equipment{
		Name:           "ลูกบาส1",
		Quantity:       50,
		SportType:      SportType5,
		Company:        Company1,
		RoleItem:       RoleItem1,
		EquipmentStaff: User3,
		InputDate:      time.Now(),
	}
	db.Model(&Equipment{}).Create(&Equipment1)

	Equipment2 := Equipment{
		Name:           "ลูกขนไก่1",
		Quantity:       40,
		SportType:      SportType3,
		Company:        Company1,
		RoleItem:       RoleItem1,
		EquipmentStaff: User3,
		InputDate:      time.Now(),
	}
	db.Model(&Equipment{}).Create(&Equipment2)

	Equipment3 := Equipment{
		Name:           "ชุดว่ายน้ำ ชาย1",
		Quantity:       30,
		SportTypeID:    &SportType9.ID,
		CompanyID:      &Company2.ID,
		RoleItemID:     &RoleItem1.ID,
		EquipmentStaff: User3,
		InputDate:      time.Now(),
	}
	db.Model(&Equipment{}).Create(&Equipment3)

	Equipment4 := Equipment{
		Name:           "ลู่วิ่ง1",
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
		BorrowStatus:   BorrowStatus2,
		Equipment:      Equipment1,
		CustomerBorrow: User4,
		StaffBorrow:    User1,
	}
	db.Model(&Borrowing{}).Create(&Borrowing1)

	Borrowing2 := Borrowing{
		Borrowtime:     time.Now(),
		Comment:        "-",
		Quantity:       2,
		Contact:        "0908208456",
		BorrowStatus:   BorrowStatus1,
		Equipment:      Equipment2,
		CustomerBorrow: User4,
		StaffBorrow:    User1,
	}
	db.Model(&Borrowing{}).Create(&Borrowing2)

	//Payment
	Payment1 := Payment{
		Bill:            "R000001",
		CustomerPayment: User4,
		StaffPayment:    User2,
		Facility:        Facility1,
		PaymentMethod:   PaymentMethod2,
		AddedTime:       time.Date(2022, 5, 7, 10, 29, 20, 10, time.Local),
		Discount:        20,
		Total:           280,
	}
	db.Model(&Payment{}).Create(&Payment1)

	Payment2 := Payment{
		Bill:            "R000001",
		CustomerPayment: User4,
		StaffPayment:    User1,
		Facility:        Facility2,
		PaymentMethod:   PaymentMethod1,
		AddedTime:       time.Date(2022, 5, 7, 10, 29, 20, 10, time.Local),
		Discount:        10,
		Total:           580,
	}
	db.Model(&Payment{}).Create(&Payment2)

	///Setup reserve

	Zone1 := Zone{
		Name:   "Football",
		Status: 1,
	}
	db.Model(Zone{}).Create(&Zone1)

	Zone2 := Zone{
		Name:   "Pingpong",
		Status: 1,
	}
	db.Model(Zone{}).Create(&Zone2)

	Zone3 := Zone{
		Name:   "Basketball",
		Status: 2,
	}
	db.Model(Zone{}).Create(&Zone3)

	Zone4 := Zone{
		Name:   "Badmintion",
		Status: 2,
	}
	db.Model(Zone{}).Create(&Zone4)

	Zone5 := Zone{
		Name:   "Tennis",
		Status: 3,
	}
	db.Model(Zone{}).Create(&Zone5)

	Zone6 := Zone{
		Model:  gorm.Model{},
		Name:   "Swimming Pool",
		Status: 3,
	}
	db.Model(Zone{}).Create(&Zone6)

	Court1 := Court{
		Model: gorm.Model{},
		Name:  "Football field1",
		Zone:  Zone1,
	}
	db.Model(Court{}).Create(&Court1)

	Court2 := Court{
		Model: gorm.Model{},
		Name:  "Football field2",
		Zone:  Zone1,
	}
	db.Model(Court{}).Create(&Court2)

	Court3 := Court{
		Model: gorm.Model{},
		Name:  "Pingpong 1",
		Zone:  Zone2,
	}
	db.Model(Court{}).Create(&Court3)

	Court4 := Court{
		Model: gorm.Model{},
		Name:  "Pingpong 2",
		Zone:  Zone2,
	}
	db.Model(Court{}).Create(&Court4)

	//Courtpingpong
	Court5 := Court{
		Model: gorm.Model{},
		Name:  "BasketBall 1",
		Zone:  Zone3,
	}
	db.Model(Court{}).Create(&Court5)

	Court6 := Court{
		Model: gorm.Model{},
		Name:  "Basketball 2",
		Zone:  Zone3,
	}
	db.Model(Court{}).Create(&Court6)

	//setupBadminton
	Court7 := Court{
		Model: gorm.Model{},
		Name:  "Badminton Court1",
		Zone:  Zone4,
	}
	db.Model(Court{}).Create(&Court7)

	Court8 := Court{
		Model: gorm.Model{},
		Name:  "Badminton Court2",
		Zone:  Zone4,
	}
	db.Model(Court{}).Create(&Court8)

	//setupTennis
	Court9 := Court{
		Model: gorm.Model{},
		Name:  "Tennis Court1",
		Zone:  Zone5,
	}
	db.Model(Court{}).Create(&Court9)

	Court10 := Court{
		Model: gorm.Model{},
		Name:  "Tennis Court2",
		Zone:  Zone5,
	}
	db.Model(Court{}).Create(&Court10)

	//setupSwim
	Court11 := Court{
		Model: gorm.Model{},
		Name:  "Swimming pool 1",
		Zone:  Zone6,
	}
	db.Model(Court{}).Create(&Court11)

	Court12 := Court{
		Model: gorm.Model{},
		Name:  "Swimming pool 2",
		Zone:  Zone6,
	}
	db.Model(Court{}).Create(&Court12)

	//SetTime  Football--------------------------------------------------------------------------------------------------------------------
	Booking0 := BookingTime{
		Model:    gorm.Model{},
		Name:     "Football1_1",
		Time:     "8.00-19.00",
		Amount:   30,
		Avalable: 30,
		Court:    Court1,
	}
	db.Model(BookingTime{}).Create(&Booking0)

	Booking1 := BookingTime{
		Model:    gorm.Model{},
		Name:     "Football1_1",
		Time:     "15.00-17.00",
		Amount:   30,
		Avalable: 30,
		Court:    Court1,
	}
	db.Model(BookingTime{}).Create(&Booking1)

	Booking2 := BookingTime{
		Name:     "Football1_2",
		Time:     "17.00-19.00",
		Amount:   30,
		Avalable: 30,
		Court:    Court1,
	}
	db.Model(BookingTime{}).Create(&Booking2)

	Booking3 := BookingTime{
		Name:     "Football2_1",
		Time:     "15.00-17.00",
		Amount:   30,
		Avalable: 30,
		Court:    Court2,
	}
	db.Model(BookingTime{}).Create(&Booking3)

	Booking4 := BookingTime{
		Name:     "Football2_2",
		Time:     "17.00-19.00",
		Amount:   30,
		Avalable: 30,
		Court:    Court2,
	}

	//SetTime  Basketball
	db.Model(BookingTime{}).Create(&Booking4)
	Booking5 := BookingTime{
		Name:     "Basketball1_1",
		Time:     "15.00-17.00",
		Amount:   15,
		Avalable: 15,
		Court:    Court3,
	}
	db.Model(BookingTime{}).Create(&Booking5)

	Booking6 := BookingTime{
		Name:     "Basketball1_2",
		Time:     "17.00-19.00",
		Amount:   15,
		Avalable: 15,
		Court:    Court3,
	}
	db.Model(BookingTime{}).Create(&Booking6)

	Booking7 := BookingTime{
		Name:     "Basketball2_1",
		Time:     "15.00-17.00",
		Amount:   15,
		Avalable: 15,
		Court:    Court4,
	}
	db.Model(BookingTime{}).Create(&Booking7)

	Booking8 := BookingTime{
		Name:     "Basketball2_2",
		Time:     "17.00-19.00",
		Amount:   15,
		Avalable: 15,
		Court:    Court4,
	}
	db.Model(BookingTime{}).Create(&Booking8)

	//Setuppingpong
	Booking9 := BookingTime{
		Name:     "Pingpong1_1",
		Time:     "15.00-17.00",
		Amount:   4,
		Avalable: 4,
		Court:    Court5,
	}
	db.Model(BookingTime{}).Create(&Booking9)

	Booking10 := BookingTime{
		Name:     "Pingpong1_2",
		Time:     "17.00-19.00",
		Amount:   4,
		Avalable: 4,
		Court:    Court5,
	}
	db.Model(BookingTime{}).Create(&Booking10)

	Booking11 := BookingTime{
		Name:     "Pingpong2_1",
		Time:     "15.00-17.00",
		Amount:   4,
		Avalable: 4,
		Court:    Court6,
	}
	db.Model(BookingTime{}).Create(&Booking11)

	Booking12 := BookingTime{
		Name:     "Pingpong2_2",
		Time:     "17.00-19.00",
		Amount:   4,
		Avalable: 4,
		Court:    Court6,
	}
	db.Model(BookingTime{}).Create(&Booking12)

	//setBadminton

	Booking13 := BookingTime{
		Name:     "Badminton1_1",
		Time:     "15.00-17.00",
		Amount:   4,
		Avalable: 4,
		Court:    Court7,
	}
	db.Model(BookingTime{}).Create(&Booking13)

	Booking14 := BookingTime{
		Name:     "Badminton1_2",
		Time:     "17.00-19.00",
		Amount:   4,
		Avalable: 4,
		Court:    Court7,
	}
	db.Model(BookingTime{}).Create(&Booking14)

	Booking15 := BookingTime{
		Name:     "Badminton2_1",
		Time:     "15.00-17.00",
		Amount:   4,
		Avalable: 4,
		Court:    Court8,
	}
	db.Model(BookingTime{}).Create(&Booking15)

	Booking16 := BookingTime{
		Name:     "Badminton2_2",
		Time:     "17.00-19.00",
		Amount:   4,
		Avalable: 4,
		Court:    Court8,
	}
	db.Model(BookingTime{}).Create(&Booking16)

	//setTennis

	Booking17 := BookingTime{
		Name:     "Tennis1_1",
		Time:     "15.00-17.00",
		Amount:   4,
		Avalable: 4,
		Court:    Court9,
	}
	db.Model(BookingTime{}).Create(&Booking17)

	Booking18 := BookingTime{
		Name:     "Tennis1_2",
		Time:     "17.00-19.00",
		Amount:   4,
		Avalable: 4,
		Court:    Court9,
	}
	db.Model(BookingTime{}).Create(&Booking18)

	Booking19 := BookingTime{
		Name:     "Tennis2_1",
		Time:     "15.00-17.00",
		Amount:   4,
		Avalable: 4,
		Court:    Court10,
	}
	db.Model(BookingTime{}).Create(&Booking19)

	Booking20 := BookingTime{
		Name:     "Tennis2_2",
		Time:     "17.00-19.00",
		Amount:   4,
		Avalable: 4,
		Court:    Court10,
	}
	db.Model(BookingTime{}).Create(&Booking20)

	//Setup swim

	Booking21 := BookingTime{
		Name:     "Swim1_1",
		Time:     "15.00-17.00",
		Amount:   30,
		Avalable: 30,
		Court:    Court11,
	}
	db.Model(BookingTime{}).Create(&Booking21)

	Booking22 := BookingTime{
		Name:     "Swim1_2",
		Time:     "17.00-19.00",
		Amount:   30,
		Avalable: 30,
		Court:    Court11,
	}
	db.Model(BookingTime{}).Create(&Booking22)

	Booking23 := BookingTime{
		Name:     "Swim2_1",
		Time:     "15.00-17.00",
		Amount:   30,
		Avalable: 30,
		Court:    Court12,
	}
	db.Model(BookingTime{}).Create(&Booking23)

	Booking24 := BookingTime{
		Name:     "Swim2_2",
		Time:     "17.00-19.00",
		Amount:   30,
		Avalable: 30,
		Court:    Court12,
	}
	db.Model(BookingTime{}).Create(&Booking24)
	//-------------------------------------------------------------------------------------------------------------------------------------------------

	Reserve1 := Reserve{
		Amount:      2,
		Tel:         "0854215698",
		AddedTime:   time.Now(),
		User:        User4,
		BookingTime: Booking1,
		Facility:    Facility1,
	}
	db.Model(Reserve{}).Create(&Reserve1)

	Reserve2 := Reserve{
		Amount:      1,
		Tel:         "0954415798",
		AddedTime:   time.Now(),
		User:        User4,
		BookingTime: Booking15,
		Facility:    Facility2,
	}
	db.Model(Reserve{}).Create(&Reserve2)
}
