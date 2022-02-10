package entity

import (
	"testing"
	"time"
	"fmt"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

// ตรวจสอบ Pattern ของ Bill แล้วต้องเจอ Error
func TestBillMustBeInvalidPattern(t *testing.T){
	g := NewGomegaWithT(t)

	fixtures := []string{
		"X000000",
		"RA00000",
		"R00000",
		"R0000000",
	}
	for _, fixture := range fixtures {
		payment := Payment{
			Bill: fixture,
			AddedTime:       time.Date(2022, 5, 24, 10, 29, 20, 10, time.Local),
			Discount: 20,
			Total: 180,
		}

		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(payment)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal(fmt.Sprintf(`Bill: %s does not validate as matches(^[R]\\d{6}$`, fixture)))
	}
}


// ตรวจสอบค่าของ Total แล้วต้องเจอ Error
func TestTotalBetweenZeroAndTenThousand(t *testing.T){
	g := NewGomegaWithT(t)

	payment := Payment{
		Bill: "R000005",
		AddedTime:       time.Date(2022, 5, 24, 10, 29, 20, 10, time.Local),
		Discount: 20,
		Total: 90000,
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(payment)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Total is between 0 and 10000"))
}

// ตรวจสอบ AddedTime แล้วต้องเจอ Error
func TestWatchVideoMustBePast(t *testing.T) {
	g := NewGomegaWithT(t)

	payment := Payment{
		AddedTime:  time.Now().Add(24 * time.Hour), // อนาคต, fail
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(payment)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("AddedTime must be in the past"))
}