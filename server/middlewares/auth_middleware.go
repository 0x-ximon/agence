package middlewares

// func AuthMiddleware(c *fiber.Ctx) error {
// 	token := c.Get("Authorization")
// 	if token == "" {
// 		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
// 			"status":  "error",
// 			"message": "Unauthorized",
// 			"data":    nil,
// 		})
// 	}

// 	userRepo := repositories.NewUserRepository(database.DB)
// 	user, err := userRepo.FindUserByToken(token)
// 	if err != nil {
// 		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
// 			"status":  "error",
// 			"message": "Unauthorized",
// 			"data":    nil,
// 		})
// 	}

// 	return c.Next()
// }
