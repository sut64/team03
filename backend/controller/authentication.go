package controller

import (
	"net/http"

	"github.com/sut64/team03/backend/entity"
	"github.com/sut64/team03/backend/service"
	"github.com/gin-gonic/gin"

	"golang.org/x/crypto/bcrypt"
)

type LoginPayload struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type UserResponse struct {
	User     entity.User `json:"user"`
	RoleName string      `json:"role"`
	Token    string      `json:"token"`
}

// POST /login
func Login(c *gin.Context) {
	var payload LoginPayload
	var user entity.User

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Raw("SELECT * FROM users WHERE email = ?", payload.Email).Preload("Role").Find(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(payload.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid user credentials"})
		return
	}

	jwtWrapper := service.JwtWrapper{
		SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
		Issuer:          "AuthService",
		ExpirationHours: 24,
	}

	signedToken, err := jwtWrapper.GenerateToken(user.Email)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error signing token"})
		return
	}

	var memberRole entity.Role
	var employeeRole entity.Role
	entity.DB().Raw("SELECT * FROM roles WHERE name = ?", "member").First(&memberRole)
	entity.DB().Raw("SELECT * FROM roles WHERE name = ?", "admin").First(&employeeRole)

	if user.Role.Name == memberRole.Name {
		// Member
		var User entity.User
		if tx := entity.DB().Preload("Role").Raw("SELECT * FROM users WHERE id = ?", user.ID).Find(&User); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
			return
		}

		tokenResponse := UserResponse{
			User:     User,
			RoleName: User.Role.Name,
			Token:    signedToken,
		}

		c.JSON(http.StatusOK, gin.H{"data": tokenResponse})
	} else if user.Role.Name == employeeRole.Name {
		// Member
		var User entity.User
		if tx := entity.DB().Preload("Role").Raw("SELECT * FROM users WHERE id = ?", user.ID).Find(&User); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
			return
		}

		tokenResponse := UserResponse{
			User:     User,
			RoleName: User.Role.Name,
			Token:    signedToken,
		}

		c.JSON(http.StatusOK, gin.H{"data": tokenResponse})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": "cannot find role "})
	}
}
