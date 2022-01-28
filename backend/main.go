package main

import (
	"github.com/gin-gonic/gin"
	"github.com/sut64/team03/backend/controller"
	"github.com/sut64/team03/backend/entity"
	"github.com/sut64/team03/backend/middlewares"
)

func main() {

	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())
	api := r.Group("")
	{
		protected := api.Use(middlewares.Authorizes())
		{
			protected.GET("/listcustomer", controller.ListUserMember)
			protected.GET("/api/listpayment", controller.ListPayment)
			protected.GET("/listpaymentmethod", controller.ListPaymentMethod)
			protected.GET("/listfacility", controller.ListFacility)
			protected.POST("/paymentcreate", controller.CreatePayment)
			
			protected.GET("/users", controller.ListUserMember)
			protected.GET("/package", controller.ListPackage)
			protected.GET("/trainner", controller.ListTrainner)
			protected.POST("/facilitycreate", controller.CreateFacility)
			protected.GET("/getfacility", controller.ListFacility)

			protected.GET("/ListTrainner", controller.ListTrainner)
			protected.GET("/ListTypeEvent", controller.ListTypeEvent)
			protected.GET("/ListRoom", controller.ListRoom)
			protected.GET("/ListEvent", controller.ListEvent)
			protected.POST("/CreateEvent", controller.CreateEvent)

			protected.GET("/listableequip", controller.ListAbleEquipments)
			protected.GET("/listborrowstatus", controller.ListBorrowStatus)
			protected.GET("/listborrowings", controller.ListBorrowings)
			protected.POST("/createborrowing", controller.CreateBorrowing)

			protected.GET("/ListSportType", controller.ListSportType)
			protected.GET("/ListCompany", controller.ListCompany)
			protected.GET("/ListRoleItem", controller.ListRoleItem)
			protected.GET("/ListEquipment", controller.ListEquipment)
			protected.POST("/InputEquipment", controller.InputEquipment)
		}
	}
	//Get func login/Actor
	r.POST("/login", controller.Login)

	// Run the server
	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
