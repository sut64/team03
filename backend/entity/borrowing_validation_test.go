package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestBorrowingPass(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูลถูกต้องหมดทุก field
	borrowing := Borrowing{

		Borrowtime: time.Now().Add(-30 * time.Second),
		Comment:    "-",
		Quantity:   1,
		Contact:    "0987654321",
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(borrowing)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err เป็นค่า nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}

// ตรวจสอบค่าว่างของชื่อแล้วต้องเจอ Error
func TestContactNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	borrowing := Borrowing{

		Borrowtime: time.Now().Add(-30 * time.Second),
		Comment:    "-",
		Quantity:   1,
		Contact:    "", //ผิด
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(borrowing)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกเบอร์โทรศัพท์"))
}

func TestContactFormat(t *testing.T) {
	g := NewGomegaWithT(t)

	fixtures := []string{
		"abc",
		"098546a200",
		"08836645678", // มี 11 ตัว
		"088366456",   // มี 9 ตัว
		"0358795564",  // ไม่ขึ้นด้วย 06-08-09
		"0a55884569",  // มีตัวอักษร

	}

	for _, fixture := range fixtures {
		borrowing := Borrowing{

			Borrowtime: time.Now().Add(-30 * time.Second),
			Comment:    "-",
			Quantity:   10,
			Contact:    fixture, //ผิด
		}

		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(borrowing)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		if err.Error() == "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง" {
			g.Expect(err.Error()).To(Equal("กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง"))
		} else if err.Error() == "เบอร์โทรศัพท์ต้องขึ้นต้นด้วย 06|08|09" {
			g.Expect(err.Error()).To(Equal("เบอร์โทรศัพท์ต้องขึ้นต้นด้วย 06|08|09"))
		}

	}
}

func TestBorrowtimeMustBePast(t *testing.T) {
	g := NewGomegaWithT(t)

	borrowing := Borrowing{

		Borrowtime: time.Now().Add(24 * time.Hour), //ผิด
		Comment:    "-",
		Quantity:   10,
		Contact:    "0987654321",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(borrowing)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("ไม่สามารถกรอกเวลาในอนาคต"))
}

func TestBorrowtimeNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	borrowing := Borrowing{

		// Borrowtime: time.Now(), ผิด
		Comment:  "-",
		Quantity: 2,
		Contact:  "0987654321",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(borrowing)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกวันที่-เวลา"))
}

func TestQuantityisPositiveInt(t *testing.T) {
	g := NewGomegaWithT(t)

	borrowing := Borrowing{

		Borrowtime: time.Now().Add(-30 * time.Second),
		Comment:    "-",
		Quantity:   -10, //ผิด
		Contact:    "0987654321",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(borrowing)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("จำนวนอุปกรณ์ไม่สามารถติดลบได้"))
}

func TestQuantityNotZero(t *testing.T) {
	g := NewGomegaWithT(t)

	borrowing := Borrowing{

		Borrowtime: time.Now().Add(-30 * time.Second),
		Comment:    "-",
		Quantity:   0, //ผิด
		Contact:    "0987654321",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(borrowing)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("จำนวนอุปกรณ์ไม่สามารถเป็นศูนย์"))
}
