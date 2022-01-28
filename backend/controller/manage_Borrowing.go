package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team03/backend/entity"
)

// POST /medical_histories
func CreateBorrowing(c *gin.Context) {

	var customerborrow entity.User
	var staffborrow entity.User
	var equipment entity.Equipment
	var borrowing entity.Borrowing
	var borrowstatuses entity.BorrowStatus

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร equipmentborrow
	if err := c.ShouldBindJSON(&borrowing); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// : ค้นหา customer ด้วย id
	if tx := entity.DB().Where("id = ?", borrowing.CustomerBorrowID).First(&customerborrow); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Customer not found"})
		return
	}

	// : ค้นหา staff ด้วย id
	if tx := entity.DB().Where("id = ?", borrowing.StaffBorrowID).First(&staffborrow); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Staff not found"})
		return
	}

	// : ค้นหา equipment ด้วย id
	if tx := entity.DB().Where("id = ?", borrowing.EquipmentID).First(&equipment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Equipment not found"})
		return
	}

	// : ค้นหา borrowstatus ด้วย id
	if tx := entity.DB().Where("id = ?", borrowing.BorrowStatusID).First(&borrowstatuses); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Status not found"})
		return
	}

	// 13: สร้าง Borrowing
	eb := entity.Borrowing{
		CustomerBorrow: customerborrow,       // โยงความสัมพันธ์กับ Entity User
		StaffBorrow:    staffborrow,          // โยงความสัมพันธ์กับ Entity User
		Equipment:      equipment,            // โยงความสัมพันธ์กับ Entity Equipment
		BorrowStatus:   borrowstatuses,       // โยงความสัมพันธ์กับ Entity BorrowStatus
		Quantity:       borrowing.Quantity,   // ตั้งค่าฟิลด์ Quantity
		Comment:        borrowing.Comment,    // ตั้งค่าฟิลด์ Comment
		Contact:        borrowing.Contact,    // ตั้งค่าฟิลด์ Contact
		Borrowtime:     borrowing.Borrowtime, // ตั้งค่าฟิลด์ Borrowtime
	}

	/*if _, err := govalidator.ValidateStruct(borrowing); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}*/

	// : บันทึก
	if err := entity.DB().Create(&eb).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Raw("UPDATE equipment SET quantity = quantity-? WHERE id = ?", borrowing.Quantity, borrowing.EquipmentID).Find(&equipment).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"Can't update equipment": err.Error()})
		return

	}

	c.JSON(http.StatusOK, gin.H{"data": eb})

}

// GET /Borrowing
func ListBorrowings(c *gin.Context) {
	var borrowing []entity.Borrowing
	if err := entity.DB().Preload("Equipment").Preload("BorrowStatus").Preload("CustomerBorrow").Preload("StaffBorrow").Raw("SELECT * FROM borrowings").Find(&borrowing).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": borrowing})
}

func ListBorrowStatus(c *gin.Context) {
	var borrowstatus []entity.BorrowStatus
	if err := entity.DB().Raw("SELECT * FROM borrow_statuses").Scan(&borrowstatus).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": borrowstatus})
}

func ListAbleEquipments(c *gin.Context) {
	var equipment []entity.Equipment
	if err := entity.DB().Preload("RoleItem").Raw("SELECT equipment.* FROM equipment LEFT JOIN role_items ON equipment.role_item_id = role_items.id WHERE role_items.role = 'Borrow allow';").Scan(&equipment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": equipment})
}

func GetBorrowingByUser(c *gin.Context) {
	var borrowings []entity.Borrowing
	id := c.Param("id")
	if err := entity.DB().Preload("CustomerBorrow").Preload("Equipment").Preload("BorrowStatus").Raw("SELECT * FROM borrowings WHERE customer_borrow_id = ?", id).Find(&borrowings).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": borrowings})
}
