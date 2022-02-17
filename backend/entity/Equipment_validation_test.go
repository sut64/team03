package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestEquipmentPass(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูลถูกต้องหมดทุก field
	Equipment := Equipment{
		Name:      "ลูกบอล1",
		Quantity:  30,
		InputDate: time.Now().AddDate(-1, -1, 0),
	}

	// ตรวจสอบด้วย govalidaator
	ok, err := govalidator.ValidateStruct(Equipment)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err เป็นค่า nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())

}

func TestEquipmentNameNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	Equipment := Equipment{
		Name:      "", // ผิด
		Quantity:  30,
		InputDate: time.Now().AddDate(-1, -1, 0),
	}

	// ตรวจสอบด้วย govalidaator
	ok, err := govalidator.ValidateStruct(Equipment)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกชื่ออุปกรณ์"))
}

func TestEquipmentInputMustBePast(t *testing.T) {
	g := NewGomegaWithT(t)

	Equipment := Equipment{
		Name:      "ลูกบอล1",
		Quantity:  30,
		InputDate: time.Now().Add(24 * time.Hour), // อนาคต, fail
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Equipment)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("วันที่นำเข้าอุปกรณ์ไม่สามารถเป็นอนาคต"))
}

func TestQuantityRange(t *testing.T) {
	g := NewGomegaWithT(t)

	Equipment := Equipment{
		Name:      "ลูกบอล1",
		Quantity:  -10,
		InputDate: time.Now().AddDate(-1, -1, 0),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Equipment)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("จำนวนที่เพิ่มต้องมากกว่า 0 และน้อยกว่า 1000"))

}

func TestQuantityNotBeZero(t *testing.T) {
	g := NewGomegaWithT(t)

	Equipment := Equipment{
		Name:      "ลูกบอล1",
		Quantity:  0,
		InputDate: time.Now().AddDate(-1, -1, 0),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Equipment)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกจำนวนอุปกรณ์ที่ต้องการเพิ่ม"))

}
