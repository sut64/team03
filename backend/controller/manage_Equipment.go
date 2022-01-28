package controller

import (
	"github.com/sut64/team03/backend/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

func InputEquipment(c *gin.Context) {

	var Equipment entity.Equipment
	var SportType entity.SportType
	var Company entity.Company
	var RoleItem entity.RoleItem
	var EquipmentStaff entity.User
	
	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร Equipment
	if err := c.ShouldBindJSON(&Equipment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// : ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", Equipment.EquipmentStaffID).First(&EquipmentStaff); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
		return
	}

	// : ค้นหา sport type ด้วย id
	if tx := entity.DB().Where("id = ?", Equipment.SportTypeID).First(&SportType); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "sport type not found"})
		return
	}

	// : ค้นหา company ด้วย id
	if tx := entity.DB().Where("id = ?", Equipment.CompanyID).First(&Company); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "company not found"})
		return
	}

	// : ค้นหา role item ด้วย id
	if tx := entity.DB().Where("id = ?", Equipment.RoleItemID).First(&RoleItem); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "role item not found"})
		return
	}
	

	// : สร้าง Equipment
	equip := entity.Equipment{
		Name:      Equipment.Name,
		Quantity:  Equipment.Quantity,
		InputDate: Equipment.InputDate,

		SportType: SportType,
		Company:   Company,
		RoleItem:  RoleItem,
		EquipmentStaff:      EquipmentStaff,
	}

	// : บันทึก
	if err := entity.DB().Create(&equip).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": equip})
}

// GET /equipments
func ListEquipment(c *gin.Context) {
	var Equipment []*entity.Equipment
	if err :=
		entity.DB().Preload("SportType").Preload("Company").Preload("RoleItem").Preload("EquipmentStaff").Table("equipment").Find(&Equipment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Equipment})
}


// GET /roleitems
func ListRoleItem(c *gin.Context) {
	var RoleItem []entity.RoleItem
	if err := entity.DB().Table("role_items").Find(&RoleItem).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": RoleItem})
}


// GET /companies
func ListCompany(c *gin.Context) {
	var Company []entity.Company
	if err := entity.DB().Table("companies").Find(&Company).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Company})
}


// GET /sporttypes
func ListSportType(c *gin.Context) {
	var SportType []entity.SportType
	if err := entity.DB().Table("sport_types").Find(&SportType).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": SportType})
}

