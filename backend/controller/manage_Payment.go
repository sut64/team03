package controller

import (
	"net/http"
	"github.com/sut64/team03/backend/entity"
	"github.com/gin-gonic/gin"
	"github.com/asaskevich/govalidator"
) 

// POST /Payment
func CreatePayment(c *gin.Context) {
	var customerpayment entity.User
	var staffpayment entity.User
	var facility entity.Facility
	var paymentmethod entity.PaymentMethod
	var payment entity.Payment

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร payment
	if err := c.ShouldBindJSON(&payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา staff ด้วย id
	if tx := entity.DB().Where("id = ?", payment.StaffPaymentID).First(&staffpayment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Staff not found"})
		return
	}

	// 10: ค้นหา customer ด้วย id
	if tx := entity.DB().Where("id = ?", payment.CustomerPaymentID).First(&customerpayment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Customer not found"})
		return
	}

	// 11: ค้นหา facility ด้วย id
	if tx := entity.DB().Where("id = ?", payment.FacilityID).First(&facility); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Facility not found"})
		return
	}

	//12: ค้นหา paymentmethod ด้วย id
	if tx := entity.DB().Where("id = ?", payment.PaymentMethodID).First(&paymentmethod); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "PaymentMethod not found"})
		return
	}
	// 13: สร้าง Payment
	pay := entity.Payment{
		StaffPayment: staffpayment,
		CustomerPayment: customerpayment,                      
		Facility:    facility,	
		PaymentMethod: paymentmethod,
		Discount: payment.Discount,    
		Total: payment.Total,    
		AddedTime: payment.AddedTime,
		Bill: payment.Bill,
	}

	// แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(pay); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 14: บันทึก
	if err := entity.DB().Create(&pay).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": pay})
}

// GET: /api/ListPayment
func ListPayment(c *gin.Context) {
	var payment []*entity.Payment
	if err := entity.DB().Preload("StaffPayment").Preload("CustomerPayment").Preload("PaymentMethod").Preload("Facility").Raw("SELECT * FROM payments").Find(&payment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": payment})
}

func ListPaymentMethod(c *gin.Context) {
	var paymentmethod []entity.PaymentMethod
	if err := entity.DB().Table("payment_methods").Find(&paymentmethod).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": paymentmethod})
}