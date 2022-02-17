package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestFacilityCorrect(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูลถูกต้องหมดทุก field
	Facility := Facility{
		No:          "A000000",
		PackageTime: time.Now(),
		Price:       100,
		Confirm:     true,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Facility)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err เป็นค่า nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}

func TestNoMustBeInValidPattern(t *testing.T) {
	g := NewGomegaWithT(t)

	fixtures := []string{
		"A0000000",
		"B0000000",
		"BBS000123",
	}

	for _, fixture := range fixtures {
		Facility := Facility{
			No:          fixture,
			PackageTime: time.Now(),
			Price:       100,
			Confirm:     true,
		}

		ok, err := govalidator.ValidateStruct(Facility)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal("หมายเลขรายการต้องขึ้นต้นด้วย A ตามด้วยตัวเลข 6 หลัก"))
	}
}

func TestPackageTimeMustNotBeInThePast(t *testing.T) {
	g := NewGomegaWithT(t)

	Facility := Facility{
		No:          "A000000",
		PackageTime: time.Now().AddDate(0, -1, 0), //ผิดเพราะเป็นอดีต
		Price:       100,
		Confirm:     true,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Facility)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("PackageTime must not be in the past"))

}

func TestPriceMustBeUint(t *testing.T) {
	g := NewGomegaWithT(t)

	Facility := Facility{
		No:          "A000000",
		PackageTime: time.Now(),
		Price:       -10,
		Confirm:     true,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Facility)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Price must be uint"))

}

func TestConfirmMustBeTrue(t *testing.T) {
	g := NewGomegaWithT(t)

	Facility := Facility{
		No:          "A000000",
		PackageTime: time.Now(),
		Price:       100,
		Confirm:     false,
	}

	ok, err := CheckBool(Facility.Confirm)
	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Confirm must be true"))

}
