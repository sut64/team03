package controller

import (
	"net/http"
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut64/team03/backend/entity"
)

// POST /borrowings
func CreateBorrowing(c *gin.Context) {

	var customerborrow entity.User
	var staffborrow entity.User
	var equipment entity.Equipment
	var borrowing entity.Borrowing
	var borrowstatuses entity.BorrowStatus

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร borrowing
	if err := c.ShouldBindJSON(&borrowing); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// : ค้นหา customer ด้วย id
	if tx := entity.DB().Where("id = ?", borrowing.CustomerBorrowID).First(&customerborrow); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบสมาชิก"})
		return
	}

	// : ค้นหา staff ด้วย id
	if tx := entity.DB().Where("id = ?", borrowing.StaffBorrowID).First(&staffborrow); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบพนักงาน"})
		return
	}

	// : ค้นหา equipment ด้วย id
	if tx := entity.DB().Where("id = ?", borrowing.EquipmentID).First(&equipment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบอุปกรณ์"})
		return
	}

	// : ค้นหา borrowstatus ด้วย id
	if tx := entity.DB().Where("id = ?", borrowing.BorrowStatusID).First(&borrowstatuses); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบสถานะการยืม"})
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
		Backtime:       borrowing.Backtime,   // ตั้งค่าฟิลด์ Borrowtime
	}

	if _, err := govalidator.ValidateStruct(borrowing); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//checkจำนวนอุปกรณ์
	if tx := entity.DB().Raw("SELECT * from equipment WHERE id=? AND quantity > ?", borrowing.EquipmentID, borrowing.Quantity).First(&borrowstatuses); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "มีจำนวนอุปกรณ์น้อยกว่าที่ต้องการยืม"})
		return
	}

	// : บันทึก
	if err := entity.DB().Create(&eb).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//update equipment.quantity
	if err := entity.DB().Raw("UPDATE equipment SET quantity = quantity-? WHERE id = ?", borrowing.Quantity, borrowing.EquipmentID).Find(&equipment).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"ไม่สามารถอัพเดทจำนวนอุปกรณ์คงเหลือ": err.Error()})
		return

	}

	c.JSON(http.StatusOK, gin.H{"data": eb})

}

// --------------------BORROWINGS
// GET /Borrowing
func ListBorrowings(c *gin.Context) {
	var borrowing []entity.Borrowing
	if err := entity.DB().Preload("Equipment").Preload("BorrowStatus").Preload("CustomerBorrow").Preload("StaffBorrow").Raw("SELECT * FROM borrowings ORDER BY id desc").Find(&borrowing).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": borrowing})
}

func GetBorrowingByUser(c *gin.Context) {
	var borrowings []entity.Borrowing
	id := c.Param("id")
	if err := entity.DB().Preload("CustomerBorrow").Preload("StaffBorrow").Preload("Equipment").Preload("BorrowStatus").Raw("SELECT * FROM borrowings WHERE customer_borrow_id = ? ORDER BY id desc", id).Find(&borrowings).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": borrowings})
}

func GetBorrowingByStatus(c *gin.Context) {
	var borrowings []entity.Borrowing
	id := c.Param("id")
	if err := entity.DB().Preload("CustomerBorrow").Preload("StaffBorrow").Preload("Equipment").Preload("BorrowStatus").Raw("SELECT * FROM borrowings WHERE borrow_status_id = ? ORDER BY id desc", id).Find(&borrowings).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": borrowings})
}

func GetBorrowingUpdate(c *gin.Context) {
	var borrowings entity.Borrowing
	id := c.Param("id")
	if err := entity.DB().Preload("CustomerBorrow").Preload("StaffBorrow").Preload("Equipment").Preload("BorrowStatus").Raw("SELECT * FROM borrowings WHERE id = ? ORDER BY id desc", id).First(&borrowings).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": borrowings})
}

// PATCH /borrowing
func UpdateBorrowing(c *gin.Context) {
	var borrowing entity.Borrowing

	id := c.Param("id")

	if err := c.ShouldBindJSON(&borrowing); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Raw("UPDATE borrowings SET borrow_status_id = 2 WHERE id = ?", id).Find(&borrowing).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Raw("UPDATE borrowings SET backtime = ? WHERE id = ?", time.Now(), id).Find(&borrowing).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Raw("UPDATE equipment SET quantity = quantity +(SELECT quantity FROM borrowings WHERE id = ?) WHERE id = (SELECT equipment_id FROM borrowings WHERE id = ?); ", id, id).Find(&borrowing).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": borrowing})
}

// --------------------BORROWSTATUSES

func ListBorrowStatus(c *gin.Context) {
	var borrowstatus []entity.BorrowStatus
	if err := entity.DB().Raw("SELECT * FROM borrow_statuses WHERE status = 'Borrowing'").Scan(&borrowstatus).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": borrowstatus})
}

func ListBackBorrowStatus(c *gin.Context) {
	var borrowstatus []entity.BorrowStatus
	if err := entity.DB().Raw("SELECT * FROM borrow_statuses").Scan(&borrowstatus).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": borrowstatus})
}

// --------------------EQUIPMENT
func ListAbleEquipments(c *gin.Context) {
	var equipment []entity.Equipment
	if err := entity.DB().Preload("RoleItem").Raw("SELECT equipment.* FROM equipment LEFT JOIN role_items ON equipment.role_item_id = role_items.id WHERE role_items.role = 'Borrow allow';").Scan(&equipment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": equipment})
}
