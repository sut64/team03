package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestReservePass(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูลถูกต้องหมดทุก field
	reserve := Reserve{

		AddedTime: time.Now().Add(-10 * time.Second),
		Amount:    1,
		Tel:       "0908208456",
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(reserve)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err เป็นค่า nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}

// ตรวจสอบค่าว่างของชื่อแล้วต้องเจอ Error
func TestTelNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	reserve := Reserve{

		AddedTime: time.Now().Add(-10 * time.Second),
		Amount:    1,
		Tel:       "", //ผิด
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(reserve)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกเบอร์โทรศัพท์"))
}

func TestTelOnlyNumber(t *testing.T) {
	g := NewGomegaWithT(t)

	reserve := Reserve{

		AddedTime: time.Now().Add(-10 * time.Second),
		Amount:    10,
		Tel:       "1908208456", //ผิด
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(reserve)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง"))
}

func TestAddedTimemustBePast(t *testing.T) {
	g := NewGomegaWithT(t)

	reserve := Reserve{

		AddedTime: time.Now().Add(24 * time.Hour), //ผิด
		Amount:    10,
		Tel:       "0908208456",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(reserve)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("ไม่สามารถกรอกเวลาในอนาคต"))
}

func TestAmountisPInt(t *testing.T) {
	g := NewGomegaWithT(t)

	reserve := Reserve{

		AddedTime: time.Now().Add(-10 * time.Second),
		Amount:    -10,
		Tel:       "0908208456",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(reserve)
	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา

	g.Expect(err.Error()).To(Equal("จำนวนไม่สามารถติดลบได้"))

}
