package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestEventPass(t *testing.T) {
	g := NewGomegaWithT(t)

	Event := Event{
		Name:      "test",
		TimeStart: time.Now().Add(24),
		TimeEnd:   time.Now().Add(25),
		Amount:    1,
	}

	ok, err := govalidator.ValidateStruct(Event)

	g.Expect(ok).To(BeTrue())

	g.Expect(err).To(BeNil())

}

func TestNamenotblank(t *testing.T) {
	g := NewGomegaWithT(t)

	Event := Event{
		Name:      "", //ผิด
		TimeStart: time.Now().Add(24),
		TimeEnd:   time.Now().Add(25),
		Amount:    1,
	}

	ok, err := govalidator.ValidateStruct(Event)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("Name cannot be blank"))
}

func TestTimeStartInFuture(t *testing.T) {
	g := NewGomegaWithT(t)

	Event := Event{
		Name:      "test",
		TimeStart: time.Now().AddDate(0, 0, -15), // ผิด
		TimeEnd:   time.Now().AddDate(0, 0, 15),
		Amount:    1,
	}

	ok, err := govalidator.ValidateStruct(Event)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("TimeStart must be in the future"))
}

func TestTimeEndInFuture(t *testing.T) {
	g := NewGomegaWithT(t)

	Event := Event{
		Name:      "test",
		TimeStart: time.Now().AddDate(0, 0, 15),
		TimeEnd:   time.Now().AddDate(0, 0, -15), // ผิด
		Amount:    1,
	}

	ok, err := govalidator.ValidateStruct(Event)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("TimeEnd must be in the future"))
}

func TestAmountNotZero(t *testing.T) {
	g := NewGomegaWithT(t)

	Event := Event{
		Name:      "test",
		TimeStart: time.Now().AddDate(0, 0, 15),
		TimeEnd:   time.Now().Add(-15),
		Amount:    0, // ผิด
	}

	ok, err := govalidator.ValidateStruct(Event)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	if err.Error() == "Amount must not be zero" {
		g.Expect(err.Error()).To(Equal("Amount must not be zero"))
	} else if err.Error() == "Amount must not be negotive" {
		g.Expect(err.Error()).To(Equal("Amount must not be negotive"))

	}
}

func TestTimeAmountNotNegotive(t *testing.T) {
	g := NewGomegaWithT(t)

	Event := Event{
		Name:      "test",
		TimeStart: time.Now().AddDate(0, 0, 15),
		TimeEnd:   time.Now().Add(-15),
		Amount:    -1, //ผิด
	}

	ok, err := govalidator.ValidateStruct(Event)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	if err.Error() == "Amount must not be zero" {
		g.Expect(err.Error()).To(Equal("Amount must not be zero"))
	} else if err.Error() == "Amount must not be negotive" {
		g.Expect(err.Error()).To(Equal("Amount must not be negotive"))

	}
}
