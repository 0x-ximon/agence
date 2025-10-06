package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
	"github.com/ximon-x/agence/database"
	"github.com/ximon-x/agence/handlers"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Connect to database
	err = database.Connect()
	if err != nil {
		log.Fatal(err)
	}

	app := fiber.New(fiber.Config{
		DisableStartupMessage: true,
	})
	app.Use(logger.New())

	// Routes
	userGroup := app.Group("/users")

	userGroup.Get("/", handlers.GetUsersHandler)
	userGroup.Get("/:id", handlers.GetUserHandler)
	userGroup.Post("/", handlers.PostUserHandler)

	gigGroup := app.Group("/gigs")

	gigGroup.Get("/", handlers.GetGigsHandler)
	gigGroup.Get("/:id", handlers.GetGigHandler)
	gigGroup.Post("/", handlers.PostGigHandler)

	app.Listen(":3001")
}
