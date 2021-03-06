package entity

import (
	"testing"
	"time"
	"fmt"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestPaymentPass(t *testing.T){
	g := NewGomegaWithT(t)

	payment := Payment{
		Bill: "R000005",
		AddedTime:       time.Date(2021, 1, 24, 10, 29, 20, 10, time.Local),
		Discount: 20,
		Total: 1980,
		Note: "-",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(payment)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err เป็นค่า nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}

func TestBillnotblank(t *testing.T) {
	g := NewGomegaWithT(t)

	payment := Payment{
		Bill: "",
		AddedTime:       time.Date(2021, 1, 24, 10, 29, 20, 10, time.Local),
		Discount: 23,
		Total: 1500,
		Note: "-",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(payment)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Bill cannot be blank"))
}

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
			AddedTime:       time.Date(2021, 1, 24, 10, 29, 20, 10, time.Local),
			Discount: 20,
			Total: 180,
			Note: "-",
		}

		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(payment)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal(fmt.Sprintf(`Bill: %s does not validate as matches(^[R]\d{6}$)`, fixture)))
	}
}

// ตรวจสอบค่าของ Discount แล้วต้องเจอ Error
func TestDiscountisPositiveInt(t *testing.T) {
	g := NewGomegaWithT(t)

	payment := Payment{
		Bill: "R000005",
		AddedTime:       time.Date(2021, 1, 24, 10, 29, 20, 10, time.Local),
		Discount: -15,
		Total: 500,
		Note: "-",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(payment)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("ส่วนลดต้องไม่ติดลบ"))
}

// ตรวจสอบค่าของ Total แล้วต้องเจอ Error
func TestTotalisPositiveInt(t *testing.T) {
	g := NewGomegaWithT(t)

	payment := Payment{
		Bill: "R000005",
		AddedTime:       time.Date(2021, 1, 24, 10, 29, 20, 10, time.Local),
		Discount: 0,
		Total: -500,
		Note: "-",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(payment)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("ยอดรวมต้องไม่ติดลบ"))
}

// ตรวจสอบ AddedTime แล้วต้องเจอ Error
func TestAddedTimeMustBePast(t *testing.T) {
	g := NewGomegaWithT(t)

	payment := Payment{
		Bill: "R000008",
		AddedTime: time.Now().Add(24 * time.Hour), //ผิด
		Discount: 20,
		Total: 1503,
		Note: "-",
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

func TestNotenotblank(t *testing.T) {
	g := NewGomegaWithT(t)

	payment := Payment{
		Bill: "R000005",
		AddedTime:       time.Date(2021, 1, 24, 10, 29, 20, 10, time.Local),
		Discount: 23,
		Total: 1500,
		Note: "",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(payment)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Note cannot be blank"))
}