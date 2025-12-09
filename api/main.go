package main

import (
	"context"
	"log"
	"net"
	"net/http"
	"os"

	"github.com/0x-ximon/agence/api/handlers"
	"github.com/0x-ximon/agence/api/services"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/jackc/pgx/v5"
	"github.com/joho/godotenv"
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalln(err)
	}
}

func main() {
	mux := http.NewServeMux()
	ctx := context.Background()

	conn, err := pgx.Connect(ctx, os.Getenv("DB_URL"))
	if err != nil {
		log.Fatalln(err)
	}
	defer conn.Close(ctx)

	chain := services.NewChain(
		services.Auth,
		services.ContentType,

		middleware.Logger,
	)

	auth := &handlers.AuthHandler{Conn: conn}
	mux.HandleFunc("POST /auth/initiate", auth.Initiate)
	mux.HandleFunc("POST /auth/validate", auth.Validate)

	users := &handlers.UsersHandler{Conn: conn}
	mux.HandleFunc("GET /users", users.ListUsers)
	mux.HandleFunc("POST /users", users.CreateUser)
	mux.HandleFunc("GET /users/{id}", users.GetUser)
	mux.HandleFunc("DELETE /users/{id}", users.DeleteUser)

	port, ok := os.LookupEnv("PORT")
	if !ok {
		port = "3001"
	}

	addr := net.JoinHostPort(os.Getenv("HOST"), port)
	s := http.Server{
		Addr:    addr,
		Handler: chain(mux),
	}

	log.Printf("Starting server on %s", addr)
	s.ListenAndServe()
}
